const fs = require("fs");

module.exports = function (msg, args, prefix) {
  let data = JSON.parse(fs.readFileSync("./botData.json"));

  if (args[0]) {
    console.log(args[0]);

    data.servers[msg.guild.id].prefix = args[0];
    try {
      fs.writeFileSync("./botData.json", JSON.stringify(data, null, 2));
      console.log(
        "Wrote: " +
          JSON.stringify(data.servers[msg.guild.id].prefix) +
          "\nNow in file as: " +
          JSON.parse(fs.readFileSync("./botData.json")).servers[msg.guild.id]
            .prefix
      );
    } catch (err) {
      console.error(err);
    }

    msg.reply(
      "The server's prefix is now: '" +
        data.servers[msg.guild.id].prefix +
        "'\nExample command: '" +
        data.servers[msg.guild.id].prefix +
        "help'"
    );
  } else {
    msg.reply(
      "The server's prefix is: '" +
        prefix +
        "'" +
        "\nExample command: '" +
        prefix +
        "help'"
    );
  }
};
