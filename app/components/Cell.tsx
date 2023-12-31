import { useEffect, useState } from "react";

export default function Cell(props: { char: string; activeRow: number; cellRow: number }) {
  const [char, setChar] = useState("");

  useEffect(() => {
    if (props.activeRow === props.cellRow) {
      setChar(props.char);
    }
  }, [props.activeRow, props.cellRow, props.char]);

  return (
    <div className="flex m-1 w-16 h-16 text-3xl border-app-gray border-2">
      <div className="m-auto font-bold">{char}</div>
    </div>
  );
}
