<template>
  <v-expansion-panel-content
  >
    <v-row>
      <v-col >
        {{data.name +" "+ data.surname}}
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
  }
})

const data = ref('')

onMounted(async () => {
  const response =  await axios.get('api/listItems/' + props.friend );
  data.value = response.data;
})

</script>