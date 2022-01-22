<template>
  <div>
    <div @click="toggleModal">
      <InformationIcon class="header__icon" />
    </div>
    <Modal id="how_to_modal" :show="showModal" @close="toggleModal">
      <template slot="header">
        <h3 class="modal__title">How to play</h3>
      </template>
      <template slot="body">
        <p>Guess the WORDLE in 6 tries.</p>
        <p>
          Each guess must be a valid 5 letter word. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
        <h4>Examples</h4>
        <div class="word">
          <Letter
            v-for="col in 5"
            :key="`letter_${col - 1}`"
            :value="words[0][col - 1]"
            :status="evaluations[0][col - 1]"
            :is-color-blind-enabled="colorBlindMode"
          />
        </div>
        <p>The letter <b>W</b> is in the word and in the correct spot.</p>
        <div class="word">
          <Letter
            v-for="col in 5"
            :key="`letter_${col - 1}`"
            :value="words[1][col - 1]"
            :status="evaluations[1][col - 1]"
            :is-color-blind-enabled="colorBlindMode"
          />
        </div>
        <p>The letter <b>U</b> is in the word but in the wrong spot.</p>
        <div class="word">
          <Letter
            v-for="col in 5"
            :key="`letter_${col - 1}`"
            :value="words[2][col - 1]"
            :status="evaluations[2][col - 1]"
            :is-color-blind-enabled="colorBlindMode"
          />
        </div>
        <p>The letter <b>O</b> is not in the word in any spot.</p>
        <!-- <div class="separator" /> -->
      </template>
      <template slot="footer">
        <p class="note note--aligned">
          <span>Developed by <b>Diego Bonavida</b>.</span>
          <a
            href="mailto:dbonavidafrances@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
            ><EmailIcon
              class="icon icon--smaller"
              :class="{ 'icon--colorblind': colorBlindMode }"
          /></a>
          <a
            href="https://github.com/bonavida"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
            ><GitHubIcon
              class="icon"
              :class="{ 'icon--colorblind': colorBlindMode }"
          /></a>
        </p>
        <p class="note">
          This is is my own adaptation of the original word-guessing game
          <a
            href="https://www.powerlanguage.co.uk/wordle/"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
            >Wordle</a
          >
          developed by
          <a
            href="https://www.powerlanguage.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
            >Josh Wardle</a
          >.
        </p>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    words() {
      return ['world', 'music', 'radio'];
    },

    evaluations() {
      return [
        ['correct', 'filled', 'filled', 'filled', 'filled', 'filled'],
        ['filled', 'present', 'filled', 'filled', 'filled', 'filled'],
        ['filled', 'filled', 'filled', 'filled', 'absent', 'filled'],
      ];
    },

    ...mapState('preferences', ['colorBlindMode']),
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
});
</script>

<style lang="scss" scoped>
.header__icon {
  width: 1.4rem;
  height: 1.4rem;
  fill: #003543;
  stroke: #003543;
  cursor: pointer;
}

.word {
  width: 100%;
  height: 48px;
  max-width: 240px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.25rem;
  margin: 1rem 0;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: #c2d4d9;
  margin: 1.3rem -25px;
  padding: 0 25px;
  box-sizing: content-box;
}

.link {
  color: #003543;
  font-size: 12px;
  font-weight: bold;
  text-decoration: underline;
  line-height: 1rem;
}

.icon {
  width: 1rem;
  height: 1rem;
  fill: #41b883;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    fill: #23a169;
  }

  &--colorblind {
    fill: #f5793a;

    &:hover {
      fill: #f1651f;
    }
  }

  &--smaller {
    width: 0.9rem;
    height: 0.9rem;
    margin-top: 2px;
  }
}

p {
  color: #003543;
  font-size: 14px;

  &.note {
    font-size: 12px;
    margin: 0;

    &--aligned {
      display: flex;
      align-items: center;
      column-gap: 8px;
    }

    & + .note {
      margin-top: 0.5rem;
    }
  }
}

h4 {
  color: #003543;
  font-size: 16px;
  margin: 1.3rem 0;
}
</style>
