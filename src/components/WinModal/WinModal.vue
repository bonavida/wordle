<template>
  <Modal id="win_modal" :show="showModal" is-naked @close="emitToggleModal">
    <template slot="header">
      <h3 class="modal__title">Wordle {{ guessesText }}</h3>
    </template>
    <template slot="body">
      <div class="modal__container">
        <div class="modal__section">
          <h3 class="modal__section-title">Solution</h3>
          <div class="modal__solution">
            <div
              v-for="(wordStatus, wordIndex) in filteredGuesses"
              :key="`guess_row_${wordIndex}`"
              class="modal__solution-row"
            >
              <div
                v-for="(letterStatus, letterIndex) in wordStatus"
                :key="`guess_letter_${letterIndex}`"
                :class="{
                  'modal__solution-letter': true,
                  [`modal__solution-letter--${letterStatus}`]: true,
                  'modal__solution-letter--colorblind': colorBlindMode,
                }"
              ></div>
            </div>
          </div>
        </div>
        <div class="modal__section">
          <h3 class="modal__section-title">Statistics</h3>
          <div class="modal__stats">
            <div class="modal__stat">
              <span class="modal__stat-value">{{ gamesPlayed }}</span>
              <span class="modal__stat-label">Games played</span>
            </div>
            <div class="modal__stat">
              <span class="modal__stat-value">{{ winPercentage }}</span>
              <span class="modal__stat-label">Win rate</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <button
          class="modal__button"
          :class="{ 'modal__button--colorblind': colorBlindMode }"
          @click="handleCopyToClipboard"
        >
          <CopyIcon class="modal__button-icon" />
          Copy solution
        </button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';
import { LetterEvaluation } from '@customTypes/evaluations';
import { copyToClipboard } from '@utils/game';

export default Vue.extend({
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    guessesText(): string {
      return `${this.rowIndex + 1}/6`;
    },

    filteredGuesses(): Array<Array<string>> {
      return this.words.filter((word: Array<LetterEvaluation>) =>
        word.some((letter) => letter)
      );
    },

    ...mapState(['rowIndex']),
    ...mapState('statistics', ['gamesPlayed']),
    ...mapState('evaluations', ['words']),
    ...mapState('preferences', ['colorBlindMode']),
    ...mapGetters({ winPercentage: 'statistics/winPercentage' }),
  },
  methods: {
    handleCopyToClipboard() {
      copyToClipboard(
        this.guessesText,
        this.filteredGuesses,
        this.colorBlindMode,
        this.$notifier
      );
    },

    emitToggleModal() {
      this.$emit('toggle');
    },
  },
});
</script>

<style lang="scss" scoped>
.header__icon {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;

  &--rotate {
    transition: transform 0.2s linear;

    &:hover {
      transform: rotate(30deg);
    }
  }
}

.modal {
  &__title {
    color: #003543;
    font-size: 18px;
    font-weight: bold;
  }

  &__container {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
  }

  &__section-title {
    color: #003543;
    font-size: 16px;
    font-weight: bold;
  }

  &__solution {
    display: flex;
    flex-direction: column;
    row-gap: 3px;
  }

  &__solution-row {
    display: flex;
    column-gap: 3px;
  }

  &__solution-letter {
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    border-radius: 2px;

    &--absent {
      background-color: #35495e;
      border-color: #35495e;
    }

    &--present {
      background-color: #e5c94d;
      border-color: #e5bb04;
    }

    &--correct {
      background-color: #41b883;
      border-color: #23a169;
    }

    &--colorblind {
      &.modal__solution-letter {
        &--present {
          background-color: #85c0f9;
          border-color: #85c0f9;
        }

        &--correct {
          background-color: #f5793a;
          border-color: #f5793a;
        }
      }
    }
  }

  &__stats {
    display: flex;
    align-items: center;
    column-gap: 25px;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5px;
  }

  &__stat-value {
    color: #0a3e4d;
    font-size: 24px;
    font-weight: bold;
  }

  &__stat-label {
    color: #093e4d;
    font-size: 12px;
  }

  &__footer {
    margin: 30px auto 0;
    display: flex;
    justify-content: center;
  }

  &__button {
    appearance: none;
    box-shadow: none;
    display: flex;
    align-items: center;
    column-gap: 10px;
    background-color: #23a169;
    border: 1px solid #0a864e;
    border-radius: 5px;
    color: #ffff;
    font-size: 14px;
    padding: 8px 20px;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.2s linear;

    &:hover {
      background-color: #15945b;
    }

    &:focus {
      outline: 0;
    }

    &-icon {
      fill: #fff;
      width: 1.2rem;
      height: 1.2rem;
    }

    &--colorblind {
      background-color: #f5793a;
      border-color: #f5793a;

      &:hover {
        background-color: #f3631a;
        border-color: #f3631a;
      }
    }
  }
}
</style>
