<template>
  <v-card
      class="mx-auto"
  >
      <v-list>
        <v-list-item
            v-for="meet in filterData"
            :key="meet._id"
            v-if="meet.friends.includes(item._id)"
        >
          <v-list-item-avatar><v-icon color="blue">mdi-account-group</v-icon> </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title >
              <span class="title">
              Spotkanie
              <b>{{format_date(meet.meeting_date) }}</b> godz. <b>{{format_time(meet.meeting_date)}}</b>
              </span>
            </v-list-item-title>
            </v-list-item-content>
          <v-list-item-content class="button" >
                <v-btn
                    color="cyan" dark
                    max-width="150"
                    @click="accept(meet._id, item._id)"
                > Potwierdź </v-btn>
          </v-list-item-content>
          <v-list-item-content class="button" >
                <v-btn
                    color="blue accent-3" dark
                    max-width="150"
                    @click="dismiss(meet._id, item._id)"
                > Odrzuć </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from 'moment'
import GameFriends from "@/components/GameFriends.vue";
import Cookies from "universal-cookie/es6";

const cookies = new Cookies()
const currentEmail = cookies.get("email")

export default {
  components: {GameFriends},
  data ()
  {
    return {
      itemsMeet: [],
      item: [],
      show: false

    };
  },
  async mounted(){
    const res = await axios.get('api/listMeets/')
    this.itemsMeet = res.data;

    const response = await axios.get('api/listItems/email/' + currentEmail)
    this.item = response.data;

    // const response2 = await axios.get('api/listMeets/squad/' + this.meet._id + "/" + this.item._id)
    // this.itemSquad = response2.data;

  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format('DD.MM.YYYY')
      }
    },
    format_time(value) {
      if (value) {
        return moment(String(value)).format('HH:mm')
      }
    },
    async accept(meetId, friendId) {
      const res = await axios.put('api/listMeets/squad/' +meetId+ '/' + friendId, {
        confirm: 1
      });
      window.location.reload()
    },
    async dismiss(meetId, friendId) {
      const res = await axios.put('api/listMeets/squad/' +meetId+ '/' + friendId, {
        confirm: 2
      });
      window.location.reload()
    },
  },
  computed: {
    filterData: function () {
      return this.itemsMeet.sort((a,b) => new Date(b.meeting_date) - new Date(a.meeting_date))
    }
  }
}
</script>

<style>
.button{
  justify-content: right;
  padding: 0;
  max-width: 20%;
}

</style>