require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();
const commandHandler = require("./commandHandler");

const activityChanger = require("./activityChanger");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  setInterval(() => {
    client.user.setActivity(activityChanger());
  }, 15000);
});

client.on("message", commandHandler);

client.login(process.env.TOKEN);
