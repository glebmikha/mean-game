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
          <v-flex class="tip" xs12 md4 offset-md4>enter your guess for the mean</v-flex>
        </v-form>
        <v-alert :value="feedback" type="info">{{feedback}}</v-alert>
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
import { auth, db } from "@/firebase/init";
import moment from "moment";
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
  created() {
    this.newGame();
  },
  methods: {
    formSubmit() {
      if (this.userMean) {
        this.feedback = null;
        // calculate and save answer
        let error = (this.array.mean - this.userMean) / this.array.mean;

        let currentAnswer = {
          array: this.array,
          userMean: parseFloat(this.userMean),
          error: error,
          timestamp: Date.now(),
          user_id: auth.currentUser ? auth.currentUser.uid : null,
          date: moment(Date.now()).format("lll")
        };

        // push to db or emit for anonymous user
        if (auth.currentUser) {
          db.collection("answers")
            .add(currentAnswer)
            .catch(err => {
              console.log(err);
            });
        } else {
          // emit
          this.userAnswers.unshift(currentAnswer);
          this.$emit("answersUpdated", this.userAnswers);
        }
        // get new array and clean input
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

.tip {
  text-align: center;
  color: lightslategray;
}
</style>
