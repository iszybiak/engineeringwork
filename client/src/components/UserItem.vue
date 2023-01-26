<template>
  <v-list-item>
  <v-list-item-avatar></v-list-item-avatar>
  <v-list-item-content>
    <v-list-item-title >{{ data.name + " " + data.surname}}</v-list-item-title>
  </v-list-item-content>
  <v-list-item-action>
    <template>
      <v-dialog
          v-model="dialog"
          persistent
          max-width="400"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
                 v-bind="attrs"
                 v-on="on"
          >
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </template>
        <UserDetails
            :friend="data._id"
        ></UserDetails>
        <v-btn
            color="blue darken-2"
            text
            @click="dialog = false"
        >
          Zamknij
        </v-btn>

      </v-dialog>
    </template>
  </v-list-item-action>
  </v-list-item>
</template>



<script setup>
import axios from "axios";
import {onMounted, ref, watch} from "vue";
import UserDetails from "@/components/UserDetails.vue";

const props = defineProps({
  friend: {
    type: String
  },
})

const data = ref('')

onMounted(async () => {
  const response =  await axios.get('api/listItems/' + props.friend );
  data.value = response.data;
})
</script>
<script>
export default {
  data () {
    return {
      dialog: false
    };
  }}
</script>