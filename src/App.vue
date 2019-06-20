<template>
  <v-app>
    <app-navbar/>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "App",
  components: {
    "app-navbar": Navbar
  },
  data() {
    return {
      //
    };
  }
};
</script>
