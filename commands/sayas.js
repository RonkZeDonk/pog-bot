module.exports = async function (msg, args) {
  if (args) {
    const authorAv = await msg.author.avatarURL();
    const channel = msg.channel;
    msg.delete();

    channel.createWebhook("sayas command");
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first();

    try {
      const name = args.shift();

      var webAv = authorAv;
      if (args[0].includes("https") || args[0].includes("http")) {
        webAv = args.shift();
      }

      await webhook.send(args.join(" "), {
        username: name,
        avatarURL: webAv,
      });
    } catch (e) {
      console.error(e);
    }

    webhook.delete();
  }
};
