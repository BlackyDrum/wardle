"use client";

import { useEffect, useState } from "react";
import BoardRow from "./BoardRow";
import axios from "axios";

function createBoard(currentWord: string, currentRow: number) {
  let rows = [];
  for (let i = 0; i < 6; i++) {
    rows.push(
      <div>
        <BoardRow word={currentWord} row={currentRow} cellRow={i} />
      </div>
    );
  }

  return rows;
}

export default function Gameboard() {
  const [currentWord, setCurrentWord] = useState("");

  const [currentRow, setCurrentRow] = useState(0);

  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setCurrentWord((currentWord) => currentWord + e.key);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentWord, currentRow]);

  useEffect(() => {
    if (currentWord.length === 5) {
      axios
        .get(`https://api.infinitewords.uk/api/guess/${currentWord}`)
        .then((data) => {})
        .catch((error) => {})
        .then(() => {
          setCurrentRow((currentRow) => currentRow + 1);
          setCurrentWord("");
        });
    }
  }, [currentWord]);

  let rows = createBoard(currentWord, currentRow);

  return (
    <div className="flex">
      {apiData}
      <div className="mx-auto mt-6">
        {rows.map((row, index) => (
          <div key={index}>{row}</div>
        ))}
      </div>
    </div>
  );
}
