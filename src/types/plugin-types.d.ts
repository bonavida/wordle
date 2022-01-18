import { ToastState } from './toast';

// Source to type a custom plugin: https://typescript.nuxtjs.org/es/cookbook/plugins/
declare module 'vue/types/vue' {
  interface Vue {
    $notifier: {
      showToast: (payload: ToastState) => void;
    };
  }
}
