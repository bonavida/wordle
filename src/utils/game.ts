/** Utils */
import { getDailyWord } from './words';
/** Constants */
import {
  LOCALSTORAGE_STATE_KEY,
  KEYBOARD_EVENT_KEY,
  LETTER_STATUS,
  DEFAULT_EMPTY_EVALUATION,
} from '@constants/game';
/** Types */
import { GameState, LetterEvaluation } from '@customTypes/game';

export const getStoredData = () => {
  const partialState = { solution: getDailyWord() };
  if (!process.client) return partialState;
  const state = localStorage.getItem(LOCALSTORAGE_STATE_KEY);
  if (!state) return partialState;
  const normalizedState = { ...JSON.parse(state), ...partialState };
  return {
    ...normalizedState,

    board: normalizedState.board.map((word: string | null) =>
      word === null ? undefined : word
    ),
  };
};

export const storeData = (state: GameState) => {
  if (!process.client) return;
  localStorage.setItem(LOCALSTORAGE_STATE_KEY, JSON.stringify(state));
};

export const isKeyboardKeyValid = (key: string): boolean =>
  /^[a-zA-Z]$/.test(key) ||
  [KEYBOARD_EVENT_KEY.ENTER, KEYBOARD_EVENT_KEY.BACKSPACE].includes(key);

export const evaluateWord = (
  solution: string,
  word: string
): LetterEvaluation => {
  if (!word) return DEFAULT_EMPTY_EVALUATION;

  // First, we count all the occurrences for each letter in the solution
  const solutionOcurrences = [...solution].reduce((acc, letter) => {
    if (!acc[letter]) {
      acc[letter] = { total: 0, remaining: 0 };
    }
    acc[letter].total++;
    acc[letter].remaining++;
    return acc;
  }, {} as { [key: string]: { total: number; remaining: number } });

  // Then, we iterate over the letters in the proposed word and start evaluating each one of them.
  // For example, for the solution "adapt" and the word "drama", we expect to fill an object like this:
  // {
  //   a: [{ index: 2, status: 'correct' }, { index: 4: status: 'present' }],
  //   d: [{ index: 0, status: 'present' }],
  //   m: [{ index: 3, status: 'absent' }],
  //   r: [{ index: 1, status: 'absent' }],
  // }
  const evaluations = [...word].reduce((acc, letter, index) => {
    // If an evaluation for the current letter doesn't exist, initialize it
    if (!acc[letter]) {
      acc[letter] = [];
    }

    // If the solution doesn't include the letter at all, mark it as ABSENT
    if (!solution.includes(letter)) {
      acc[letter].push({ index, status: LETTER_STATUS.ABSENT });
      return acc;
    }

    // If the current letter is correct
    if (solution[index] === letter) {
      // We keep track of all the total occurrences of the letter
      let { total } = solutionOcurrences[letter];
      total--;

      // Then, iterate all the existing evaluations of the same letter
      // and check if we need to mark any present letters as ABSENT or not
      acc[letter].forEach((occ) => {
        if (occ.status === LETTER_STATUS.ABSENT) return;
        if (occ.status === LETTER_STATUS.CORRECT || total > 0) {
          total--;
          return;
        }
        occ.status = LETTER_STATUS.ABSENT;
      });

      // And then, mark the letter as CORRECT
      acc[letter].push({ index, status: LETTER_STATUS.CORRECT });
      solutionOcurrences[letter].remaining--;
      return acc;
    }

    // If the current letter is present in the solution,
    // we check first if we have some remaining occurrences in the solution.
    // If we do, we mark it as PRESENT.
    // If we don't, then we mark it as ABSENT.
    if (solutionOcurrences[letter].remaining > 0) {
      acc[letter].push({ index, status: LETTER_STATUS.PRESENT });
      solutionOcurrences[letter].remaining--;
      return acc;
    }

    acc[letter].push({ index, status: LETTER_STATUS.ABSENT });
    return acc;
  }, {} as { [key: string]: Array<{ index: number; status: string }> });

  // We iterate over the object, extract the evaluations and return the status array
  return Object.values(evaluations)
    .flat()
    .sort((a, b) => a.index - b.index)
    .map(({ status }) => status);
};
