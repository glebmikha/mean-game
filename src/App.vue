<template>
  <v-app>
    <app-navbar/>

    <v-content>
      <router-view/>
    </v-content>
    <app-footer/>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    "app-navbar": Navbar,
    "app-footer": Footer
  },
  data() {
    return {
      //
    };
  }
};
</script>
