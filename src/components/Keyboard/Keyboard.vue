<template>
  <div class="keyboard">
    <div class="keyboard__row">
      <Key
        v-for="key in firstRow"
        :key="`key_${key}`"
        :value="key"
        :status="letters[key]"
        :is-color-blind-enabled="colorBlindMode"
        @clicked="setLetterIntoBoard"
      />
    </div>
    <div class="keyboard__row">
      <Key
        v-for="key in secondRow"
        :key="`key_${key}`"
        :value="key"
        :status="letters[key]"
        :is-color-blind-enabled="colorBlindMode"
        @clicked="setLetterIntoBoard"
      />
    </div>
    <div class="keyboard__row">
      <Key value="Enter" :size="keyLargeSize" @clicked="handlePressEnter" />
      <Key
        v-for="key in thirdRow"
        :key="`key_${key}`"
        :value="key"
        :status="letters[key]"
        :is-color-blind-enabled="colorBlindMode"
        @clicked="setLetterIntoBoard"
      />
      <Key :size="keyLargeSize" @clicked="handlePressBackspace">
        <svg
          slot="key-content"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#000000"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
          />
        </svg>
      </Key>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';
import {
  WORD_LENGTH,
  KEYBOARD_EVENT_KEY,
  KEY_SIZE,
  KEYBOARD_KEYS,
} from '@constants/game';
import { TOAST_MESSAGES, TOAST_STATUS } from '@constants/toast';
import { isKeyboardKeyValid } from '@utils/game';

export default Vue.extend({
  computed: {
    isCurrentWordFilled(): boolean {
      return this.currentWord.length === WORD_LENGTH;
    },

    isCurrentWordEmpty(): boolean {
      return !this.currentWord.length;
    },

    firstRow(): Array<string> {
      return KEYBOARD_KEYS.FIRST_ROW;
    },

    secondRow(): Array<string> {
      return KEYBOARD_KEYS.SECOND_ROW;
    },

    thirdRow(): Array<string> {
      return KEYBOARD_KEYS.THIRD_ROW;
    },

    keyLargeSize() {
      return KEY_SIZE.LARGE;
    },

    ...mapState('evaluations', ['letters']),
    ...mapState('preferences', ['colorBlindMode']),
    ...mapGetters(['isGameOver', 'currentWord']),
  },
  methods: {
    setLetterIntoBoard(letter: string) {
      if (this.isGameOver || this.isCurrentWordFilled) return;

      this.addLetter(letter.toLowerCase());
    },

    handleKeyPress({ key }: KeyboardEvent) {
      if (!isKeyboardKeyValid(key)) return;

      switch (key) {
        case KEYBOARD_EVENT_KEY.ENTER:
          this.handlePressEnter();
          break;
        case KEYBOARD_EVENT_KEY.BACKSPACE:
          this.handlePressBackspace();
          break;
        default:
          this.setLetterIntoBoard(key);
      }
    },

    handlePressEnter() {
      if (!this.isCurrentWordFilled) {
        this.$notifier.showToast({
          message: TOAST_MESSAGES.INCOMPLETE_WORD,
          status: TOAST_STATUS.ERROR,
        });
      }
      if (this.isGameOver || !this.isCurrentWordFilled) return;

      this.submitWord(this.$notifier);
    },

    handlePressBackspace() {
      if (this.isGameOver || this.isCurrentWordEmpty) return;

      this.removeLetter();
    },

    ...mapActions(['addLetter', 'removeLetter', 'submitWord']),
  },
  mounted() {
    // Add event listeners
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeDestroy() {
    // Remove event listeners
    window.removeEventListener('keydown', this.handleKeyPress);
  },
});
</script>

<style lang="scss" scoped>
.keyboard {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 6px;
  margin-top: auto;
}

.keyboard__row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 6px;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
