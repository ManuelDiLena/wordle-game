import { WORDS } from './words';

function getWords() {
  return WORDS
}

// Function to get a different word
export function getWordOfTheDay() {
  const words = getWords()
  const wordOfTheDay = words[randomNumber()]
  return wordOfTheDay.toUpperCase()
}

console.log(getWordOfTheDay())

// Function to validate that it is an existing word
export async function isValidWord(word: string) {
  try {
    const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    const response = await fetch(URL)
    if (response.status !== 200) throw new Error('Request failed')
    const json = await response.json()

    return json.length
  } catch (e) {
    console.log(e)
    return false
  }
}

function randomNumber() {
  return Math.floor(Math.random() * 80)
}