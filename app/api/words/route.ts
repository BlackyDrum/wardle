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
  keyBoard?: Record<string, string>;
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
    response.message = "Word is not in the wordlist!";
    return createResponse(response, 400);
  }

  response.validGuess = true;

  let corretGuess = true;
  for (let i = 0; i < userWord.length; i++) {
    let r: WordGuessResult = {
      index: i,
      letter: userWord[i],
      color: "gray",
    };

    if (userWord[i] === correctWord[i]) {
      r.color = "green";
    } else if (correctWord.includes(userWord[i])) {
      r.color = "yellow";
      corretGuess = false;
    } else {
      corretGuess = false;
    }

    response.result.push(r);
  }

  response.correctWord = corretGuess;

  return createResponse(response);
}
