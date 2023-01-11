import { Guild, GuildMember, VoiceChannel } from 'discord.js';
import { Discord, On } from 'discordx';
import { client } from '..';
import { guildConfigs } from '../config/guildConfigs';

@Discord()
export class MemberCountChannelListener {

	@On({ event: 'ready' })
	onReady() {
		const guild = client.guilds.cache.get('769406548438810625') as Guild;
		this.update(guild);
	}

	@On({ event: 'guildMemberAdd' })
	onGuildMemberAdd(member: GuildMember) {
		this.update(member.guild);
	}

	@On({ event: 'guildMemberRemove' })
	onGuildMemberRemove(member: GuildMember) {
		this.update(member.guild);
	}

	private async update(guild: Guild) {
		const config = guildConfigs.get(guild.id);
		if (
			!config ||
			!config?.features?.memberCountChannel
		) return;
		const options = config.features.memberCountChannel;

		const channel = guild.channels.cache.get(options.channel) as VoiceChannel;
		const total = guild.memberCount;
		const integrations = await guild.fetchIntegrations();
		const bots = integrations.filter(i => i.application && i.application.bot).size;
		const members = total - bots;
		channel.setName(`Members: ${members}/${options.max}`);
	}

}