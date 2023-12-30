import BoardRow from "./BoardRow";

function createBoard() {
  let rows = [];
  for (let i = 0; i < 6; i++) {
    rows.push(
      <div>
        <BoardRow />
      </div>
    );
  }

  return rows;
}

export default function Gameboard() {
  let rows = createBoard();
  return (
    <div className="flex">
      <div className="mx-auto mt-6">
        {rows.map((row, index) => (
          <div key={index}>{row}</div>
        ))}
      </div>
    </div>
  );
}
