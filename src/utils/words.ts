import { WORDS } from '@constants/words';

const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
const epochMs = 1641013200000; // January 1, 2022 Game Epoch

export const isWordValid = (word: string) => WORDS.includes(word);

export const getDailyWord = () => {
  const now = Date.now();
  const index = Math.floor((now - epochMs) / MS_IN_A_DAY);
  return WORDS[index];
};
