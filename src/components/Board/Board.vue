<template>
  <div class="board" @keyup="handleKeyPress">
    <Word
      v-for="row in 6"
      :key="`row_${row - 1}`"
      :index="row - 1"
      :value="board[row - 1]"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';
import { WORD_LENGTH, KEYBOARD_EVENT_KEY } from '@constants/game';
import { isKeyboardKeyValid } from '@utils/game';

export default Vue.extend({
  computed: {
    isCurrentWordFilled(): boolean {
      return this.currentWord.length === WORD_LENGTH;
    },

    isCurrentWordEmpty(): boolean {
      return !this.currentWord.length;
    },

    ...mapState(['board', 'rowIndex', 'status']),
    ...mapGetters(['isGameFinished', 'currentWord']),
  },
  methods: {
    setLetterIntoBoard(letter: string) {
      if (this.isGameFinished || this.isCurrentWordFilled) return;

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

    ...mapActions(['populateGame', 'addLetter', 'removeLetter', 'submitWord']),
  },
  mounted() {
    this.populateGame();

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
.board {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
