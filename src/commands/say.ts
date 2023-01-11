import { ApplicationCommandOptionType, CommandInteraction, TextChannel } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';

@Discord()
export class SayCommand {

	@Slash({ name: 'say', description: 'say a message' })
	say(
		@SlashOption({
			name: 'channel',
			description: 'the channel to say the message in',
			required: true,
			type: ApplicationCommandOptionType.Channel,
		})
		channel: TextChannel,
		@SlashOption({
			name: 'message',
			description: 'the message to say',
			required: true,
			type: ApplicationCommandOptionType.String,
		})
		message: string,
		interaction: CommandInteraction
	) {
		if (!interaction.memberPermissions?.has('Administrator')) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
		interaction.reply({ content: 'Message Sent!', ephemeral: true });
		channel.send(message);
	}

}