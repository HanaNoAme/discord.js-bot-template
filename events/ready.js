const { Events } = require('discord.js');
const chalk = require("chalk");

module.exports = {
  name: Events.ClientReady,
  once: true,

  execute(client) {
    console.log(
      chalk.greenBright("Ready!"),
      `Logged in as ${client.user.tag}`
    );
  },
};