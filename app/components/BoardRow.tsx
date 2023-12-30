import { PrefixPathnameNormalizer } from "next/dist/server/future/normalizers/request/prefix";
import Cell from "./Cell";

function createCells(word: string, activeRow: number, cellRow: number) {
  let cells = [];

  const chars = word.split("");

  for (let i = 0; i < 5; i++) {
    cells.push(<Cell char={chars[i]?.toUpperCase()} activeRow={activeRow} cellRow={cellRow} />);
  }

  return cells;
}

export default function BoardRow(props: { word: string; row: number; cellRow: number }) {
  let cells = createCells(props.word, props.row, props.cellRow);

  return (
    <div className="flex">
      {cells.map((cell, index) => (
        <span key={index}>{cell}</span>
      ))}
    </div>
  );
}
