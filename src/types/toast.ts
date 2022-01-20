import { TOAST_STATUS } from '@constants/toast';

export type ToastStatus =
  | typeof TOAST_STATUS.SUCCESS
  | typeof TOAST_STATUS.ERROR
  | typeof TOAST_STATUS.DEFAULT;

export interface ToastState {
  message: string;
  status?: ToastStatus;
  duration?: Number;
  isStatic?: Boolean;
}

export interface ToastNotifier {
  showToast: (payload: ToastState) => void;
}
