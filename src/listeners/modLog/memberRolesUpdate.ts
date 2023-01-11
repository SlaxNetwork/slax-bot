import { EmbedBuilder, TextChannel } from 'discord.js';
import { ArgsOf, Discord, On } from 'discordx';
import { guildConfigs } from '../../config/guildConfigs';
import { arrayDiff } from '../../util/functions';

@Discord()
export class ModLogMemberRolesUpdate {

	@On({ event: 'guildMemberUpdate' })
	onGuildMemberUpdate([oldMember, newMember]: ArgsOf<'guildMemberUpdate'>) {
		const config = guildConfigs.get(oldMember.guild.id);
		if (
			!config ||
			!config.features.modLog ||
			!config.features.modLog.events.includes('memberRolesUpdate') ||
			oldMember.roles === newMember.roles
		) return;

		const { added, removed } = arrayDiff(
			[...oldMember.roles.cache.values()],
			[...newMember.roles.cache.values()]
		);
		if (added.length === 0 && removed.length === 0) return;

		const embed = new EmbedBuilder()
			.setColor('DarkRed')
			.setTimestamp()
			.addFields([
				{
					name: 'Member',
					value: `<@${newMember.id}> (${newMember.id})`,
				},
				{
					name: 'Added Roles',
					value: added.length > 0 ? added.map(r => `<@&${r.id}>`).join('\n') : 'None',
					inline: true,
				},
				{
					name: 'Removed Roles',
					value: removed.length > 0 ? removed.map(r => `<@&${r.id}>`).join('\n') : 'None',
					inline: true,
				}
			]);
		
		const channel = oldMember.guild.channels.cache.get(config.features.modLog.channel) as TextChannel;
		if (channel) channel.send({ embeds: [embed] });
	}

}