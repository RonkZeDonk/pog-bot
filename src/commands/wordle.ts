import { Message, MessageEmbed } from "discord.js";
import wordleWords from "../wordle-words.json";

const BLANK_COLOUR: "white" | "black" = "white";

type WordleColor = "white" | "black" | "red" | "yellow" | "green";
interface BoardCell {
  letter: string;
  color: WordleColor;
}
type BoardRow = [BoardCell, BoardCell, BoardCell, BoardCell, BoardCell];
type Board = [BoardRow, BoardRow, BoardRow, BoardRow, BoardRow, BoardRow];

function readWords(board: Board): string[] {
  let wordsArr: string[] = ["", "", "", "", "", ""];

  board.forEach((row, rowIndex) => {
    row.forEach((cell) => {
      wordsArr[rowIndex] += cell.letter;
    });
  });

  return wordsArr;
}

function addGuess(board: Board, guess: string, realWord: string) {
  if (readWords(board).includes(guess)) return false;

  let solved = 0;

  for (let i = 5; i >= 0; i--) {
    if (board[i][0].letter != "" || board[0][0].letter == "") {
      let index = i + 1;
      if (board[0][0].letter == "") index = 0;

      for (let j = 0; j < 5; j++) {
        // Add the letters
        board[index][j].letter = guess[j];

        // Add the colours
        if (guess[j] === realWord[j]) {
          board[index][j].color = "green";
          solved++;
        } else if (realWord.includes(guess[j])) {
          board[index][j].color = "yellow";
        } else {
          board[index][j].color = "red";
        }
      }
      break;
    }
  }
  return solved === 5;
}

function render(board: Board): MessageEmbed {
  let embed = new MessageEmbed({
    title: "Wordle",
    color: "NOT_QUITE_BLACK",
  });

  let embedDesc = "";

  for (let row = 0; row < 6; row++) {
    // do letters
    for (let col = 0; col < 5; col++) {
      let letter = board[row][col].letter.toLowerCase();
      if (letter != "") {
        let letterEmoji = `:regional_indicator_${letter}:`;

        embedDesc += `${letterEmoji} `;
      }
    }
    if (board[row][0].letter != "") embedDesc += "\n";

    // do colours
    for (let col = 0; col < 5; col++) {
      let colour = board[row][col].color;

      let colourEmoji =
        colour == BLANK_COLOUR
          ? `:${BLANK_COLOUR}_large_square:`
          : `:${colour}_circle:`;

      embedDesc += `${colourEmoji} `;
    }
    embedDesc += "\n\n";
  }

  embed.setDescription(embedDesc);

  return embed;
}

export default async function (msg: Message, args: string[]) {
  const startTime = Date.now();

  let max = wordleWords.length;
  const WORDLEWORD = wordleWords[Math.floor(Math.random() * (max - 1))];

  const gameMsg = await msg.channel.send({
    embeds: [
      new MessageEmbed({
        title: "Wordle",
        color: "NOT_QUITE_BLACK",
        description: "Welcome to wordle\n" + "Pick a starter word",
      }),
    ],
  });

  // 6 rows, 5 cols
  let board: Board = [
    [
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
    ],
    [
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
    ],
    [
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
    ],
    [
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
    ],
    [
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
    ],
    [
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
      { letter: "", color: BLANK_COLOUR },
    ],
  ];

  const filter = (i: Message) => {
    let res = i.author.id === msg.author.id;

    if (res) {
      if (i.content === "wordle-stop") {
        collector.stop();
        i.reply("Goodbye");
        return false;
      }

      if (i.content.length != 5 || !wordleWords.includes(i.content)) {
        i.reply(
          `"${i.content}" is not valid word. Type "wordle-stop" to stop playing`
        ).then((thisMsg) => setTimeout(() => thisMsg.delete(), 5000));
        return false;
      }
    }
    return res;
  };
  const collector = msg.channel.createMessageCollector({
    filter: filter,
    time: 4 * 60 * 1000, // Game Length Max 4 minutes
  });
  collector.on("collect", (i) => {
    let finished = addGuess(board, i.content, WORDLEWORD);
    gameMsg.edit({
      embeds: [render(board)],
    });

    if (finished) {
      msg.reply(
        `${msg.author.username} YOU WIN!\nTime: ${
          (Date.now() - startTime) / 1000
        } seconds`
      );
      collector.stop();
    }
  });
}
