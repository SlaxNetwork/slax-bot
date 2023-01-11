import { EmbedBuilder, GuildMember, PartialGuildMember, TextChannel, time, TimestampStyles } from 'discord.js';
import { ArgsOf, Discord, On } from 'discordx';
import { guildConfigs } from '../../config/guildConfigs';
import { listToString } from '../../util/functions';

@Discord()
export class ModLogGuildMemberAddRemove {

	@On({ event: 'guildMemberAdd' })
	async onJoin([member]: ArgsOf<'guildMemberAdd'>) {
		const config = guildConfigs.get(member.guild.id as string);
		if (
			!config ||
			!config.features.modLog ||
			!config.features.modLog.events.includes('guildMemberAdd')
		) return;
		
		const embed = this.getEmbed(member, 'join');
		
		const channel = member.guild.channels.cache.get(config.features.modLog.channel) as TextChannel;
		if (channel) channel.send({ embeds: [embed] });
	}

	@On({ event: 'guildMemberRemove' })
	async onLeave([member]: ArgsOf<'guildMemberRemove'>) {
		const config = guildConfigs.get(member.guild.id as string);
		if (
			!config ||
			!config.features.modLog ||
			!config.features.modLog.events.includes('guildMemberRemove')
		) return;
		
		const embed = this.getEmbed(member, 'leave');
		
		const channel = member.guild.channels.cache.get(config.features.modLog.channel) as TextChannel;
		if (channel) channel.send({ embeds: [embed] });
	}

	private getEmbed(member: GuildMember | PartialGuildMember, type: 'join' | 'leave') {
		const embed = new EmbedBuilder()
			.setColor('DarkRed')
			.setTimestamp()
			.setTitle(`${member.user.tag} ${type === 'join' ? 'joined' : 'left'} this server`)
			.setThumbnail(member.user.displayAvatarURL())
			.setFooter({
				text: `${member.guild.memberCount} members`
			})
			.setDescription(listToString([
				`Member: <@${member.id}> (${member.id})`,
				`Created Account: ${time(member.user.createdAt), TimestampStyles.RelativeTime}`,
				`Joined: ${time(new Date(member.joinedTimestamp || 0)), TimestampStyles.RelativeTime}`
			]));
		return embed;
	}

}