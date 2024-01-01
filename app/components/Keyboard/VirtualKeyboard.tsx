import Key from "./Key";
import { WordGuessData } from "@/app/api/words/route";

function createRow(
  keys: string[],
  handleClick: (value: string) => void,
  data: WordGuessData | null
) {
  let row = [];
  for (let value of keys) {
    let color = "";
    if (data && data.result.length !== 0) {
      color = data.result.find((result) => result.letter === value.toLowerCase())?.color || "";
    }
    row.push(
      <div key={value}>
        <Key value={value} handleClick={handleClick} color={color} />
      </div>
    );
  }
  return row;
}

export default function VirtualKeyboard(props: {
  handleClick: (value: string) => void;
  data: WordGuessData | null;
}) {
  const topRow = createRow(
    ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
    props.handleClick,
    props.data
  );
  const middleRow = createRow(
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    props.handleClick,
    props.data
  );
  const bottomRow = createRow(["Y", "X", "C", "V", "B", "N", "M"], props.handleClick, props.data);

  return (
    <>
      <div className="flex justify-evenly mt-5">
        <div className="flex gap-2 mx-auto">{topRow.map((button) => button)}</div>
      </div>
      <div className="flex justify-evenly mt-3">
        <div className="flex gap-2 mx-auto">{middleRow.map((button) => button)}</div>
      </div>
      <div className="flex justify-evenly mt-3">
        <div className="flex gap-2 mx-auto">
          {bottomRow.map((button) => button)}
          <Key value="<--" handleClick={props.handleClick} color="" />
        </div>
      </div>
    </>
  );
}
