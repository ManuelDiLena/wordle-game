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

  const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M'
  ]

  useWindow('keydown', handleKeyDown);

  useEffect(() => {
    setWordOfTheDay('airport')
  })

  // Function to validate keyboard events
  function handleKeyDown(event: KeyboardEvent) {
    const letter = event.key.toUpperCase();

    if (event.key === 'Backspace' && currentWord.length > 0) {
      onDelete()
      return;
    }

    if (event.key === 'Enter') {
      return;
    }

    if (currentWord.length >= 7) {
      return;
    }

    // Enter the letter of the state
    if (keys.includes(letter)) {
      onInput(letter)
      return;
    }
  }

  // Function to add the letter to the box
  function onInput(letter: string) {
    const newWord = currentWord + letter
    setCurrentWord(newWord)
  }

  // Function to delete the letter from the box
  function onDelete() {
    const newWord = currentWord.slice(0, -1)
    setCurrentWord(newWord)
  }

  return (
    <div>
      <RowCompleted word='abolish' solution={wordOfTheDay} />
      <RowCurrent word={currentWord} />
      <RowEmpty />
      <RowEmpty />
      <RowEmpty />
      <RowEmpty />
    </div>
  );
}