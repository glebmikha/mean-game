<template>
  <v-content>
    <v-flex xs12 md4 offset-md4>
      <v-btn v-if="!gameInProcess" @click="newGame" color="success" large>New Game</v-btn>
    </v-flex>
    <v-card v-if="gameInProcess">
      <v-flex xs12 md4 offset-md4>
        <v-card-text class="array">{{array.array}}</v-card-text>
      </v-flex>
      <v-card-text>
        <v-form @submit.prevent="formSubmit" id="signin-form">
          <v-flex xs12 md4 offset-md4>
            <v-text-field
              class="centered-input"
              browser-autocomplete="off"
              v-model="userMean"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-form>
        <v-alert :value="feedback" type="info">{{feedback}}</v-alert>
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
import { getDiffieHellman } from "crypto";
import { auth } from "@/firebase/init";
export default {
  data() {
    return {
      userMean: null,
      array: null,
      gameInProcess: false,
      arrLen: 10,
      coef: 100,
      feedback: null,
      userAnswers: []
    };
  },
  methods: {
    formSubmit() {
      if (this.userMean) {
        this.feedback = null;
        // calculate and save answer
        let error = (this.array.mean - this.userMean) / this.array.mean;
        this.userAnswers.unshift({
          array: this.array,
          userMean: this.userMean,
          error: error
        });

        // push to db or emit for anonymous user
        if (auth.currentUser) {
          // push to db
        } else {
          // emit
          this.$emit("answersUpdated", this.userAnswers);
        }

        this.array = this.generateArray(this.arrLen, this.coef);
        this.userMean = null;
      } else {
        this.feedback = "Please, enter your guess";
      }
    },
    generateArray(len, coef) {
      const arr = Array.from({ length: len }, () =>
        Math.floor(Math.random() * coef)
      );

      const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
      const mean = average(arr);
      return {
        array: arr,
        mean: mean
      };
    },
    newGame() {
      this.gameInProcess = true;
      this.array = this.generateArray(this.arrLen, this.coef);
    }
  }
};
</script>

<style>
.centered-input input {
  text-align: center;
}
.array {
  font-size: 1.5em;
  text-align: center;
}

.v-label {
  text-align: center;
}
</style>
