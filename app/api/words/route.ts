import { generate, count } from "random-words";
import { promises as fs } from "fs";
import { wordList } from "./wordsList";

interface WordDataProps {
  date: string;
  word: string;
}

interface WordGuessResult {
  index: number;
  letter: string;
  color: BackgroundColor;
}

export interface WordGuessData {
  guess: string;
  correctWord: boolean;
  wordLength: number;
  validGuess: boolean;
  result: WordGuessResult[];
  message?: string;
}

type BackgroundColor = "gray" | "yellow" | "green";

async function readFile(path: string) {
  const file = await fs.readFile(process.cwd() + path);
  const data: WordDataProps = JSON.parse(file.toString());

  return data;
}

function createResponse(response: WordGuessData, status = 200) {
  return new Response(JSON.stringify(response), {
    headers: { "content-type": "application/json" },
    status,
  });
}

export async function GET(request: Request) {
  let filepath = "/app/api/words/word.json";

  let data: WordDataProps = await readFile(filepath);

  if (!data.word || data.date !== new Date().toJSON().slice(0, 10)) {
    let todayWord = generate({ minLength: 5, maxLength: 5 });
    let date = new Date().toJSON().slice(0, 10);
    await fs.writeFile(process.cwd() + filepath, JSON.stringify({ date: date, word: todayWord }));
  }

  data = await readFile(filepath);

  let userWord = request.url.slice(request.url.lastIndexOf("=") + 1).toLowerCase();
  let correctWord = data.word.toLowerCase();

  let response: WordGuessData = {
    guess: userWord,
    correctWord: false,
    validGuess: false,
    wordLength: userWord.length,
    result: [],
  };

  if (userWord.length !== 5) {
    response.message = "Word must be 5 letters long!";
    return createResponse(response, 400);
  }

  if (!wordList.includes(userWord)) {
    response.message = `'${userWord}' is not in the wordlist!`;
    return createResponse(response, 400);
  }

  response.validGuess = true;

  interface DuplicateTrack {
    letter: string;
    count: number;
  }

  let duplicateInWord: DuplicateTrack[] = [];

  for (let i = 0; i < correctWord.length; i++) {
    let existingDuplicate = duplicateInWord.find((d) => d.letter === correctWord[i]);

    if (existingDuplicate) {
      existingDuplicate.count++;
    } else {
      duplicateInWord.push({ letter: correctWord[i], count: 1 });
    }
  }

  let corretGuess = true;
  for (let i = 0; i < userWord.length; i++) {
    let r: WordGuessResult = {
      index: i,
      letter: userWord[i],
      color: "gray",
    };

    let index = duplicateInWord.findIndex((d) => d.letter === userWord[i]);

    if (userWord[i] === correctWord[i]) {
      for (let j = 0; j < response.result.length; j++) {
        if (
          response.result[j].letter === userWord[i] &&
          response.result[j].color !== "green" &&
          index !== -1 &&
          duplicateInWord[index].count === 0
        ) {
          response.result[j].color = "gray";
          break;
        }
      }
      r.color = "green";
      if (index !== -1) duplicateInWord[index].count--;
    } else if (
      correctWord.includes(userWord[i]) &&
      index !== -1 &&
      duplicateInWord[index].count > 0
    ) {
      r.color = "yellow";
      if (index !== -1) duplicateInWord[index].count--;
      corretGuess = false;
    } else {
      corretGuess = false;
    }

    response.result.push(r);
  }

  response.correctWord = corretGuess;

  return createResponse(response);
}
