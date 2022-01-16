import { GetterTree, ActionTree, MutationTree } from 'vuex';
/** Types */
import { PreferencesState } from '@customTypes/preferences';
/** States */
import { RootState } from '@store/index';
/** Utils */
import { getStoredPreferences, storePreferences } from '@utils/localStorage';

export const state = (): PreferencesState => ({
  colorBlindMode: false,
});

export const getters: GetterTree<PreferencesState, RootState> = {};

export const mutations: MutationTree<PreferencesState> = {
  POPULATE_PREFERENCES: (state) => {
    const populatedPreferences = getStoredPreferences();
    if (!populatedPreferences) return;
    Object.assign(state, populatedPreferences);
  },

  UPDATE_COLOR_BLIND_MODE: (state, value) => {
    state.colorBlindMode = value;
  },
};

export const actions: ActionTree<PreferencesState, RootState> = {
  changeColorBlindMode({ commit, state }, value: boolean) {
    commit('UPDATE_COLOR_BLIND_MODE', value);
    storePreferences(state);
  },

  populatePreferences({ commit }) {
    commit('POPULATE_PREFERENCES');
  },
};
