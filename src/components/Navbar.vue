<template>
  <v-toolbar :dark="true">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>Mean Game</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/">Play</v-btn>

      <v-btn v-if="!user" flat to="/signin">Sign In</v-btn>
      <v-btn v-if="!user" flat to="/signup">Sign Up</v-btn>
      <v-btn v-if="user" flat @click="signout">Sign Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { firebase, auth } from "@/firebase/init";

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    signout() {
      auth.signOut().then(() => {
        this.$router.push({ name: "signin" });
      });
    }
  }
};
</script>