const Discord = require("discord.js");

module.exports = async function (msg, args, prefix) {
  const embed = new Discord.MessageEmbed()
    .setAuthor("Requested by: " + msg.author.tag, await msg.author.avatarURL())
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
    .addField(
      prefix + "prefix (new prefix)",
      "Change/check the server's prefix",
      false
    )
    .addField(prefix + "admin", "no", false)
    .addField(prefix + "pog", "pog", false)
    .setFooter("Bot by: RonkZeDonk#0045");
  msg.channel.send(embed);
  msg.delete();
};
