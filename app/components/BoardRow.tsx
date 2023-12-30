import Cell from "./Cell";

function createCells() {
  let cells = [];

  for (let i = 0; i < 5; i++) {
    cells.push(<Cell />);
  }

  return cells;
}

export default function BoardRow() {
  let cells = createCells();

  return <div className="flex">{cells.map((cell) => cell)}</div>;
}
