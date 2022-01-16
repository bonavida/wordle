/** Utils */
import { getDailyWord } from './words';
/** Constants */
import {
  LOCALSTORAGE_GAME_STATE_KEY,
  LOCALSTORAGE_PREFERENCES_KEY,
} from '@constants/game';
/** Types */
import { GameState } from '@customTypes/game';
import { PreferencesState } from '@customTypes/preferences';

export const getStoredGameState = (initialState: GameState): GameState => {
  const solution = getDailyWord();
  const defaultState = { ...initialState, solution };

  if (!process.client) return defaultState;

  const state = localStorage.getItem(LOCALSTORAGE_GAME_STATE_KEY);

  if (!state) return defaultState;

  const storedState = { ...JSON.parse(state) };

  if (storedState.solution !== solution) return defaultState;

  const normalizedBoard =
    storedState?.board?.map((word: string | null) =>
      word === null ? undefined : word
    ) ?? initialState.board;

  return {
    ...storedState,
    board: normalizedBoard,
    solution,
  };
};

export const storeGameState = ({
  board,
  rowIndex,
  status,
  solution,
}: GameState) => {
  if (!process.client) return;
  // Only store what we want
  localStorage.setItem(
    LOCALSTORAGE_GAME_STATE_KEY,
    JSON.stringify({ board, rowIndex, status, solution })
  );
};

export const getStoredPreferences = (): PreferencesState | undefined => {
  if (!process.client) return;
  const preferences = localStorage.getItem(LOCALSTORAGE_PREFERENCES_KEY);
  if (!preferences) return;
  return JSON.parse(preferences);
};

export const storePreferences = (preferences: PreferencesState) => {
  if (!process.client) return;
  // Only store what we want
  localStorage.setItem(
    LOCALSTORAGE_PREFERENCES_KEY,
    JSON.stringify(preferences)
  );
};
