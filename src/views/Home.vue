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
import { auth, db } from "@/firebase/init";
export default {
  components: {
    "app-history": History,
    "app-game": Game
  },
  data() {
    return {
      userAnswers: []
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
  },
  created() {
    if (auth.currentUser) {
      let ref = db
        .collection("answers")
        .orderBy("timestamp", "desc")
        .where("user_id", "==", auth.currentUser.uid);
      // .doc(auth.currentUser.uid);
      // subscribe to changes to the 'messages' collection
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let doc = change.doc;

            this.userAnswers.unshift(doc.data());
          }
        });
      });
    }
  }
};
</script>
