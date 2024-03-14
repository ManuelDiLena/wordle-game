import { useEffect, useState } from "react";
import RowCompleted from "./RowCompleted";
import RowCurrent from "./RowCurrent";
import RowEmpty from "./RowEmpty";
import { GameStatus } from './types';
import { useWindow } from "../hooks/useWindow";

export default function Wordle() {

  const [wordOfTheDay, setWordOfTheDay] = useState<string>('');
  const [turn, setTurn] = useState<number>(1);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);

  useWindow('keydown', handleKeyDown);

  useEffect(() => {
    setWordOfTheDay('airport')
  })

  function handleKeyDown(event: KeyboardEvent) {}

  return (
    <div>
      <RowCompleted word='abolish' solution={wordOfTheDay} />
      <RowCurrent word='abo' />
      <RowEmpty />
      <RowEmpty />
      <RowEmpty />
      <RowEmpty />
    </div>
  );
}