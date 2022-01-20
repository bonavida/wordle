import { Commit } from 'vuex';
/** Constants */
import {
  KEYBOARD_EVENT_KEY,
  LETTER_STATUS,
  DEFAULT_EMPTY_EVALUATION,
  SQUARE_EMOJIS,
} from '@constants/game';
/** Types */
import { LetterEvaluation } from '@customTypes/evaluations';
import { GameStatus } from '@customTypes/game';
import { ToastNotifier } from '@customTypes/toast';
import { TOAST_STATUS } from '@constants/toast';

export const isKeyboardKeyValid = (key: string): boolean =>
  /^[a-zA-Z]$/.test(key) ||
  [KEYBOARD_EVENT_KEY.ENTER, KEYBOARD_EVENT_KEY.BACKSPACE].includes(key);

export const evaluateWordStatus = (
  solution: string,
  word: string,
  commit: Commit
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
      commit('UPDATE_LETTER_EVALUATION', {
        letter,
        status: LETTER_STATUS.ABSENT,
      });
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
      commit('UPDATE_LETTER_EVALUATION', {
        letter,
        status: LETTER_STATUS.CORRECT,
      });
      return acc;
    }

    // If the current letter is present in the solution,
    // we check first if we have some remaining occurrences in the solution.
    // If we do, we mark it as PRESENT.
    // If we don't, then we mark it as ABSENT.
    if (solutionOcurrences[letter].remaining > 0) {
      acc[letter].push({ index, status: LETTER_STATUS.PRESENT });
      solutionOcurrences[letter].remaining--;
      commit('UPDATE_LETTER_EVALUATION', {
        letter,
        status: LETTER_STATUS.PRESENT,
      });
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

export const copyToClipboard = (
  guessesText: string,
  guesses: Array<Array<string>>,
  $notifier: ToastNotifier
) => {
  const partialText = guesses.reduce((acc: string, row: Array<string>) => {
    const rowText = row
      .map((status: GameStatus) => SQUARE_EMOJIS[status])
      .join('');
    return `${acc}${rowText}\n`;
  }, `Wordle ${guessesText}\n\n` as string);

  const totalText = `${partialText}\nhttps://wordle.bonavida.dev`;

  // Copy text to clipboard
  navigator.clipboard.writeText(totalText);

  $notifier.showToast({
    message: 'Solution copied to the clipboard!',
    status: TOAST_STATUS.SUCCESS,
    duration: 4000,
  });
};
