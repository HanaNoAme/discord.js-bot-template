const { Events } = require('discord.js');
const chalk = require("chalk");

module.exports = {
  name: Events.InteractionCreate,

  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        chalk.redBright.bold("ERROR"),
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    // Check cooldown
    const { cooldowns } = interaction.client;
    if (!cooldowns.has(command.data.name))
      cooldowns.set(command.data.name, new Collection());

    const timestamps = cooldowns.get(command.data.name);
    // The specified cooldown for the command, converted to milliseconds for straightforward calculation. If none is specified, this defaults to three seconds.
    const cooldownAmount = (command.cooldown ?? 3) * 1_000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

      if (Date.now() < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1_000);
        return interaction.reply({ content: `You can use the \`${command.data.name}\` command again <t:${expiredTimestamp}:R>.`, ephemeral: true });
      }
    }

    console.log(`${interaction.user.tag} in #${interaction.channel.name} ${interaction.guild} triggered an interaction: ${interaction.commandName}`);
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(
        chalk.redBright.bold("ERROR"),
        `executing ${interaction.commandName}:`,
        error
      );
      if (interaction.replied || interaction.deferred)
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      else
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  },
};
