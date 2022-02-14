import { Message } from "discord.js"

export default function (msg: Message, args: string[]) {
  if (args) {
    msg.channel.send(args.join(" "))
    msg.delete()
  }
};
