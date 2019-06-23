<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar :dark="true">
              <v-toolbar-title>Profile</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="signup" id="signup-form">
                <v-text-field
                  prepend-icon="email"
                  name="email"
                  label="Email"
                  type="text"
                  v-model="email"
                  disabled
                ></v-text-field>
                <v-text-field
                  prepend-icon="person"
                  name="name"
                  label="Name"
                  type="text"
                  v-model="name"
                  disabled
                ></v-text-field>
                <v-flex xs12 md8 offset-md2>
                  <v-card-text>
                    <h3>Your average error is {{error}}%</h3>
                  </v-card-text>
                </v-flex>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import { auth, db, functions } from "@/firebase/init";
export default {
  data() {
    return {
      email: null,
      name: null,
      error: null
    };
  },
  created() {
    let uid = auth.currentUser.uid;
    this.email = auth.currentUser.email;
    db.collection("users")
      .where("user_id", "==", uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.name = doc.data().name;
        });
      });
    let getAverageError = functions.httpsCallable("getAverageError");
    getAverageError({ uid }).then(result => {
      this.error = (result.data.averageError * 100).toFixed(1);
    });
  }
};
</script>

<style>
</style>
