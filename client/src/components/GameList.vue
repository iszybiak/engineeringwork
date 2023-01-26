<template>
  <v-container>
    <v-row justify="center">
      <v-expansion-panels inset>
        <v-expansion-panel
            v-for="meet in filterData"
            :key="meet._id"
            v-if="meet.maker == currentEmail"
        >

          <v-expansion-panel-header class="title">

              <span>
                <v-icon color="blue">mdi-account-group</v-icon>
                Spotkanie
              <b>{{format_date(meet.meeting_date) }}</b> godz. <b>{{format_time(meet.meeting_date)}}</b>
              </span>

              <template v-slot:actions>
                <v-icon color="primary">
                  $expand
                </v-icon>
              </template>

          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="tab-header">
              <v-col>Zawodnik</v-col>
              <v-col>Obecność</v-col>
              <v-col>Status przybycia</v-col>
              <v-col>Status opłaty</v-col>
              <v-col class="edit-col"></v-col>
            </v-row>

          </v-expansion-panel-content>
          <GameFriends
              v-for="friend in meet.friends"
              :key="friend"
              :meetId="meet._id"
              :friend="friend"
          >
          </GameFriends>

        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
import moment from 'moment'
import GameFriends from "@/components/GameFriends.vue";
import GameEdit from "@/components/GameEdit.vue";
import Cookies from "universal-cookie/es6";

const cookies = new Cookies()
export default {
  components: {GameEdit, GameFriends},
  data ()
  {
    return {
      itemsMeet: [],
      item: '',
      show: false,
      dialog:false,
      currentEmail: cookies.get("email")

    };
  },
  async mounted(){
    const res = await axios.get('api/listMeets/')
    this.itemsMeet = res.data;
  },
  methods: {
    format_date(value){
      if (value) {
        return moment(String(value)).format('DD.MM.YYYY')
      }
    },
    format_time(value){
      if (value) {
        return moment(String(value)).format('HH:mm')
      }
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
.title{
  color: rgb(53, 53, 58);
}
.mx-1{
  float: right;
}
.tab-header{
  font-weight: bold;
  color: dodgerblue;
}
.edit-col{
  max-width: 5%;
  padding: 0;
}

</style>