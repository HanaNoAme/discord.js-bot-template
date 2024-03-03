const { SlashCommandBuilder, blockQuote, time } = require("discord.js");
const { stripIndents, stripIndent } = require("common-tags");

module.exports = {
  cooldown: 3,
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get info about a user or a server")
    .addSubcommand(subcommand => subcommand
      .setName("user")
      .setDescription("Replies with user info")
      .addUserOption(option => option
        .setName("target")
        .setDescription("The user")))
    .addSubcommand(subcommand => subcommand
      .setName("server")
      .setDescription("Replies with server info")),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === "user") {
      const user = interaction.options.getUser("target") ?? interaction.user;
      await interaction.reply({
        content: stripIndents`
          ${user}'s Info
          ${blockQuote(stripIndent`
            Username: ${user.tag}
            ID: ${user.id}
            Joined Discord on ${time(interaction.user.createdAt)}(${time(interaction.user.createdAt, "R")})
            Joined ${interaction.guild.name} on ${time(interaction.member.joinedAt)}(${time(interaction.member.joinedAt, "R")})
        `)}`,
        allowedMentions: { "users": [] }
      });
    } else if (interaction.options.getSubcommand() === "server") {
      await interaction.reply(stripIndents`
        Server name: ${interaction.guild.name}
        Total members: ${interaction.guild.memberCount}
      `);
    }
  },
};