import { ToastNotifier } from '@customTypes/toast';
import { ColorMode } from '@customTypes/common';

// Source to type a custom plugin: https://typescript.nuxtjs.org/es/cookbook/plugins/
declare module 'vue/types/vue' {
  interface Vue {
    $colorMode: ColorMode;
    $notifier: ToastNotifier;
  }
}
