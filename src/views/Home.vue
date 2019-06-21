<template>
  <v-container>
    <v-flex>
      <app-game></app-game>
    </v-flex>
    <v-flex mt-3>
      <app-history></app-history>
    </v-flex>
  </v-container>
</template>

<script>
import History from "@/components/History.vue";
import Game from "@/components/Game.vue";
export default {
  components: {
    "app-history": History,
    "app-game": Game
  }
};
</script>
