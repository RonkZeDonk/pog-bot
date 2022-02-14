import { Message } from "discord.js";

export default function (msg: Message, args: string[]) {
  msg.reply("I see your pong and I raise you: Ping!");
};
