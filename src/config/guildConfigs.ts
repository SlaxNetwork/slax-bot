import { ALL_MOGLOG_EVENTS, HASTEBIN_EXTENSION_WHITELIST } from './common';
import { GuildConfiguration } from './guildConfiguration';

export const guildConfigs: Map<string, GuildConfiguration> = new Map();

// Test Server
guildConfigs.set('769406548438810625', {
	id: '769406548438810625',
	main: true,
	features: {
		modLog: {
			channel: '896137137190223872',
			events: ALL_MOGLOG_EVENTS,
		},
		memberCountChannel: {
			channel: '1061873428577144892',
			max: 100,
		},
		hastebinConversion: {
			ignoredChannels: [''],
			whitelistedExtensions: HASTEBIN_EXTENSION_WHITELIST,
		},
	}
});