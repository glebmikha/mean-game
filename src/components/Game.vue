<template>
  <v-content>
    <v-card>
      <v-flex xs12 md4 offset-md4>
        <v-card-text class="array">1, 2, 3, 48, 7</v-card-text>
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
        <v-alert type="info"></v-alert>
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      userMean: null
    };
  },
  methods: {
    formSubmit() {
      console.log(this.userMean);
    }
  }
};
</script>

<style>
.centered-input input {
  text-align: center;
}
.array {
  font-size: 2em;
  text-align: center;
}

.v-label {
  text-align: center;
}
</style>
