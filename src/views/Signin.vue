  <template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar :dark="true">
              <v-toolbar-title>Sign In</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="signin" id="signin-form">
                <v-text-field
                  prepend-icon="email"
                  name="email"
                  label="Email"
                  type="text"
                  v-model="email"
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
              <v-btn type="submit" form="signin-form">Sign In</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    signin() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            //console.log(user)
            this.$router.push({ name: "home" });
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "Please fill in both fields";
      }
    }
  }
};
</script>
