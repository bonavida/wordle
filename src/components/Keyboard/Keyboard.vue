<template>
  <div class="keyboard">
    <div class="keyboard__row">
      <Key
        v-for="key in firstRow"
        :key="`key_${key}`"
        :value="key"
        @click="setLetterIntoBoard"
      />
    </div>
    <div class="keyboard__row">
      <Key
        v-for="key in secondRow"
        :key="`key_${key}`"
        :value="key"
        @click="setLetterIntoBoard"
      />
    </div>
    <div class="keyboard__row">
      <Key value="Enter" :size="keyLargeSize" @click="handlePressEnter" />
      <Key
        v-for="key in thirdRow"
        :key="`key_${key}`"
        :value="key"
        @click="setLetterIntoBoard"
      />
      <Key :size="keyLargeSize" @click="handlePressBackspace">
        <Backspace slot="key-content" />
      </Key>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { WORD_LENGTH, KEYBOARD_EVENT_KEY, KEY_SIZE } from '@constants/game';
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
      return [...'qwertyuiop'];
    },

    secondRow(): Array<string> {
      return [...'asdfghjkl'];
    },

    thirdRow(): Array<string> {
      return [...'zxcvbnm'];
    },

    keyLargeSize() {
      return KEY_SIZE.LARGE;
    },

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
      if (!this.isCurrentWordFilled) return;

      this.submitWord();
    },

    handlePressBackspace() {
      if (this.isCurrentWordEmpty) return;

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
