<template>
  <nav>
    <v-navigation-drawer absolute temporary v-model="drawer" class="hidden-md-and-up">
      <v-list>
        <v-list-tile>
          <v-btn flat to="/">Play</v-btn>
        </v-list-tile>
        <v-list-tile>
          <v-btn v-if="!user" flat to="/signin">Sign In</v-btn>
        </v-list-tile>
        <v-list-tile>
          <v-btn v-if="!user" flat to="/signup">Sign Up</v-btn>
        </v-list-tile>
        <v-list-tile>
          <v-btn v-if="user" flat @click="signout">Sign Out</v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :dark="true">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Mean Game</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">Play</v-btn>
        <v-btn v-if="!user" flat to="/signin">Sign In</v-btn>
        <v-btn v-if="!user" flat to="/signup">Sign Up</v-btn>
        <v-btn v-if="user" flat to="/profile">{{user.email}}</v-btn>
        <v-btn v-if="user" flat @click="signout">Sign Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script>
import { auth } from "@/firebase/init";

export default {
  name: "Navbar",
  data() {
    return {
      user: null,
      drawer: false
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
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>