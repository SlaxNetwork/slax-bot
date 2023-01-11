import { EmbedBuilder, TextChannel } from 'discord.js';
import { ArgsOf, Discord, On } from 'discordx';
import { client } from '../..';
import { guildConfigs } from '../../config/guildConfigs';
import { listToString } from '../../util/functions';

@Discord()
export class ModLogMemberNameUpdate {
	
	@On({ event: 'guildMemberUpdate' })
	onGuildMemberUpdate([oldMember, newMember]: ArgsOf<'guildMemberUpdate'>) {
		const config = guildConfigs.get(oldMember.guild.id);
		if (
			!config ||
			!config.features.modLog ||
			!config.features.modLog.events.includes('memberNickNameUpdate') ||
			oldMember.nickname === newMember.nickname
		) return;

		let msg = '';
		if (oldMember.nickname && !newMember.nickname)
			msg = `${oldMember.user.tag} (\`${oldMember.id}\`) removed nick \`${oldMember.nickname}\``;
		else if (!oldMember.nickname && newMember.nickname)
			msg = `${oldMember.user.tag} (\`${oldMember.id}\`) added nick \`${newMember.nickname}\``;
		else if (oldMember.nickname !== newMember.nickname)
			msg = `${oldMember.user.tag} (\`${oldMember.id}\`) changed nick to \`${newMember.nickname}\` from \`${oldMember.nickname}\``;
		
		const embed = new EmbedBuilder()
			.setColor('DarkRed')
			.setTimestamp()
			.setTitle('Member Nickname Update')
			.setDescription(msg);
		
		const channel = oldMember.guild.channels.cache.get(config.features.modLog.channel) as TextChannel;
		if (channel) channel.send({ embeds: [embed] });
	}

	@On({ event: 'userUpdate' })
	onUserUpdate([oldUser, newUser]: ArgsOf<'userUpdate'>) {
		guildConfigs.forEach(async config => {
			if (
				!config ||
				!config.features.modLog ||
				!config.features.modLog.events.includes('memberUserNameUpdate') ||
				oldUser.username === newUser.username
			)
				return;
			const guild = client.guilds.cache.get(config.id);
			if (!guild || !guild.members.resolve(newUser.id)) return;
			
			const embed = new EmbedBuilder()
				.setColor('DarkRed')
				.setTimestamp()
				.setTitle('Member Username Update')
				.setDescription(listToString([
					`**Old Username:** ${oldUser.tag} (${oldUser.id})`,
					`**New Username:** ${newUser.tag}`,
				]));
			
			const channel = guild.channels.cache.get(config.features.modLog.channel) as TextChannel;
			if (channel) channel.send({ embeds: [embed] });
		});
	}

}