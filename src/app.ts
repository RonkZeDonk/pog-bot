require("dotenv").config();

import { Client } from "discord.js";
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
    "GUILD_MESSAGES",
    "DIRECT_MESSAGES",
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

import commandHandler from "./commandHandler";
import activityChanger from "./activityChanger";

client.on("ready", () => {
  console.log(`Logged in: ${client.user?.tag}`);

  setInterval(() => {
    client.user?.setActivity(activityChanger());
  }, 15000);
});

client.on("messageCreate", commandHandler);

client.login(process.env.TOKEN);

