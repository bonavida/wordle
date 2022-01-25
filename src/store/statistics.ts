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
  lastWon: 0,
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

  REGISTER_GAME_PLAYED: (state) => {
    state.gamesPlayed++;
  },

  REGISTER_WIN: (state, rowIndex) => {
    state.gamesWon++;
    state.currentStreak++;
    state.guesses[rowIndex]++;
    state.lastWon = Date.now();

    if (state.currentStreak > state.maxStreak) {
      state.maxStreak = state.currentStreak;
    }
  },

  REGISTER_DEFEAT: (state) => {
    state.currentStreak = 0;
  },
};

export const actions: ActionTree<StatisticsState, RootState> = {
  populateStatistics({ commit }) {
    commit('POPULATE_STATISTICS');
  },

  registerGamePlayed({ commit, state }) {
    commit('REGISTER_GAME_PLAYED');
    storeStatistics(state);
  },

  registerWin({ commit, state }, rowIndex: number) {
    commit('REGISTER_WIN', rowIndex);
    storeStatistics(state);
  },

  registerDefeat({ commit, state }) {
    commit('REGISTER_DEFEAT');
    storeStatistics(state);
  },
};
