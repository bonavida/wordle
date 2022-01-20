import { GetterTree, ActionTree, MutationTree } from 'vuex';
/** Types */
import { StatisticsState } from '@customTypes/statistics';
/** States */
import { RootState } from '@store/index';
/** Constants */
import { INITIAL_DATA } from '@constants/game';
/** Utils */
import { getStoredStatistics, storeStatistics } from '@utils/localStorage';

export const state = (): StatisticsState => ({
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guesses: INITIAL_DATA.STATISTICS_GUESSES,
});

export const getters: GetterTree<StatisticsState, RootState> = {
  winPercentage: ({ gamesWon, gamesPlayed }): string =>
    `${gamesPlayed ? (gamesWon / gamesPlayed) * 100 : 0}%`,
};

export const mutations: MutationTree<StatisticsState> = {
  POPULATE_STATISTICS: (state) => {
    const populatedStatistics = getStoredStatistics();
    if (!populatedStatistics) return;
    Object.assign(state, populatedStatistics);
  },

  INCREASE_GAMES_PLAYED: (state) => {
    state.gamesPlayed++;
  },

  REGISTER_WIN: (state, rowIndex) => {
    state.gamesWon++;
    state.currentStreak++;
    state.maxStreak++;
    state.guesses[rowIndex]++;
  },
};

export const actions: ActionTree<StatisticsState, RootState> = {
  increaseGamesPlayed({ commit, state }, value: boolean) {
    commit('INCREASE_GAMES_PLAYED', value);
    storeStatistics(state);
  },

  registerWin({ commit, state }, rowIndex: number) {
    commit('REGISTER_WIN', rowIndex);
    storeStatistics(state);
  },

  populateStatistics({ commit }) {
    commit('POPULATE_STATISTICS');
  },
};