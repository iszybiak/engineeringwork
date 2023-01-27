<template>
  <v-expansion-panel-content
  >
    <v-row>
      <v-col >
        {{data.name +" "+ data.surname}}
      </v-col>
      <v-col>
        <p v-if="data2.confirm === 0" class="gray">Nie potwierdzono</p>
        <p v-if="data2.confirm === 1" class="green-text">Będzie</p>
        <p v-if="data2.confirm === 2" class="red-text">Nie będzie</p>
      </v-col>
      <v-col >
        <p v-if="data2.arrived === 0" class="gray">Brak informacji</p>
        <p v-if="data2.arrived === 1" class="green-text">Przybył</p>
        <p v-if="data2.arrived === 2" class="red-text">Nie przybył</p>
      </v-col>
      <v-col>
        <p v-if="data2.fee === 0" class="gray">-----</p>
        <p v-if="data2.fee === 1" class="green-text">Opłacono</p>
        <p v-if="data2.fee === 2" class="red-text">Nie opłacono</p>
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
            <GameEditFriends
                :meetId="meetId"
                :friend="friend"
            ></GameEditFriends>
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
    </v-row>
  </v-expansion-panel-content>
</template>

<script setup>
import GameEditFriends from "@/components/GameEditFriends.vue";
import axios from "axios";
import {onMounted, ref} from "vue";

const props = defineProps({
  friend: {
    type: String
  },
  meetId: {
    type: String
  }
})

const data = ref('')
const data2 = ref('')

onMounted(async () => {
  const response =  await axios.get('api/listItems/' + props.friend );
  data.value = response.data;

  const res =  await axios.get('api/listMeets/squad/' +props.meetId + "/" + props.friend);
  data2.value = res.data;
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

<style>
.red-text{
  color: #a65d54;
  font-weight: bold;
}
.gray{
  color: gray;
}
.green-text{
  color: #5baf6b;
  font-weight: bold;
}
.edit-col{
  max-width: 5%;
  padding: 0;
}

</style>