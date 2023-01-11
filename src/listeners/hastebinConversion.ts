import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, MessageReaction, User } from 'discord.js';
import { ArgsOf, Discord, On, Reaction } from 'discordx';
import { guildConfigs } from '../config/guildConfigs';
import { generateHastebinFromInput } from '../util/functions';

@Discord()
export class HastebinConversionListener {

	@On({ event: 'messageCreate' })
	async onMessage([msg]: ArgsOf<'messageCreate'>) {
		const attachment = this.hasAttachment(msg);
		if (!attachment) return;

		msg.react('📄');
	}

	@Reaction({ emoji: '📄' })
	async onReaction(reaction: MessageReaction, user: User) {
		const attachment = this.hasAttachment(reaction.message as Message);
		if (!attachment) return;
		if (reaction.message.author?.id !== user.id) return;
		
		const res = await fetch(attachment.url);
		const text = await res.text();

		const hastebinUrl = await generateHastebinFromInput(
			text,
			attachment.name?.substring(
				attachment.name.indexOf('.') + 1
			) ?? 'txt'
		);

		const button = new ButtonBuilder()
			.setLabel('Hastebin')
			.setEmoji('📄')
			.setStyle(ButtonStyle.Link)
			.setURL(hastebinUrl);
		
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

		reaction.message.reply({ components: [row] });
	}

	private hasAttachment(msg: Message) {
		if (!msg.guild) return;
		const hastebinConversionConfig = guildConfigs.get(msg.guild.id)?.features.hastebinConversion;
		if (
			!hastebinConversionConfig ||
			hastebinConversionConfig.ignoredChannels?.includes(msg.channel.id)
		) return;

		const attachment = msg.attachments.find(a => 
			hastebinConversionConfig.whitelistedExtensions.some(ext => a.name?.endsWith(ext))
		);
		return attachment;
	}

}