import { useEffect, useState } from "react";

import { WordGuessData } from "../../../api/words/route";

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
  const [enlarged, setEnlarged] = useState(false);
  const [spin, setSpin] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    return () => setHasMounted(false);
  }, []);

  useEffect(() => {
    if (props.activeRow === props.cellRow) {
      setChar(props.char);
      if (hasMounted && typeof props.char === "string") {
        setEnlarged(true);
        const timeoutId = setTimeout(() => {
          setEnlarged(false);
        }, 50);

        return () => {
          clearTimeout(timeoutId);
          setEnlarged(false);
        };
      }
    }
  }, [props.activeRow, props.cellRow, props.char, props.col, hasMounted]);

  useEffect(() => {
    if (props.activeRow - 1 === props.cellRow) {
      if (props.data && props.data.result.length !== 0) {
        setColor(props.data.result[props.col].color);
      }
    }
  }, [props.activeRow, props.cellRow, props.col, props.data]);

  useEffect(() => {
    if (props.data && props.data.result.length !== 0 && props.activeRow - 1 === props.cellRow) {
      setSpin(true);
    }
  }, [props.data, props.activeRow, props.cellRow]);

  return (
    <div
      className={`flex m-1 ${spin ? styles.spinAnimation : ""} w-16 h-16 text-3xl ${
        enlarged ? styles.enlarged : ""
      } ${styles[color] || "blank"} border-app-gray border-2`}>
      <div className="m-auto font-bold">{char}</div>
    </div>
  );
}
