import { Message, TextChannel, Webhook } from "discord.js";

export default async function (msg: Message, args: string[]) {
  if (args.length > 1) {
    const channel = msg.channel;
    const authorAv = msg.author.avatarURL();
    if (authorAv === null) return
    msg.delete();

    if (channel.type != "GUILD_TEXT") return
    channel.createWebhook("sayas command");
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first();
    if (webhook == undefined) return

    try {
      const name = args.shift();

      var webAv = authorAv;
      if (args[0].substring(0, 4) == "http") {
        webAv = args.shift() as string;
      }

      await webhook.send({
        username: name,
        avatarURL: webAv,
        content: args.join(" ")
      })
    } catch (e) {
      console.error(e);
    }

    webhook.delete();
  } else {
    console.log("needs more args")
  }
};
