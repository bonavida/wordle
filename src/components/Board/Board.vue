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

<script>
import {
  INITIAL_DATA,
  GAME_STATUS,
  WORD_LENGTH,
  KEYBOARD_EVENT_KEY,
} from '@constants/game';
import { getStoredData, isKeyboardKeyValid } from '@utils/game';

export default {
  data: () => {
    const { BOARD, ROW_INDEX, STATUS } = INITIAL_DATA ?? {};

    return {
      game: {
        board: BOARD,
        rowIndex: ROW_INDEX,
        status: STATUS,
      },
    };
  },
  computed: {
    isGameFinished() {
      const { WIN, DEFEAT } = GAME_STATUS;
      return [WIN, DEFEAT].includes(this.status);
    },

    isCurrentWordFilled() {
      return this.currentWord.length === WORD_LENGTH;
    },

    isCurrentWordEmpty() {
      return !this.currentWord.length;
    },

    board() {
      return this.game?.board ?? INITIAL_DATA.BOARD;
    },

    status() {
      return this.game?.status ?? INITIAL_DATA.STATUS;
    },

    rowIndex() {
      return this.game?.rowIndex ?? INITIAL_DATA.ROW_INDEX;
    },

    currentWord() {
      return this.board[this.rowIndex] ?? '';
    },
  },
  methods: {
    updateBoard(board) {
      this.game = {
        ...this.game,
        board,
      };
    },

    setLetterIntoBoard(letter) {
      if (this.isGameFinished || this.isCurrentWordFilled) return;

      const updatedWord = `${this.currentWord}${letter}`;
      const updatedBoard = [...this.board];
      updatedBoard[this.rowIndex] = updatedWord;

      this.updateBoard(updatedBoard);
    },

    setInitialDataFromLocalStorage() {
      const data = getStoredData();
      const { BOARD, ROW_INDEX, STATUS } = INITIAL_DATA ?? {};
      const { board = BOARD, rowIndex = ROW_INDEX, status = STATUS } = data;
      this.game = { ...this.game, board, rowIndex, status };
    },

    handleKeyPress({ key }) {
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

      // TODO: Check if it's a valid word

      this.game = { ...this.game, rowIndex: this.rowIndex + 1 };

      // TODO: Check if the game is over
    },

    handlePressBackspace() {
      if (this.isCurrentWordEmpty) return;

      const updatedWord = this.currentWord.slice(0, -1);
      const updatedBoard = [...this.board];
      updatedBoard[this.rowIndex] = updatedWord;

      this.updateBoard(updatedBoard);
    },
  },
  mounted() {
    this.setInitialDataFromLocalStorage();

    // Add event listeners
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeDestroy() {
    // Remove event listeners
    window.removeEventListener('keydown', this.handleKeyPress);
  },
};
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
