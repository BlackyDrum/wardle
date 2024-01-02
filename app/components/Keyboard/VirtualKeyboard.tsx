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
      for (let i = 0; i < data.result.length; i++) {
        if (data.result[i].letter === value.toLowerCase()) {
          if (data.result[i].color === "green") {
            color = "green";
            break;
          }
          color = data.result[i].color;
        }
      }
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
        <div className="flex gap-2 max-sm:gap-1.5 mx-auto">{topRow.map((button) => button)}</div>
      </div>
      <div className="flex justify-evenly mt-3 max-sm:mt-2">
        <div className="flex gap-2 max-sm:gap-1.5 mx-auto">{middleRow.map((button) => button)}</div>
      </div>
      <div className="flex justify-evenly mt-3 max-sm:mt-2">
        <div className="flex gap-2 max-sm:gap-1.5 mx-auto">
          {bottomRow.map((button) => button)}
          <Key value="<--" handleClick={props.handleClick} color="" />
        </div>
      </div>
    </>
  );
}
