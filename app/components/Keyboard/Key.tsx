import styles from "./key.module.css";

import { useEffect, useState } from "react";

export default function Key(props: {
  value: string;
  handleClick: (value: string) => void;
  color: string;
}) {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    if (props.color && color.length === 0) {
      setColor(props.color);
    } else if (props.color && color.length !== 0 && props.color === "green" && color !== "green") {
      setColor(props.color);
    }
  }, [props.color, color]);

  return (
    <button
      onClick={() => props.handleClick(props.value)}
      className={`min-w-14 min-h-14 p-2 max-sm:min-w-7 max-sm:min-h-7 rounded-lg bg-[#818384] font-bold sm:text-2xl ${styles[color]}`}>
      {props.value}
    </button>
  );
}
