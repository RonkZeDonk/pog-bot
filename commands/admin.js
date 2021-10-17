module.exports = function (msg, args) {
  if (msg.author.id == 191990178368323584) {
    msg.reply("You are admin!");
  } else {
    msg.reply("no...");
  }
};
