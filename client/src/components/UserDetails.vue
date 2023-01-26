<template>
  <v-card>
    <v-alert
        outlined
        color="blue"
        type="info"
    >
      <div class="text-h6">
        {{ data.name + " "+ data.surname }}
      </div>
      <div class="pa-4">
        <v-row>
          <v-col>
            <v-row><b>Email:</b></v-row>
            <v-row><b>Punkty:</b></v-row>
            <v-row><b>Nr tel.:</b></v-row>
          </v-col>
          <v-col>
            <v-row>{{data.email}}</v-row>
            <v-row>{{data.points}}</v-row>
            <v-row>{{data.number}}</v-row>
          </v-col>
        </v-row>
      </div>
    </v-alert>
  </v-card>
</template>
<script setup>
import axios from "axios";
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  friend: {
    type: String
  },
})

const data = ref('')
console.log(props.friend)

onMounted(async () => {
  const response =  await axios.get('api/listItems/' + props.friend );
  data.value = response.data;
})
</script>
<style>
.text{
  font-size: 20px;
}
</style>