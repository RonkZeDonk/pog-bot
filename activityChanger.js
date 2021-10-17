const activities = [
  "with your life",
  "a game..",
  "with your mom",
  "ronkzd.xyz/rr",
  "weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  "with 🔥🔥🔥",
  "with that dangly thing that swings at the back of your throat",
  "pog",
  "POG",
  "owa owa",
  "owa owa",
  "with Mike Ock",
  "Ben Dover Simulator 2016",
];

module.exports = function () {
  const index = Math.floor(Math.random() * (activities.length - 1));
  return activities[index];
};
