<template>
    <v-card>
        <v-card-title class="text-h5">
          {{data.name +" "+ data.surname}}
        </v-card-title>
        <v-card-text>
          <v-col>
            <v-row >
              <v-overflow-btn
                  class="my-2"
                  :items="arrived_edit"
                  label="Obecność"
                  editable
                  item-value="value"
                  v-model="chosenArrived"
              ></v-overflow-btn>
            </v-row>
            <v-row v-if="chosenArrived == 1">
              <v-overflow-btn
                  class="my-2"
                  :items="fee_edit"
                  label="Opłata"
                  editable
                  item-value="value"
                  v-model="chosenFee"
              ></v-overflow-btn>
            </v-row>
          </v-col>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>

        <v-btn
            color="green darken-1"
            text
            @click="save"
        >
        Zapisz
        </v-btn>

</v-card-actions>

</v-card>

</template>

<script setup>
import axios from "axios";
import {onMounted, ref, watch} from "vue";

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
const chosenArrived = ref('')
const chosenFee = ref('')

onMounted(async () => {
  const response =  await axios.get('api/listItems/' + props.friend );
  data.value = response.data;

  const res =  await axios.get('api/listMeets/squad/' +props.meetId + "/" + props.friend);
  data2.value = res.data;
})

watch([chosenArrived, chosenFee], async () =>{

})

async function save() {
  if(chosenFee.value == '' || chosenArrived.value == '2'){
    chosenFee.value = 0
  }
  const res =  await axios.put('api/listMeets/squad/' +props.meetId + "/" + props.friend, {
    arrived: chosenArrived.value,
    fee: chosenFee.value
  });
  window.location.reload();
  this.data.push(res.data);

}


</script>
<script>
export default {
  data: () => ({
    arrived_edit: [
      { text: 'Przybył', value: 1},
      { text: 'Nie przybył', value: 2 },
    ],
    fee_edit: [
      { text: 'Opłacono', value: 1},
      { text: 'Nie opłacono', value: 2 },
    ],
  }),
}

</script>