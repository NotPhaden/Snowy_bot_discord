require('dotenv').config();
const { Client, GatewayIntentBits, Events, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const allowedRoles = (process.env.ALLOWED_ROLE_IDS || '').split(',').map(s => s.trim()).filter(Boolean);

function isAllowed(interaction) {
  if (interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) return true;
  if (!allowedRoles.length) return false;
  return interaction.member?.roles?.cache?.some(role => allowedRoles.includes(role.id)) || false;
}
function snowyEmbed(title, description, color = 0x19AFFF) {
  return new EmbedBuilder().setColor(color).setTitle(title).setDescription(description).setFooter({ text: 'Snowy RobRun Cheats' }).setTimestamp();
}
client.once(Events.ClientReady, c => console.log(`Logged in as ${c.user.tag}`));
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  if (commandName === 'ping') return interaction.reply({ content: `🏓 Pong! **${client.ws.ping}ms**`, ephemeral: true });
  if (commandName === 'help') return interaction.reply({ ephemeral: true, embeds: [snowyEmbed('❄️ Snowy RobRun Bot — Commands', '`/say` — Send a message\n`/embed` — Create a custom embed\n`/announce` — Post an announcement\n`/ping` — Check bot latency\n`/help` — Show commands')] });
  if (!isAllowed(interaction)) return interaction.reply({ content: '❌ You need **Manage Messages** permission or an authorized staff role to use this command.', ephemeral: true });
  try {
    if (commandName === 'say') {
      const text = interaction.options.getString('message', true);
      const channel = interaction.options.getChannel('channel') || interaction.channel;
      if (!channel?.isTextBased()) return interaction.reply({ content: '❌ Select a text channel.', ephemeral: true });
      await channel.send({ content: text });
      return interaction.reply({ content: `✅ Message sent in ${channel}.`, ephemeral: true });
    }
    if (commandName === 'embed') {
      const title = interaction.options.getString('title', true);
      const description = interaction.options.getString('description', true);
      const color = interaction.options.getString('color') || '#19AFFF';
      const footer = interaction.options.getString('footer') || 'Snowy RobRun Cheats';
      const channel = interaction.options.getChannel('channel') || interaction.channel;
      if (!channel?.isTextBased()) return interaction.reply({ content: '❌ Select a text channel.', ephemeral: true });
      const embed = new EmbedBuilder().setTitle(title).setDescription(description).setColor(color).setFooter({ text: footer }).setTimestamp();
      await channel.send({ embeds: [embed] });
      return interaction.reply({ content: `✅ Embed sent in ${channel}.`, ephemeral: true });
    }
    if (commandName === 'announce') {
      const title = interaction.options.getString('title', true);
      const description = interaction.options.getString('description', true);
      const channel = interaction.options.getChannel('channel') || interaction.channel;
      if (!channel?.isTextBased()) return interaction.reply({ content: '❌ Select a text channel.', ephemeral: true });
      await channel.send({ embeds: [snowyEmbed(`📢 ${title}`, description)] });
      return interaction.reply({ content: `✅ Announcement posted in ${channel}.`, ephemeral: true });
    }
  } catch (err) {
    console.error(err);
    const msg = '❌ Something went wrong. Check the bot permissions and channel settings.';
    if (interaction.replied || interaction.deferred) await interaction.followUp({ content: msg, ephemeral: true });
    else await interaction.reply({ content: msg, ephemeral: true });
  }
});
if (!process.env.DISCORD_TOKEN) { console.error('Missing DISCORD_TOKEN in environment.'); process.exit(1); }
client.login(process.env.DISCORD_TOKEN);
