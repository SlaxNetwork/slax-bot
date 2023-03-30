import { EmbedBuilder } from '@discordjs/builders';
import { ApplicationCommandOptionType, TextChannel, CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalSubmitInteraction } from 'discord.js';
import { Discord, ModalComponent, Slash, SlashOption } from 'discordx';

@Discord()
export class EmbedCommand {

	@Slash({ name: 'embed', description: 'send an embed' })
	embed(
		@SlashOption({
			name: 'channel',
			description: 'the channel to send the embed in',
			required: true,
			type: ApplicationCommandOptionType.Channel,
		})
		channel: TextChannel,
		interaction: CommandInteraction
	) {
		if (!interaction.memberPermissions?.has('Administrator')) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
		const modal = new ModalBuilder()
			.setTitle('Embed Builder')
			.setCustomId(`embedbuilder-${channel.id}`);
		
		const titleInput = new TextInputBuilder()
			.setCustomId('title')
			.setLabel('Title')
			.setStyle(TextInputStyle.Short)
		
		const descriptionInput = new TextInputBuilder()
			.setCustomId('description')
			.setLabel('Description')
			.setStyle(TextInputStyle.Paragraph);

		const colorInput = new TextInputBuilder()
			.setCustomId('color')
			.setLabel('Color')
			.setStyle(TextInputStyle.Short)

		
		const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput);
		const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput);
		const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(colorInput);

		modal.addComponents(row1, row2, row3);
		interaction.showModal(modal);
	}

	@ModalComponent({ id: /embedbuilder-\d{18}/ })
	async embedBuilder(interaction: ModalSubmitInteraction) {
		const channel = interaction.client.channels.cache.get(interaction.customId.split('-')[1]) as TextChannel;
		const title = interaction.fields.getTextInputValue('title');
		const description = interaction.fields.getTextInputValue('description');
		const color = interaction.fields.getTextInputValue('color') || '255 0 0';

		const embed = new EmbedBuilder()
			.setTitle(title)
			.setDescription(description)
			.setColor(color.split(' '))
			.setTimestamp()
		
		await channel.send({ embeds: [embed] });
		await interaction.reply({ content: 'Embed sent!', ephemeral: true });
	}

}
