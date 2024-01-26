"use client";

import { useEffect, useRef, useState } from "react";
import BoardRow from "./Row/BoardRow";
import axios from "axios";

import { Notify } from "notiflix/build/notiflix-notify-aio";

import { WordGuessData } from "../../api/words/route";
import VirtualKeyboard from "../Keyboard/VirtualKeyboard";

function createBoard(currentWord: string, currentRow: number, data: WordGuessData | null) {
  let rows = [];
  const guessTries = process.env.GUESS_TRIES || "6";
  for (let i = 0; i < Number.parseInt(guessTries); i++) {
    rows.push(
      <div>
        <BoardRow word={currentWord} row={currentRow} cellRow={i} data={data} />
      </div>
    );
  }

  return rows;
}

export default function Gameboard() {
  const [currentWord, setCurrentWord] = useState("");

  const [currentRow, setCurrentRow] = useState(0);

  const [enterPressed, setEnterPressed] = useState(false);

  const [apiData, setApiData] = useState<WordGuessData | null>(null);

  const gameIsWon = useRef(false);

  const gameIsLost = useRef(false);

  const isValidating = useRef(false);

  const guessTries = process.env.GUESS_TRIES || "6";

  const handleKeyUp = (e: KeyboardEvent) => {
    if (gameIsWon.current || gameIsLost.current || isValidating.current) return;
    if (e.key === "Backspace") {
      setCurrentWord((prevWord) => prevWord.slice(0, -1));
    } else if (e.key.match(/[a-z]/i) && e.key.length === 1) {
      setCurrentWord((prevWord) => (prevWord.length < 5 ? prevWord + e.key : prevWord));
    }
  };

  const handleEnterDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setEnterPressed(true);
    }
  };

  const handleEnterUp = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setEnterPressed(false);
    }
  };

  const handleClick = (value: string) => {
    if (gameIsWon.current || gameIsLost.current || isValidating.current) return;
    if (value === "<--") {
      setCurrentWord((prevWord) => prevWord.slice(0, -1));
    } else if (value === "Enter") {
      setEnterPressed(true);
      setTimeout(() => {
        setEnterPressed(false);
      }, 100);
    } else if (value.match(/[a-z]/i) && value.length === 1) {
      setCurrentWord((prevWord) => (prevWord.length < 5 ? prevWord + value : prevWord));
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleEnterDown);
    document.addEventListener("keyup", handleEnterUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleEnterDown);
      document.removeEventListener("keyup", handleEnterUp);
    };
  }, []);

  useEffect(() => {
    if (currentRow === Number.parseInt(guessTries) && !gameIsWon.current) {
      gameIsLost.current = true;
    }
  }, [currentRow, guessTries]);

  useEffect(() => {
    if (currentWord.length === 5 && enterPressed) {
      isValidating.current = true;
      axios
        .get(`/api/words?word=${currentWord.toLowerCase()}`)
        .then((response) => {
          setApiData(response.data);
          if (response.data.correctWord) {
            gameIsWon.current = true;
          }
        })
        .catch((error) => {
          setCurrentRow((currentRow) => currentRow - 1);
          setCurrentWord("");

          Notify.failure(error.response.data.message, {
            timeout: 6000,
          });
        })
        .finally(() => {
          setCurrentRow((currentRow) => currentRow + 1);
          setCurrentWord("");

          isValidating.current = false;
        });
    }
  }, [currentWord, enterPressed]);

  let rows = createBoard(currentWord, currentRow, apiData);

  return (
    <div>
      <div className="flex">
        <div className="mx-auto mt-6">
          {rows.map((row, index) => (
            <div key={index}>{row}</div>
          ))}
        </div>
      </div>
      <VirtualKeyboard handleClick={handleClick} data={apiData} />
    </div>
  );
}
