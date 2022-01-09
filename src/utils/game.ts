import { LOCALSTORAGE_METADATA_KEY, KEYBOARD_EVENT_KEY } from '@constants/game';

export const getStoredData = () => {
  if (!process.client) return;
  const metadata = localStorage.getItem(LOCALSTORAGE_METADATA_KEY);
  return metadata ? JSON.parse(metadata) : {};
};

export const isKeyboardKeyValid = (key: string): boolean =>
  /^[a-zA-Z]$/.test(key) ||
  [KEYBOARD_EVENT_KEY.ENTER, KEYBOARD_EVENT_KEY.BACKSPACE].includes(key);
