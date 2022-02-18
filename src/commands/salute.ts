import { CollectorFilter, Interaction, InteractionCollector, Message, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed } from "discord.js";

export default async function (msg: Message, args: string[]) {
  let saluteEmbed = new MessageEmbed({
    image: {
      url: "https://c.tenor.com/H3Yb1dylRyYAAAAd/putin-dove.gif"
    },
  })

  let row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        // .setCustomId('LINK')
        .setLabel('LINK')
        .setStyle('LINK')
        .setURL("https://ronkzd.xyz"),
      new MessageButton()
        .setCustomId('primary')
        .setLabel('Remove this message')
        .setStyle('DANGER'),
    )

  let response = await msg.channel.send({
    embeds: [saluteEmbed],
    components: [row],
  })

  const filter: CollectorFilter<[MessageComponentInteraction<"cached">]> = (
    i
  ) => {
    return i.customId === "primary" && i.user.id === msg.author.id;
  };
  const collector = msg.channel.createMessageComponentCollector({ filter: filter, time: 15000 })

  collector.on("collect", async i => {
    await i.reply({
      content: "why",
      ephemeral: true
    })

    await response.delete()
  })

  msg.delete();
};