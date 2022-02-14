import { Message } from "discord.js";

export default function (msg: Message, args: string[]) {
  msg.reply("I see your ping and I raise you: Pong!");
};
