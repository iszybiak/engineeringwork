<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      Dodaj gracza
    </v-card-title>

    <v-card-text>
      <v-overflow-btn
          v-if="filterFriends"
          :items="filterFriends"
          :item-text="filterFriends => filterFriends.name + ' ' + filterFriends.surname"
          v-model="friendID"
          item-value="_id"
          class="my-2"
          label="Wybierz gracza"
          >
      </v-overflow-btn>
     </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          text
          @click="addFriend"
      >Dodaj</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const props = defineProps({
  meetId: {
    type: String
  }
})
const friend = ref('')
const friendID = ref('')
const dataMeet = ref('')
const filterFriends = ref('')

onMounted(async () => {
  const response =  await axios.get('api/listItems/');
  friend.value = response.data;

  const res2 =  await axios.get('api/listMeets/' +props.meetId);
  dataMeet.value = res2.data;

  console.log(dataMeet.value)
  console.log(friend.value)

  filterFriends.value = friend.value.filter((i) => !dataMeet.value.friends.includes(i._id))
})
async function addFriend(){
  await axios.put('api/listMeets/friends/' +props.meetId , {
    friends: friendID.value
  });

  await axios.post('api/listMeets/squad/', {
    friendId: friendID.value,
    meetId: props.meetId,
  });
  window.location.reload();
}
</script>
