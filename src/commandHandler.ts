import fs from "fs";
import { Message } from "discord.js";

import ping from "./commands/ping";
import pong from "./commands/pong";
import mcstat from "./commands/mcstat";
import admin from "./commands/admin";
import say from "./commands/say";
import sayas from "./commands/sayas";
import help from "./commands/help";
import pog from "./commands/pog";
// import prefix from "./commands/prefix";
import test from "./commands/test";
import nickname from "./commands/nickname";
import salute from "./commands/salute";
import wordle from "./commands/wordle";

const commands = { ping, pong, mcstat, admin, say, sayas, help, pog, /* prefix, */ test, nickname, salute, wordle };

// function checkPrefix(data: JSON, msg: Message): string {
//   // Find/create the prefix for the message's guild.
//   if (data.servers[msg.guild.id] == undefined) {
//     data.servers[msg.guild.id] = {
//       prefix: "pog!",
//     };
//   }
//   return data.servers[msg.guild.id].prefix;
// }

export default async function (msg: Message) {
  // let data = fs.readFileSync("./botData.json").toJSON();
  let tokens = msg.content.split(" ");
  let command = tokens.shift();

  // const prefix = checkPrefix(data, msg);
  const prefix = "pogdev!";

  if (command?.substring(0, prefix.length) === prefix) {
    // Remove the prefix from the command
    command = command?.substring(prefix.length);

    try {
      if (command != undefined)
      // @ts-ignore
      commands[command](msg, tokens, prefix);
    } catch (err) {
      console.log(`<commandHandler.ts> Command not found '${command}'`);
    }
  }

  // fs.writeFileSync("./botData.json", JSON.stringify(data, null, 2), (err) => {
  //   if (err) console.error(err);
  // });
};
