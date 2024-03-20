import { useEffect, useState } from "react";
import RowCompleted from "./RowCompleted";
import RowCurrent from "./RowCurrent";
import RowEmpty from "./RowEmpty";
import { GameStatus } from './types';
import { useWindow } from "../hooks/useWindow";
import { getWordOfTheDay, isValidWord } from "../service/request";
import styles from './wordle.module.scss';
import Keyboard from "./Keyboard";

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
    setWordOfTheDay(getWordOfTheDay())
  }, [])

  // Function to validate keyboard events
  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toUpperCase();

    onKeyPressed(key)
  }

  function onKeyPressed(key: string) {
    if (gameStatus !== GameStatus.Playing) {
      return;
    }

    if (key === 'BACKSPACE' && currentWord.length > 0) {
      onDelete()
      return;
    }

    if (key === 'ENTER' && currentWord.length === 6 && turn <= 6) {
      onEnter()
      return;
    }

    if (currentWord.length >= 6) {
      return;
    }

    // Enter the letter of the state
    if (keys.includes(key)) {
      onInput(key)
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

  // Function when entering in the game
  function onEnter() {
    if (currentWord === wordOfTheDay) {
      // user won
      setCompletedWords([...completedWords, currentWord])
      setGameStatus(GameStatus.Won)
      return;
    }
    if (turn === 6) {
      // lost user
      setCompletedWords([...completedWords, currentWord])
      setGameStatus(GameStatus.Lost)
      return;
    }

    // Validate if the word exists
    if (currentWord.length === 6 && !isValidWord(currentWord)) {
      alert('Not a valid word')
      return;
    }

    setCompletedWords([...completedWords, currentWord])
    setTurn(turn + 1)
    setCurrentWord('')
  }

  return (
    <>
    <div className={styles.mainContainer}>
      {
        completedWords.map((word, i) => (
          <RowCompleted word={word} solution={wordOfTheDay} key={i} />
        ))
      }

      {
        gameStatus === GameStatus.Playing ? (
          <RowCurrent word={currentWord} />
        ) : null
      }

      {
        Array.from(Array(6 - turn)).map((_, i) => (
          <RowEmpty key={i} />
        ))
      }

    </div>

    <Keyboard keys={keys} onKeyPressed={onKeyPressed} />
    </>
  );
}