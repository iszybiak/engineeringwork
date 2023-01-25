<template>
  <v-expansion-panel-content
  >
    <v-row>
      <v-col >
        {{data.name +" "+ data.surname}}

      </v-col>
      <v-col
      >
        <p v-if="data2.confirm === 0" class="gray">Nie potwierdzono</p>
        <p v-if="data2.confirm === 1" class="green">Potwierdzono obecność</p>
        <p v-if="data2.confirm === 2" class="red">Potwierdzono nieobecność</p>

      </v-col>
      <v-col >
        <p v-if="data2.arrived === 0" class="gray">Brak danych</p>
        <p v-if="data2.arrived === 1" class="green">Przybył</p>
        <p v-if="data2.arrived === 2" class="red">Nie przybył</p>
      </v-col>
      <v-col>
      </v-col>
    </v-row>

  </v-expansion-panel-content>
</template>

<script setup>

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
  console.log("meet" +props.meetId)
  console.log("friends" + props.friend)

  const res =  await axios.get('api/listMeets/squad/' +props.meetId + "/" + props.friend);
  data2.value = res.data;
  console.log(data2)

})

</script>

<style>
.red{
  color: red;
}
.gray{
  color: gray;
}
.green{
  color: green;
}

</style>