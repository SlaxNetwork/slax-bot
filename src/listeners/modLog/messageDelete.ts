import { AttachmentBuilder, EmbedBuilder, Message, TextChannel } from 'discord.js';
import { ArgsOf, Discord, On } from 'discordx';
import { client } from '../..';
import { guildConfigs } from '../../config/guildConfigs';

@Discord()
export class ModLogMessageDelete {

	@On({ event: 'messageDelete' })
	async onDelete([msg]: ArgsOf<'messageDelete'>) {
		if (!msg.guild) return;
		const config = guildConfigs.get(msg.guildId as string);
		if (
			!config ||
			!config.features.modLog ||
			!config.features.modLog.events.includes('messageDelete') ||
			msg.author?.id === client.botId ||
			(config.features.modLog.ignoredChannels && config.features.modLog.ignoredChannels.includes(msg.channel.id))
		) return;

		const embed = new EmbedBuilder()
			.setColor('DarkRed')
			.setTimestamp()
			.setAuthor({
				name: 'Message Deleted',
				iconURL: msg.author?.displayAvatarURL(),
			})
			.setDescription(msg.content || 'No Content')
			.addFields([
				{
					name: 'Author',
					value: `<@${msg.author?.id}>\n(${msg.author?.id})`,
					inline: true,
				},
				{
					name: 'Channel',
					value: `<#${msg.channel.id}>\n(${msg.channel.id})`,
					inline: true,
				},
			]);
		
		const attachments = await this.getAttachments(msg as Message);
		
		const channel = msg.guild.channels.cache.get(config.features.modLog.channel) as TextChannel;
		if (channel) channel.send({ embeds: [embed], files: attachments });
	}

	private async getAttachments(msg: Message) {
		const attachments = [];
		for (const attachment of msg.attachments.values()) {
			attachments.push(new AttachmentBuilder(attachment.attachment)
				.setName(attachment.name || 'No Name')
				.setDescription(attachment.description || 'No Description')
				.setSpoiler(true)
			);
		}
		return attachments;
	}

}