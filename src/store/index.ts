import { GetterTree, ActionTree, MutationTree } from 'vuex';
/** Constants */
import { INITIAL_DATA, GAME_STATUS } from '@constants/game';
/** Types */
import { GameState } from '@customTypes/game';
/** Utils */
import { getStoredGameState, storeGameState } from '@utils/localStorage';
import { isWordValid } from '@utils/words';

const { BOARD, ROW_INDEX, STATUS } = INITIAL_DATA ?? {};

export const state = (): GameState => ({
  board: BOARD,
  rowIndex: ROW_INDEX,
  status: STATUS,
  solution: '',
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
  POPULATE_GAME: (state) => {
    const populatedState = getStoredGameState(state);
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
};

export const actions: ActionTree<RootState, RootState> = {
  populateGame({ commit, dispatch }) {
    dispatch('preferences/populatePreferences');
    commit('POPULATE_GAME');
    dispatch('evaluations/populateEvaluations', null, { root: true });
  },

  addLetter(
    { commit, state: { board, rowIndex }, getters: { currentWord } },
    letter
  ) {
    const updatedWord = `${currentWord}${letter}`;
    const updatedBoard = [...board];
    updatedBoard[rowIndex] = updatedWord;

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

  submitWord({ commit, state, getters, dispatch }) {
    // Check if the word is gramatically valid
    if (!isWordValid(getters.currentWord)) {
      return;
    }

    dispatch('evaluations/evaluateWord', getters.currentWord, { root: true });

    // Check if the current word is the winning word
    if (getters.currentWord === state.solution) {
      commit('UPDATE_GAME_STATUS', GAME_STATUS.WIN);
      storeGameState(state);
      return;
    }

    // Check if the game is over
    if (state.rowIndex === state.board.length - 1) {
      commit('UPDATE_GAME_STATUS', GAME_STATUS.DEFEAT);
      storeGameState(state);
      return;
    }

    // Next guess
    commit('INCREASE_ROW_INDEX');
    storeGameState(state);
  },
};
