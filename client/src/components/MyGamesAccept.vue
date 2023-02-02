<template>
  <v-list-item-content class="button" v-if="squad.confirm == 0 && meet.meeting_date > currentDate " >
    <v-list-item-content>
      <v-btn
          color="cyan" dark
          max-width="150"
          @click="accept()"
      > Potwierdź </v-btn>
    </v-list-item-content>
    <v-list-item-content>
      <v-btn
          color="blue accent-3" dark
          max-width="150"
          @click="dismiss()"
      > Odrzuć </v-btn>
    </v-list-item-content>
  </v-list-item-content>

</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
const props = defineProps({
  meetId: {
    type: String
  },
  friendId: {
    type: String
  },
})
const squad = ref('')
const meet = ref('')
const currentDate = new Date().toISOString()

onMounted(async () => {
  const res = await axios.get('api/listMeets/squad/' + props.meetId+ '/' + props.friendId)
  squad.value = res.data;

  const response = await axios.get('api/listMeets/' + props.meetId)
  meet.value = response.data;
  console.log(meet.value.reserved[0])

})
async function accept() {
    await axios.put('api/listMeets/squad/'+ props.meetId+ '/' + props.friendId, {
      confirm: 1
    });
    window.location.reload()
  }

async function dismiss() {
  await axios.put('api/listMeets/squad/' + props.meetId+ '/' + props.friendId, {
    confirm: 2
  });

  await axios.put('api/listMeets/cancelled/' +  props.meetId, {
    cancelled: props.friendId
  });

  await axios.delete(`/api/listMeets/friends/${props.meetId}`, {
    data: { friends: props.friendId }
  });

  //invite next person
  await axios.put('api/listMeets/friends/' +props.meetId , {
    friends: meet.value.reserved[0]
  });

  await axios.post('api/listMeets/squad/', {
    friendId: meet.value.reserved[0],
    meetId: props.meetId,
  });
  window.location.reload()
}
</script>


<style>
.button{
  display: flex;
}
.v-list-item__content{
  flex: 10%
}

</style>