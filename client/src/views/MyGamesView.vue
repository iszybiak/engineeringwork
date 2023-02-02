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
            <v-list-item-subtitle v-if="meet.level === 1">
              {{meet.place}} | {{meet.price}} zł | Amatorski
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="meet.level === 2">
              {{meet.place}} | {{meet.price}} zł | Rekreacyjny
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="meet.level === 3">
            {{meet.place}} | {{meet.price}} zł | Średnio-zaawansowany
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="meet.level === 4">
              {{meet.place}} | {{meet.price}} zł | Zaawansowany
            </v-list-item-subtitle>
            </v-list-item-content>
          <my-games-accept :meetId="meet._id" :friendId="item._id" />
        </v-list-item>
      </v-list>
    <v-list>

    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from 'moment'
import GameFriends from "@/components/GameFriends.vue";
import Cookies from "universal-cookie/es6";
import MyGamesAccept from "@/components/MyGamesAccept.vue";

const cookies = new Cookies()
const currentEmail = cookies.get("email")

export default {
  components: {MyGamesAccept, GameFriends},
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
  },
  computed: {
    filterData: function () {
      return this.itemsMeet.sort((a,b) => new Date(b.meeting_date) - new Date(a.meeting_date))
    },
  }
}
</script>
