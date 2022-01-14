import { GetterTree, ActionTree, MutationTree } from 'vuex';
/** Constants */
import { INITIAL_DATA, GAME_STATUS } from '@constants/game';
/** Types */
import { GameState } from '@customTypes/game';
/** Utils */
import { getStoredData, storeData } from '@utils/game';
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
    const data = getStoredData();
    Object.assign(state, data);
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
  populateGame({ commit }) {
    commit('POPULATE_GAME');
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

  submitWord({ commit, state, getters }) {
    // Check if the word is gramatically valid
    if (!isWordValid(getters.currentWord)) {
      return;
    }

    // Check if the current word is the winning word
    if (getters.currentWord === state.solution) {
      commit('UPDATE_GAME_STATUS', GAME_STATUS.WIN);
      storeData(state);
    }

    // Check if the game is over
    if (state.rowIndex === state.board.length - 1) {
      commit('UPDATE_GAME_STATUS', GAME_STATUS.DEFEAT);
      storeData(state);
      return;
    }

    // Next guess
    commit('INCREASE_ROW_INDEX');
    storeData(state);
  },
};
