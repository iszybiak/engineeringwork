<template>
  <v-expansion-panel-content>
    <div v-if="data2.confirm === 2">
      <v-row>
        <v-col class="grey--text">
          {{data.name +" "+ data.surname}}
        </v-col>
        <v-col class="font-weight-bold red-text ml-8">Odmówił</v-col>
        <v-col></v-col>
      </v-row>
    </div>
    <div v-if="data2.confirm === 0">
      <v-row >
        <v-col class="grey--text">
          {{data.name +" "+ data.surname}}
        </v-col>
        <v-col class="font-weight-bold grey--text ml-8">Anulowany</v-col>
        <v-col class="mobile"></v-col>
      </v-row>
    </div>
  </v-expansion-panel-content>
</template>
<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";

const props = defineProps({
  cancelled: {
    type: String
  },
  meetId: {
    type: String
  }
})

const data = ref('')
const data2 = ref('')
const meet = ref('')



onMounted(async () => {
  const r =  await axios.get('api/listMeets/' + props.meetId );
  meet.value = r.data;

  const res =  await axios.get('api/listMeets/squad/' + props.meetId + "/" + props.cancelled );
  data2.value = res.data;

  const response =  await axios.get('api/listItems/' + props.cancelled );
  data.value = response.data;

})
</script>
<style>
.red-text{
  color: #a94839;
  font-weight: bold;
}

@media only screen and (max-width: 585px){
  .mobile{
    display: none;
  }
}
</style>

