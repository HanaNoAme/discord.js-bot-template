const { Events } = require('discord.js');
const chalk = require("chalk");

module.exports = {
	name: Events.InteractionCreate,
	// Command handler
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction: ${interaction.commandName}`);

		if (!command) {
			console.error(
				chalk.redBright.bold("ERROR"),
				`No command matching ${interaction.commandName} was found.`
			);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(
				chalk.redBright.bold("ERROR"),
				`executing ${interaction.commandName}:`,
				error
			);
			await interaction.reply({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	},
};
