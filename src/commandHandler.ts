import { Message } from "discord.js";
import { readdirSync, readFileSync } from "fs"

let commands: { [key: string]: any } = {}

const tscommands = readdirSync(__dirname + "/commands").filter(value => value.endsWith(".ts"))

// Maybe revert it to manual importing; this is slow on the pi
for (let i = 0; i < tscommands.length; i++) {
  const commandName = tscommands[i].slice(0, -3)
  const path = `./commands/${commandName}`
  
  import(path).then(module => {
    commands[commandName] = module["default"]
    console.log(`Imported "${commandName}" from ${path}`)
  });
}

export default async function (msg: Message) {
  let tokens = msg.content.split(" ");
  let command = tokens.shift();

  if (!msg.guild) return
  let prefix: string = JSON.parse(readFileSync("./botData.json").toString()).servers[msg.guild.id].prefix;
  // const prefix = "pogdev!";

  let optional = {
    "prefix": prefix
  }

  if (command?.substring(0, prefix.length) === prefix) {
    // Remove the prefix from the command
    command = command?.substring(prefix.length);

    try {
      if (command != undefined)
      commands[command](msg, tokens, optional);
    } catch (err) {
      console.log(`<commandHandler.ts> Command not found '${command}'`);
    }
  }
};
