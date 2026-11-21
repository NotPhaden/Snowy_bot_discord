# Snowy RobRun Discord Bot
A small Discord.js v14 utility bot with `/say`, `/embed`, `/announce`, `/ping`, and `/help`.

## Requirements
- Node.js 20.11+
- A Discord application/bot created in the Discord Developer Portal
- Bot invited with `bot` and `applications.commands` scopes; permissions: Send Messages, Embed Links, View Channels

## Local setup
1. Copy `.env.example` to `.env` and fill in `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_ID`.
2. Optional: set `ALLOWED_ROLE_IDS` to comma-separated staff role IDs. If blank, commands that post messages require Discord **Manage Messages** permission.
3. Run `npm install`.
4. Run `npm run deploy` to register guild slash commands.
5. Run `npm start`.

## Commands
- `/say message channel?` — sends plain text in selected channel or current channel.
- `/embed title description color? footer? channel?` — posts an embed.
- `/announce title description channel?` — posts a branded announcement embed.
- `/ping` — latency check.
- `/help` — command list.

## Deploy on Render
This repository includes `render.yaml` configured as a Background Worker. Create a Render service from the GitHub repository and set the environment variables in Render's dashboard. **Do not commit `.env` or your bot token.** Add `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_ID`, and optionally `ALLOWED_ROLE_IDS`. Build command: `npm install`; start command: `npm start`.

Note: BotGhost is a no-code bot builder and does not run arbitrary Node.js repositories. Use a Node.js worker host (such as Render), Railway, or a VPS for this custom bot.
