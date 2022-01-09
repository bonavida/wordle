import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { INITIAL_DATA, GAME_STATUS } from '@constants/game';
import { GameState } from '@customTypes/game';
import { getStoredData } from '@utils/game';

const { BOARD, ROW_INDEX, STATUS } = INITIAL_DATA ?? {};

export const state = (): GameState => ({
  board: BOARD,
  rowIndex: ROW_INDEX,
  status: STATUS,
  solution: 'crank',
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  isGameFinished: (state) => {
    const { WIN, DEFEAT } = GAME_STATUS;
    return [WIN, DEFEAT].includes(state.status);
  },
  currentWord: (state) => state.board[state.rowIndex] ?? '',
};

export const mutations: MutationTree<RootState> = {
  POPULATE_GAME: (state) => {
    const data = getStoredData();
    const {
      board = BOARD,
      rowIndex = ROW_INDEX,
      status = STATUS,
      solution = '',
    } = data;
    state = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ...state,
      board,
      rowIndex,
      status,
      solution,
    };
  },

  UPDATE_BOARD: (state, board) => {
    state.board = board;
  },

  INCREASE_ROW_INDEX: (state) => {
    state.rowIndex += 1;
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

  submitWord({ commit }) {
    // TODO: Check if current word is a valid word
    // TODO: Check if the game is over
    commit('INCREASE_ROW_INDEX');
  },
};
