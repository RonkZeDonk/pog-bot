import { Message, MessageEmbed } from "discord.js";

const Discord = require("discord.js");

export default async function (msg: Message, args: string[], prefix: string) {
  let avatarURL = await msg.author.avatarURL()
  if (avatarURL == null) return

  const embed = new MessageEmbed({
    author: {
      name: "Requested by: " + msg.author.tag,
      iconURL: avatarURL
    },
    footer: {
      text: "Bot by: RonkZeDonk#0045"
    }
  })
    .setTitle("Pog")
    .setDescription("Commands List")
    .addField(
      "The prefix for this server is '" + prefix + "'",
      "---------------",
      false
    )
    .addField(
      prefix + "mcstat [server ip]",
      "Get the status of a Minecraft server",
      false
    )
    .addField(prefix + "help", "Display this message", false)
    .addField(
      prefix + "say [message]",
      "Say a custom message as the bot",
      false
    )
    .addField(
      prefix + "sayas [name] (image_url) [message]",
      "Say a custom message as a custom user",
      false
    )
    .addField(prefix + "ping", "Check to see if the bot is up", false)
    .addField(prefix + "pong", "Check to see if the bot is up", false)
    // .addField(
    //   prefix + "prefix (new prefix)",
    //   "Change/check the server's prefix",
    //   false
    // )
    .addField(prefix + "nickname", "Get your current nickname", false)
    .addField(prefix + "admin", "no", false)
    .addField(prefix + "pog", "pog", false)
  msg.channel.send({embeds: [embed]});
  msg.delete();
};
