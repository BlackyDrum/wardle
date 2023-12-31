import { PrefixPathnameNormalizer } from "next/dist/server/future/normalizers/request/prefix";
import Cell from "./Cell";

import { WordGuessData } from "../api/words/route";

function createCells(word: string, activeRow: number, cellRow: number, data: WordGuessData | null) {
  let cells = [];

  const chars = word.split("");

  for (let i = 0; i < 5; i++) {
    cells.push(
      <Cell
        char={chars[i]?.toUpperCase()}
        activeRow={activeRow}
        cellRow={cellRow}
        data={data}
        col={i}
      />
    );
  }

  return cells;
}

export default function BoardRow(props: {
  word: string;
  row: number;
  cellRow: number;
  data: WordGuessData | null;
}) {
  let cells = createCells(props.word, props.row, props.cellRow, props.data);

  return (
    <div className="flex">
      {cells.map((cell, index) => (
        <span key={index}>{cell}</span>
      ))}
    </div>
  );
}
