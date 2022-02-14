import { Message } from "discord.js";

export default async function (msg: Message, args: string[]) {
    let nickname = (await msg.guild?.members.fetch({user: msg.author}))?.nickname;
    msg.channel.send(`${msg.author.username} => ${nickname}`)
}