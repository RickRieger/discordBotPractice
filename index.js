require('dotenv').config();
// fs is Nodes native file system module.  useful functionality.
const fs = require('node:fs');
// path is Node's native path utility module. It helps construct paths to access files and directories. Instead of manually writing './currentDirectory/fileYouWant' everywhere, one can instead use path.join() and pass each path segment as an argument. Note however, you should omit '/' or other path segment joiners as these may be different depending on the operating system running your code. One of the advantages of the path module is that it automatically detects the operating system and uses the appropriate joiners.
const path = require('node:path');
// Require the necessary discord.js classes
// Collection is a class that extends JavaScripts native Map class and includes more extensive
const { Client, Collection, Intents } = require('discord.js');
const token = process.env.TOKEN;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply('Server info is here dude.');
  } else if (commandName === 'user') {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  }
});

// Login to Discord with your client's token
client.login(token);
