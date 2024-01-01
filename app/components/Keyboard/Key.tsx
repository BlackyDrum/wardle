export default function Key(props: { value: string; handleClick: (value: string) => void }) {
  return (
    <button
      onClick={() => props.handleClick(props.value)}
      className="w-14 h-14 border rounded-lg bg-app-gray font-bold text-2xl">
      {props.value}
    </button>
  );
}
