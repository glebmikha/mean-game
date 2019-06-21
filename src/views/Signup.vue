<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar :dark="true">
              <v-toolbar-title>Sign Up</v-toolbar-title>
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
                ></v-text-field>
                <v-text-field
                  prepend-icon="person"
                  name="name"
                  label="Name"
                  type="text"
                  v-model="name"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
              <v-alert :value="feedback" type="info">{{feedback}}</v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" form="signup-form">Sign Up</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { firebase, auth, db } from "@/firebase/init";
import slugify from "slugify";
export default {
  data() {
    return {
      email: null,
      name: null,
      password: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      if (this.name && this.email && this.password) {
        this.feedback = null;
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This name already exists";
          } else {
            // this name does not yet exists in the db
            auth
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  name: this.name,
                  user_id: cred.user.uid
                });
              })
              .then(() => {
                this.$router.push({ name: "home" });
              })
              .catch(err => {
                this.feedback = err.message;
              });
          }
        });
      } else {
        this.feedback = "Please fill in all fields";
      }
    }
  }
};
</script>
