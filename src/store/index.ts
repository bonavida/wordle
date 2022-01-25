import { GetterTree, ActionTree, MutationTree } from 'vuex';
/** Services */
import { getDailyWord, checkWordIsValid } from '@services/api';
/** Constants */
import { INITIAL_DATA, GAME_STATUS } from '@constants/game';
import { RESPONSE_API } from '@constants/common';
import { TOAST_MESSAGES, TOAST_STATUS } from '@constants/toast';
/** Types */
import { GameState } from '@customTypes/game';
/** Utils */
import { getStoredGameState, storeGameState } from '@utils/localStorage';
import { isToday } from '@utils/common';

const { BOARD, ROW_INDEX, STATUS } = INITIAL_DATA ?? {};

export const state = (): GameState => ({
  board: BOARD,
  rowIndex: ROW_INDEX,
  status: STATUS,
  solution: '',
  lastPlayed: 0,
  hasUserInteracted: false,
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  isGameOver: (state): boolean => {
    const { WIN, DEFEAT } = GAME_STATUS;
    return [WIN, DEFEAT].includes(state.status);
  },
  currentWord: (state): string => state.board[state.rowIndex] ?? '',
};

export const mutations: MutationTree<RootState> = {
  POPULATE_GAME: (state, populatedState) => {
    Object.assign(state, populatedState);
  },

  UPDATE_BOARD: (state, board) => {
    state.board = board;
  },

  INCREASE_ROW_INDEX: (state) => {
    state.rowIndex += 1;
  },

  UPDATE_GAME_STATUS: (state, status) => {
    state.status = status;
  },

  UPDATE_GAME_PLAYED: (state) => {
    state.lastPlayed = Date.now();
  },

  SET_USER_INTERACTION: (state) => {
    state.hasUserInteracted = true;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async populateGame({ commit, state, dispatch }, $notifier) {
    let populatedState = getStoredGameState(state);

    try {
      if (!isToday(populatedState.lastPlayed)) {
        const solution: string = await getDailyWord(this.$axios);
        populatedState = {
          ...state,
          solution,
        };
      }
    } catch (e) {
      $notifier.showToast({
        message: TOAST_MESSAGES.FETCH_ERROR,
        status: TOAST_STATUS.ERROR,
        duration: 7500,
      });
      populatedState = state;
      console.error(e);
    } finally {
      dispatch('preferences/populatePreferences');
      commit('POPULATE_GAME', populatedState);
      dispatch('evaluations/populateEvaluations');
      dispatch('statistics/populateStatistics');
    }
  },

  addLetter(
    {
      commit,
      state: { board, rowIndex, hasUserInteracted },
      getters: { currentWord },
    },
    letter
  ) {
    const updatedWord = `${currentWord}${letter}`;
    const updatedBoard = [...board];
    updatedBoard[rowIndex] = updatedWord;

    if (!hasUserInteracted) {
      commit('SET_USER_INTERACTION');
    }

    commit('UPDATE_BOARD', updatedBoard);
  },

  removeLetter({
    commit,
    state: { board, rowIndex },
    getters: { currentWord },
  }) {
    const updatedWord = currentWord.slice(0, -1);
    const updatedBoard = [...board];
    updatedBoard[rowIndex] = updatedWord;

    commit('UPDATE_BOARD', updatedBoard);
  },

  async submitWord({ commit, state, getters, dispatch }, $notifier) {
    // Check if the word is gramatically valid
    try {
      const response = await checkWordIsValid(this.$axios, getters.currentWord);
      const isWordValid = response === RESPONSE_API.OK;

      if (!isWordValid) {
        $notifier.showToast({
          message: TOAST_MESSAGES.INVALID_WORD,
          status: TOAST_STATUS.ERROR,
        });
        return;
      }
    } catch (error) {
      console.error(error);
      $notifier.showToast({
        message: TOAST_MESSAGES.CHECK_WORD_IS_VALID_ERROR,
        status: TOAST_STATUS.ERROR,
        duration: 7500,
      });
      return;
    }

    // If it's the first guess, register that the game has been played in the stats
    if (!state.rowIndex) {
      commit('UPDATE_GAME_PLAYED');
      dispatch('statistics/registerGamePlayed');
    }

    // Evaluate the current word
    dispatch('evaluations/evaluateWord', getters.currentWord, { root: true });

    // Check if the current word is the winning word
    if (getters.currentWord === state.solution) {
      $notifier.showToast({
        message: TOAST_MESSAGES.WIN[state.rowIndex],
        status: TOAST_STATUS.SUCCESS,
        duration: 5000,
      });
      commit('UPDATE_GAME_STATUS', GAME_STATUS.WIN);
      dispatch('statistics/registerWin', state.rowIndex);
      storeGameState(state);
      return;
    }

    // Check if the game is over
    if (state.rowIndex === state.board.length - 1) {
      $notifier.showToast({
        message: TOAST_MESSAGES.DEFEAT(state.solution),
        status: TOAST_STATUS.ERROR,
        isStatic: true,
      });
      commit('UPDATE_GAME_STATUS', GAME_STATUS.DEFEAT);
      dispatch('statistics/registerDefeat');
      storeGameState(state);
      return;
    }

    // Next guess
    commit('INCREASE_ROW_INDEX');
    storeGameState(state);
  },
};
