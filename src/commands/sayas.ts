import { DMChannel, Message, TextChannel, Webhook } from "discord.js";

export default async function (msg: Message, args: string[]) {
  if (args) {
    const authorAv = await msg.author.avatarURL();
    const channel = msg.channel;
    msg.delete();

    (channel as TextChannel).createWebhook("sayas command");
    const webhooks = await (channel as TextChannel).fetchWebhooks();
    const webhook = (webhooks.first() as Webhook);

    try {
      const name = args.shift();

      var webAv = (authorAv as string);
      if (args[0].includes("https") || args[0].includes("http")) {
        webAv = (args.shift() as string);
      }

      webhook.send({
        username: name,
        avatarURL: webAv,
        content: args.join(" ")
      })
    } catch (e) {
      console.error(e);
    }

    webhook.delete();
  }
};
