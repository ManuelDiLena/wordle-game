import RowCompleted from "./RowCompleted";
import RowEmpty from "./RowEmpty";

export default function Wordle() {
  return (
    <div>
      <RowCompleted word='abolish' solution='billion' />
      <RowEmpty />
    </div>
  );
}