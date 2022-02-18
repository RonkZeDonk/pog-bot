import { Message } from "discord.js";

export default async function (msg: Message, args: string[]) {
    let nickname = (await msg.guild?.members.fetch({user: msg.author}))?.nickname;
    if (nickname === null) 
        msg.channel.send(`${msg.author.username} doesn't have a nickname`);
    else
        msg.channel.send(`${msg.author.username} => ${nickname}`)
}