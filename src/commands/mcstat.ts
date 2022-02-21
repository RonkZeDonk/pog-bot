import Discord, { Message } from "discord.js";

const DefaultServerImage = "https://static.wikia.nocookie.net/minecraft/images/f/fe/GrassNew.png/revision/latest/"
const FooterImage = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/50/Book_JE2_BE2.png/revision/latest/"

async function checkImg(data: any): Promise<boolean> {
  return await fetch(data.favicon).then((res) => {
    return (res.status == 200);
  });
}

function checkOnline(data: any) {
  return data.status;
}

export default async function (msg: Message, args: string[]) {
  let msgRes = new Discord.MessageEmbed()
    .setColor("#d6ab0f")
    .setTitle(`<a:loading:803027108062429184> Checking info for: "${args[0]}"`);

  msg.channel.send({embeds: [msgRes]}).then(async (embedRes) => {
    let reqUser = msg.author.tag;
    msg.delete();

    let url = `https://mc-api.net/v3/server/ping/${args[0]}`;
    let res = await fetch(url);
    let jsonRes = await res.json();

    let embed;

    if (checkOnline(jsonRes)) {
      embed = new Discord.MessageEmbed({
        footer: {
          text: "API: mc-api.net, Command by: RonkZeDonk",
          iconURL: FooterImage,
        }
      })
        .setColor("#10a326")
        .setTitle(`Server Info for: "${args[0]}"`)
        .setDescription(
          `Players online: ${jsonRes.players.online}/${jsonRes.players.max}\nVersion: ${jsonRes.version.name}`
        )
        .setThumbnail(
          (await checkImg(jsonRes))
            ? DefaultServerImage
            : jsonRes.favicon
        )
        .setTimestamp();

      // Add player list if possible
      if (typeof jsonRes.players.sample != "undefined" && jsonRes.players.sample.length != 0) {
        let playerList = "";
        
        jsonRes.players.sample.forEach((player: any) => {
          playerList = `${playerList}${player.name.replace(/_/g, "\\_")}\n`;
        });
        let plSplit = playerList.split("\n")
        plSplit.pop()
                
        if (plSplit.length >= 5) {
          let pl = []
          for (var i = 0; i <= 5; i++) {
            if (i <= 4) {
              pl.push(plSplit[i])
            } else {
              pl.push(`and ${plSplit.length - 5} more`)
            }
          }
          plSplit = pl
        }

        playerList = plSplit.join("\n")

        embed.addField("Players:", playerList);
      }

      // Add requested by user
      embed.addField("Requested by: ", reqUser);
    } else {
      embed = new Discord.MessageEmbed({
        footer: {
          text: "API: mc-api.net, Command by: RonkZeDonk",
          iconURL: FooterImage,
        }
      })
        .setColor("#db1f25")
        .setTitle(`Server Info for: "${args[0]}"`)
        .setDescription(`Server is offline or query is off...`)
        .setThumbnail(DefaultServerImage)
        .addField("Requested by: ", reqUser)
        .setTimestamp();
    }

    embedRes.edit({embeds: [embed]});
  });
};
