import { GetterTree, ActionTree, MutationTree } from 'vuex';
/** States */
import { RootState } from '@store/index';
/** Constants */
import { INITIAL_DATA, DEFAULT_EMPTY_EVALUATION } from '@constants/game';
/** Types */
import { EvaluationsState } from '@customTypes/evaluations';
/** Utils */
import { evaluateWordStatus } from '@utils/game';

export const state = (): EvaluationsState => ({
  words: INITIAL_DATA.EVALUATION_ROWS,
  letters: {},
});

export const getters: GetterTree<EvaluationsState, RootState> = {
  getWordEvaluation: (state) => (index: number) => state.words[index],
};

export const mutations: MutationTree<EvaluationsState> = {
  POPULATE_EVALUATIONS: (state, evaluations) => {
    state.words = evaluations;
  },

  UPDATE_WORD_EVALUATION: (state, { index, evaluation }) => {
    state.words.splice(index, 1, evaluation);
  },

  UPDATE_LETTER_EVALUATION: (state, { letter, status }) => {
    const updatedState = {
      ...state,
      letters: { ...state.letters, [letter]: status },
    };
    Object.assign(state, updatedState);
  },
};

export const actions: ActionTree<EvaluationsState, RootState> = {
  populateEvaluations({ commit, rootState }) {
    const evaluations = rootState.board.map((word) =>
      word
        ? evaluateWordStatus(rootState.solution, word, commit)
        : DEFAULT_EMPTY_EVALUATION
    );
    commit('POPULATE_EVALUATIONS', evaluations);
  },

  evaluateWord({ commit, rootState }, word: string) {
    const evaluation = evaluateWordStatus(rootState.solution, word, commit);
    commit('UPDATE_WORD_EVALUATION', { index: rootState.rowIndex, evaluation });
  },
};
