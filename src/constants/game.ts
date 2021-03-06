export const WORD_LENGTH = 5;
export const DEFAULT_EMPTY_EVALUATION = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

export const GAME_STATUS = {
  WIN: 'win',
  IN_PROGRESS: 'in_progress',
  DEFEAT: 'defeat',
};

export const INITIAL_DATA = {
  BOARD: [undefined, undefined, undefined, undefined, undefined, undefined],
  STATUS: GAME_STATUS.IN_PROGRESS,
  ROW_INDEX: 0,
  EVALUATION_ROWS: [
    DEFAULT_EMPTY_EVALUATION,
    DEFAULT_EMPTY_EVALUATION,
    DEFAULT_EMPTY_EVALUATION,
    DEFAULT_EMPTY_EVALUATION,
    DEFAULT_EMPTY_EVALUATION,
    DEFAULT_EMPTY_EVALUATION,
  ],
  STATISTICS_GUESSES: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
};

export const KEYBOARD_EVENT_KEY = {
  ENTER: 'Enter',
  BACKSPACE: 'Backspace',
};

export const LETTER_STATUS = {
  ABSENT: 'absent',
  PRESENT: 'present',
  CORRECT: 'correct',
};

export const LOCALSTORAGE_GAME_STATE_KEY = 'GAME_STATE';
export const LOCALSTORAGE_PREFERENCES_KEY = 'PREFERENCES';
export const LOCALSTORAGE_STATISTICS_KEY = 'STATISTICS';

export const KEY_SIZE = {
  REGULAR: 'regular',
  LARGE: 'large',
};

export const KEYBOARD_KEYS = {
  FIRST_ROW: [...'qwertyuiop'],
  SECOND_ROW: [...'asdfghjkl'],
  THIRD_ROW: [...'zxcvbnm'],
};

export const SQUARE_EMOJIS = {
  [LETTER_STATUS.ABSENT]: '⬜',
  [LETTER_STATUS.PRESENT]: '🟨',
  [LETTER_STATUS.CORRECT]: '🟩',
};

export const COLORBLIND_SQUARE_EMOJIS = {
  [LETTER_STATUS.ABSENT]: '⬜',
  [LETTER_STATUS.PRESENT]: '🟦',
  [LETTER_STATUS.CORRECT]: '🟧',
};
