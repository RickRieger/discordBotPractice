const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Server info is here dude.'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
