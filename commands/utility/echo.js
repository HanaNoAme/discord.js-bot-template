const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 3,
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies with your input")
    .addStringOption(option => option
      .setName("input")
      .setDescription("The input to echo back")
      .setRequired(true)
      .setMaxLength(2000))
    .addBooleanOption(option => option
      .setName("ephemeral")
      .setDescription("Whether or not the echo should be ephemeral"))
    .addBooleanOption(option => option
      .setName("embed")
      .setDescription("Whether or not the echo should be embedded")),

  async execute(interaction) {
    const input = interaction.options.getString("input");
    const isEphemeral = interaction.options.getBoolean("ephemeral") ?? false;
    let message = { content: input, ephemeral: isEphemeral };

    if (interaction.options.getBoolean("embed") ?? false) {
      const echoEmbed = new EmbedBuilder().setDescription(input);
      message = { ephemeral: isEphemeral, embeds: [echoEmbed] };
    }

    interaction.reply(message);
  },
};