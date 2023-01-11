import { EmbedBuilder, TextChannel } from 'discord.js';
import { ArgsOf, Discord, On } from 'discordx';
import { client } from '../..';
import { guildConfigs } from '../../config/guildConfigs';

@Discord()
export class ModLogMessageEdit {

	@On({ event: 'messageUpdate' })
	onMessageUpdate([oldMessage, newMessage]: ArgsOf<'messageUpdate'>) {
		if (!oldMessage.guild || !newMessage.guild) return;
		const config = guildConfigs.get(oldMessage.guildId as string);
		if (
			!config ||
			!config.features.modLog ||
			!config.features.modLog.events.includes('messageDelete') ||
			oldMessage.author?.id === client.botId ||
			!oldMessage.content || !newMessage.content ||
			oldMessage.content === newMessage.content ||
			(config.features.modLog.ignoredChannels && config.features.modLog.ignoredChannels.includes(oldMessage.channel.id))
		) return;
		
		const embed = new EmbedBuilder()
			.setColor('DarkRed')
			.setTimestamp()
			.setTitle('Message Edited')
			.addFields([
				{
					name: 'Author',
					value: `<@${oldMessage.author?.id}>\n(${oldMessage.author?.id})`,
				},
				{
					name: 'Old Message',
					value: oldMessage.content,
				},
				{
					name: 'New Message',
					value: newMessage.content,
				}
			]);
		
		const channel = oldMessage.guild.channels.cache.get(config.features.modLog.channel) as TextChannel;
		if (channel) channel.send({ embeds: [embed] });
	}

}