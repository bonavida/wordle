/** Constants */
import {
  LOCALSTORAGE_GAME_STATE_KEY,
  LOCALSTORAGE_PREFERENCES_KEY,
  LOCALSTORAGE_STATISTICS_KEY,
} from '@constants/game';
/** Types */
import { GameState } from '@customTypes/game';
import { PreferencesState } from '@customTypes/preferences';
import { StatisticsState } from '@customTypes/statistics';
/** Utils */
import { needsToResetCurrentStreak } from '@utils/game';

export const getStoredGameState = (initialState: GameState): GameState => {
  if (!process.client) return initialState;

  const state = localStorage.getItem(LOCALSTORAGE_GAME_STATE_KEY);

  if (!state) return initialState;

  const storedState = { ...JSON.parse(state) };
  const normalizedBoard =
    storedState?.board?.map((word: string | null) =>
      word === null ? undefined : word
    ) ?? initialState.board;

  return {
    ...storedState,
    board: normalizedBoard,
  };
};

export const storeGameState = ({
  board,
  rowIndex,
  status,
  solution,
  lastPlayed,
}: GameState) => {
  if (!process.client) return;
  // Only store what we want
  localStorage.setItem(
    LOCALSTORAGE_GAME_STATE_KEY,
    JSON.stringify({ board, rowIndex, status, solution, lastPlayed })
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
  localStorage.setItem(
    LOCALSTORAGE_PREFERENCES_KEY,
    JSON.stringify(preferences)
  );
};

export const getStoredStatistics = (): StatisticsState | undefined => {
  if (!process.client) return;
  const statistics = localStorage.getItem(LOCALSTORAGE_STATISTICS_KEY);
  if (!statistics) return;
  const parsedStatistics = JSON.parse(statistics);
  const updatedCurrentStreak = needsToResetCurrentStreak(
    parsedStatistics.lastWon
  )
    ? 0
    : parsedStatistics.currentStreak;
  return {
    ...parsedStatistics,
    currentStreak: updatedCurrentStreak,
  };
};

export const storeStatistics = (statistics: StatisticsState) => {
  if (!process.client) return;
  localStorage.setItem(LOCALSTORAGE_STATISTICS_KEY, JSON.stringify(statistics));
};
