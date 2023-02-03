<template>
  <v-list-item-content class="button" v-if="squad.confirm == 0 && meet.meeting_date > currentDate " >
    <v-list-item-content>
      <v-dialog
          v-model="dialog"
          width="500"
      >
        <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="cyan" dark
          max-width="150"
          v-bind="attrs"
          v-on="on"
      > Potwierdź </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5">
            Czy potwierdzasz obecność na zajeciach?
          </v-card-title>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="dialog = false , accept()"
            >
              Będę
            </v-btn>
            <v-btn
                color="primary"
                text
                @click="dialog = false"
            >
              Anuluj
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list-item-content>
    <v-list-item-content>
      <v-dialog
          v-model="dialog2"
          width="500"
      >
        <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="blue accent-3" dark
          max-width="150"
          v-bind="attrs"
          v-on="on"
      > Odrzuć </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5">
            Czy na pewno rezygnujesz z zajęć?
          </v-card-title>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="dialog2 = false, dismiss()"
            >
              Rezygnuję
            </v-btn>
            <v-btn
                color="primary"
                text
                @click="dialog2 = false"
            >
              Anuluj
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
<script>
export default {
  data(){
    return {
      dialog: false,
      dialog2: false,
    }
  }
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