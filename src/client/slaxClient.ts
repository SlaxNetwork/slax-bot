import { importx } from '@discordx/importer';
import { Client } from 'discordx';
import { SlaxClientOptions } from './slaxClientOptions';

export class SlaxClient extends Client {
	constructor(options: SlaxClientOptions) {
		super({
			silent: false,
			intents: [
				'Guilds',
				'GuildMessages',
				'GuildMembers',
				'MessageContent',
				'GuildMessageReactions',
			],
			botGuilds: ['769406548438810625'],
		});

		this.registerListners(options.listenersDir);
		this.registerCommands(options.commandsDir);

		this.on('interactionCreate', async (interaction) => {
			this.executeInteraction(interaction);
		});

		this.on('messageReactionAdd', (reaction, user) => {
			this.executeReaction(reaction, user);
		});
	}

	async registerListners(directory: string) {
		await importx(directory);
	}

	async registerCommands(directory: string) {
		await importx(directory);
	}

	async start(token: string) {
		await this.login(token);
	}
}