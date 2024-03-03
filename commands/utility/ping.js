const { SlashCommandBuilder, inlineCode, blockQuote } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
  cooldown: 1,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong"),

  async execute(interaction) {
    const sent = await interaction.reply({ content: "Pinging...", fetchReply: true });
    interaction.editReply(stripIndents`
      Pong!
      ${blockQuote(stripIndents`
        Websocket heartbeat: ${inlineCode(`${Math.round(interaction.client.ws.ping)}ms`)}
        Roundtrip latency: ${inlineCode(`${sent.createdTimestamp - interaction.createdTimestamp}ms`)}
      `)}
    `);
  },
};