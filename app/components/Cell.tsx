import { useEffect, useState } from "react";

import { WordGuessData } from "../api/words/route";

import styles from "./cell.module.css";

export default function Cell(props: {
  char: string;
  activeRow: number;
  cellRow: number;
  data: WordGuessData | null;
  col: number;
}) {
  const [char, setChar] = useState("");

  const [color, setColor] = useState("");

  useEffect(() => {
    if (props.activeRow === props.cellRow) {
      setChar(props.char);
    }
  }, [props.activeRow, props.cellRow, props.char, props.col]);

  useEffect(() => {
    if (props.activeRow - 1 === props.cellRow) {
      if (props.data && props.data.result.length !== 0) {
        setColor(props.data.result[props.col].color);
      }
    }
  }, [props.activeRow, props.cellRow, props.col, props.data]);

  return (
    <div
      className={`flex m-1 w-16 h-16 text-3xl ${
        styles[color] || "blank"
      } border-app-gray border-2`}>
      <div className="m-auto font-bold">{char}</div>
    </div>
  );
}
