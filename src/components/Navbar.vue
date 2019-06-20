<template>
  <v-toolbar :dark="true">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title class="hidden-sm-and-down">Mean Game</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/">Game</v-btn>
      <v-btn flat to="/signin">Sign In</v-btn>
      <v-btn flat to="/signup">Sign Up</v-btn>
      <v-btn flat to="/signout">Sign Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>