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

export const LOCALSTORAGE_STATE_KEY = 'GAME_STATE';
export const KEY_SIZE = {
  REGULAR: 'regular',
  LARGE: 'large',
};
