import { WORDS } from './words';

function getWords() {
  return WORDS
}

export function getWordOfTheDay() {
  const words = getWords()
  const wordOfTheDay = words[randomNumber()]
  return wordOfTheDay.toUpperCase()
}

export function isValidWord(word: string) {
  const words = getWords()
  return words.includes(word.toLowerCase())
}

function randomNumber() {
  return Math.floor(Math.random() * 69)
}