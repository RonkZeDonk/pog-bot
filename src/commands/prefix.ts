import { Message } from "discord.js";
import fs from "fs";

export default function (msg: Message, args: string[]) {
  let data = JSON.parse(fs.readFileSync("./botData.json").toString());

  if (!msg.guild) return;

  if (args[0]) {
    data.servers[msg.guild.id].prefix = args[0];
    try {
      fs.writeFileSync("./botData.json", JSON.stringify(data, null, 2));
      const newPrefix = data.servers[msg.guild.id].prefix;
      msg.reply(
        `The server's prefix is now: '${newPrefix}'\n` +
          `Example command: '${newPrefix}help'`
      );
    } catch (err) {
      console.error(err);
    }
  } else {
    const prefix = data.servers[msg.guild.id].prefix;
    msg.reply(
      `The server's prefix is: '${prefix}'\n` +
        `Example command: '${prefix}help'`
    );
  }
}
