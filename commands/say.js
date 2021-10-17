module.exports = function (msg, args) {
  if (args) {
    msg.channel.send(args.join(" "))
    msg.delete()
  }
};
