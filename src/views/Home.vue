<template>
  <v-container>
    <v-flex>
      <app-game @answersUpdated="sendToHistory"></app-game>
    </v-flex>
    <v-flex mt-3>
      <app-history :userAnswers="userAnswers"></app-history>
    </v-flex>
  </v-container>
</template>

<script>
import History from "@/components/History.vue";
import Game from "@/components/Game.vue";
import { auth } from "@/firebase/init";
export default {
  components: {
    "app-history": History,
    "app-game": Game
  },
  data() {
    return {
      userAnswers: null
    };
  },
  methods: {
    sendToHistory(userAnswers) {
      if (auth.currentUser) {
        // download from db
      } else {
        this.userAnswers = userAnswers;
      }
    }
  }
};
</script>
