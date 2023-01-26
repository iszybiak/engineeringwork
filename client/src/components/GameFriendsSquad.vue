<template>
  <v-col>
    <p v-if="data.confirm === 0" class="gray">Nie potwierdzono</p>
    <p v-if="data.confirm === 1" class="green-text">Będzie</p>
    <p v-if="data.confirm === 2" class="red-text">Nie będzie</p>
  </v-col>
  <v-col >
    <p v-if="data.arrived === 0" class="gray">Brak informacji</p>
    <p v-if="data.arrived === 1" class="green-text">Przybył</p>
    <p v-if="data.arrived === 2" class="red-text">Nie przybył</p>
  </v-col>
  <v-col>
    <p v-if="data.fee === 0" class="gray">-----</p>
    <p v-if="data.fee === 1" class="green-text">Opłacono</p>
    <p v-if="data.fee === 2" class="red-text">Nie opłacono</p>
  </v-col>
  <v-col class="edit-col" >
    <template>
      <v-dialog
          v-model="dialog"
          persistent
          max-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              class="mx-1"
              fab
              dark
              x-small
              color="cyan"
              v-bind="attrs"
              v-on="on"
          >
            <v-icon dark>
              mdi-pencil
            </v-icon>
          </v-btn>
        </template>
        <GameEdit
            :meetId="meetId"
            :friend="friend"
        ></GameEdit>
        <v-btn
            color="green darken-2"
            text
            @click="dialog = false"
        >
          Zamknij
        </v-btn>
      </v-dialog>
    </template>
  </v-col>

</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

let dialog = false
const props = defineProps({
  friend: {
    type: String
  },
  meetId: {
    type: String
  }
})

const data = ref('')

onMounted(async () => {
  const res =  await axios.get('api/listMeets/squad/' +props.meetId + "/" + props.friend);
  data.value = res.data;
})
</script>
