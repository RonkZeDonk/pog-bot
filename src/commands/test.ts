import { Message } from "discord.js";

export default function (msg: Message, args: string[]) {
  if (msg.author.id == "191990178368323584") {
    msg.reply("<a:loading:803027108062429184>");
  }
};