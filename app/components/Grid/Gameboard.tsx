"use client";

import { useEffect, useState } from "react";
import BoardRow from "./Row/BoardRow";
import axios from "axios";

import { Notify } from "notiflix/build/notiflix-notify-aio";

import { WordGuessData } from "../../api/words/route";
import VirtualKeyboard from "../Keyboard/VirtualKeyboard";

function createBoard(currentWord: string, currentRow: number, data: WordGuessData | null) {
  let rows = [];
  for (let i = 0; i < 6; i++) {
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

  const [apiData, setApiData] = useState<WordGuessData | null>(null);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      setCurrentWord((prevWord) => prevWord.slice(0, -1));
    } else if (e.key.match(/[a-z]/i) && e.key.length === 1) {
      setCurrentWord((prevWord) => prevWord + e.key);
    }
  };

  const handleClick = (value: string) => {
    if (value === "<--") {
      setCurrentWord((prevWord) => prevWord.slice(0, -1));
    } else if (value.match(/[a-z]/i) && value.length === 1) {
      setCurrentWord((prevWord) => prevWord + value);
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (currentWord.length === 5) {
      axios
        .get(`/api/words?word=${currentWord.toLowerCase()}`)
        .then((response) => {
          setApiData(response.data);
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
        });
    }
  }, [currentWord]);

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
      <VirtualKeyboard handleClick={handleClick} />
    </div>
  );
}
