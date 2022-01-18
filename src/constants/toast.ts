export const TOAST_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  DEFAULT: 'default',
};

export const TOAST_MESSAGES = {
  WIN: [
    'Genius!',
    'Magnificent!',
    'Impressive!',
    'Splendid!',
    'Great!',
    'Phew!',
  ],
  DEFEAT: (solution: string) =>
    `You lose! The word was ${solution.toUpperCase()}`,
  INVALID_WORD: "Word doesn't exist!",
  INCOMPLETE_WORD: 'Not enough letters!',
};
