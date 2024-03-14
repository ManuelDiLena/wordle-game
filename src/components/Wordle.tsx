import RowCompleted from "./RowCompleted";
import RowCurrent from "./RowCurrent";
import RowEmpty from "./RowEmpty";

export default function Wordle() {
  return (
    <div>
      <RowCompleted word='abolish' solution='billion' />
      <RowCurrent word='abo' />
      <RowEmpty />
      <RowEmpty />
      <RowEmpty />
      <RowEmpty />
    </div>
  );
}