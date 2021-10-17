const fs = require("fs");

const ping = require("./commands/ping");
const pong = require("./commands/pong");
const mcstat = require("./commands/mcstat");
const admin = require("./commands/admin");
const say = require("./commands/say");
const sayas = require("./commands/sayas");
const help = require("./commands/help");
const pog = require("./commands/pog");
const prefix = require("./commands/prefix");
const test = require("./commands/test");

const commands = { ping, pong, mcstat, admin, say, sayas, help, pog, prefix, test };

function checkPrefix(data, msg) {
  // Find/create the prefix for the message's guild.
  if (data.servers[msg.guild.id] == undefined) {
    data.servers[msg.guild.id] = {
      prefix: "pog!",
    };
  }
  return data.servers[msg.guild.id].prefix;
}

module.exports = async function (msg) {
  let data = JSON.parse(fs.readFileSync("./botData.json"));
  let tokens = msg.content.split(" ");
  let command = tokens.shift();

  const prefix = checkPrefix(data, msg);
  // const prefix = "!";

  if (command.substring(0, prefix.length) === prefix) {
    // Remove the prefix from the command
    command = command.substring(prefix.length);

    try {
      commands[command](msg, tokens, prefix);
    } catch (err) {
      console.log(err);
    }
  }

  fs.writeFileSync("./botData.json", JSON.stringify(data, null, 2), (err) => {
    if (err) console.error(err);
  });
};
