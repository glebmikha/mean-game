<template>
  <v-app id="inspire">
    <v-data-table
      v-if="userAnswers.length>0"
      :headers="headers"
      :items="userAnswers"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{props.item.date}}</td>
        <td>{{ props.item.array.array }}</td>
        <td class="text-xs-right">{{ props.item.array.mean }}</td>
        <td class="text-xs-right">{{ props.item.userMean }}</td>
        <td class="text-xs-right">{{ props.item.error }}</td>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  props: ["userAnswers"],
  data() {
    return {
      headers: [
        {
          text: "Date",
          align: "left",
          sortable: false,
          value: "date"
        },
        {
          text: "Array",
          align: "left",
          sortable: false,
          value: "array.array"
        },
        { text: "True Mean", value: "array.mean", sortable: false },
        { text: "User Mean", value: "userMean", sortable: false },
        { text: "Error", value: "error", sortable: false }
      ]
    };
  }
};
</script>

