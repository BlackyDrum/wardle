import Key from "./Key";

function createRow(keys: string[], handleClick: (value: string) => void) {
  let row = [];
  for (let value of keys) {
    row.push(
      <div key={value}>
        <Key value={value} handleClick={handleClick} />
      </div>
    );
  }
  return row;
}

export default function VirtualKeyboard(props: { handleClick: (value: string) => void }) {
  const topRow = createRow(["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"], props.handleClick);
  const middleRow = createRow(["A", "S", "D", "F", "G", "H", "J", "K", "L"], props.handleClick);
  const bottomRow = createRow(["Y", "X", "C", "V", "B", "N", "M"], props.handleClick);

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
          <Key value="<--" handleClick={props.handleClick} />
        </div>
      </div>
    </>
  );
}
