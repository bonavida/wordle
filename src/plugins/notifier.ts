import { Context, Inject } from '@nuxt/types/app';
import { ToastState } from '@customTypes/toast';

export default ({ store }: Context, inject: Inject) => {
  inject('notifier', {
    showToast(payload: ToastState) {
      store.dispatch('toast/showToast', payload);
    },
  });
};
