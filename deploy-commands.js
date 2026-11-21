require('dotenv').config();
const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const commands = [
  new SlashCommandBuilder().setName('say').setDescription('Send a message as Snowy Bot')
    .addStringOption(o => o.setName('message').setDescription('Message content').setRequired(true))
    .addChannelOption(o => o.setName('channel').setDescription('Channel to send the message to')),
  new SlashCommandBuilder().setName('embed').setDescription('Send a custom embed')
    .addStringOption(o => o.setName('title').setDescription('Embed title').setRequired(true))
    .addStringOption(o => o.setName('description').setDescription('Embed description').setRequired(true))
    .addStringOption(o => o.setName('color').setDescription('Hex color, e.g. #19AFFF'))
    .addStringOption(o => o.setName('footer').setDescription('Footer text'))
    .addChannelOption(o => o.setName('channel').setDescription('Channel to send the embed to')),
  new SlashCommandBuilder().setName('announce').setDescription('Post a Snowy RobRun announcement')
    .addStringOption(o => o.setName('title').setDescription('Announcement title').setRequired(true))
    .addStringOption(o => o.setName('description').setDescription('Announcement message').setRequired(true))
    .addChannelOption(o => o.setName('channel').setDescription('Channel to post in')),
  new SlashCommandBuilder().setName('ping').setDescription('Check bot latency'),
  new SlashCommandBuilder().setName('help').setDescription('Show available commands')
].map(c => c.toJSON());
(async () => {
  if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID || !process.env.GUILD_ID) throw new Error('Set DISCORD_TOKEN, CLIENT_ID and GUILD_ID in .env');
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
  console.log('Slash commands registered to the selected server.');
})();
