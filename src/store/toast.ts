import { ActionTree, MutationTree } from 'vuex';
/** Types */
import { ToastState } from '@customTypes/toast';
/** States */
import { RootState } from '@store/index';
/** Utils */
import { TOAST_STATUS } from '@constants/toast';

export const state = (): ToastState => ({
  message: '',
  status: '',
  duration: 3000,
  isStatic: false,
});

export const mutations: MutationTree<ToastState> = {
  SHOW_TOAST: (
    state,
    {
      message = '',
      status = TOAST_STATUS.SUCCESS,
      duration = 3000,
      isStatic = false,
    }
  ) => {
    state.message = message;
    state.status = status;
    state.duration = duration;
    state.isStatic = isStatic;
  },
};

export const actions: ActionTree<ToastState, RootState> = {
  showToast({ commit }, payload) {
    commit('SHOW_TOAST', payload);
  },
};
