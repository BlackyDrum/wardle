import { useEffect, useState } from "react";

export default function Cell(props: { char: string; activeRow: number; cellRow: number }) {
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    if (props.activeRow === props.cellRow) {
      setChars((prevChars) => [...prevChars, props.char]);
    }
  }, [props.activeRow, props.cellRow, props.char]);

  return (
    <div className="flex m-1 w-16 h-16 text-3xl border-app-gray border-2">
      <div className="m-auto font-bold">{chars.map((char) => char)}</div>
    </div>
  );
}
