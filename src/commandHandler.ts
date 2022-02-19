import { Message } from "discord.js";
import { readdirSync } from "fs"

let commands: { [key: string]: any } = {}

const tscommands = readdirSync(__dirname + "/commands").filter(value => value.endsWith(".ts"))

for (let i = 0; i < tscommands.length; i++) {
  const commandName = tscommands[i].slice(0, -3)
  const path = `./commands/${commandName}`
  console.log(`Importing the command "${commandName}" from ${path}`)

  let command = require(path)
  commands[commandName] = command['default']
}

console.log("Done importing!\n")

export default async function (msg: Message) {
  let tokens = msg.content.split(" ");
  let command = tokens.shift();

  const prefix = "pogdev!";

  if (command?.substring(0, prefix.length) === prefix) {
    // Remove the prefix from the command
    command = command?.substring(prefix.length);

    try {
      if (command != undefined)
      commands[command](msg, tokens, prefix);
    } catch (err) {
      console.log(`<commandHandler.ts> Command not found '${command}'`);
    }
  }
};
