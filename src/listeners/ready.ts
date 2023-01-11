import { Discord, Once } from 'discordx';
import { client } from '..';

@Discord()
export class ReadyListener {

	@Once({ event: 'ready' })
	onReady() {
		client.clearApplicationCommands();
		client.initApplicationCommands();

		console.log(`Logged in as ${client.user?.tag}!`);
	}

}