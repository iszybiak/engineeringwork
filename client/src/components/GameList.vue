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
          <v-divider></v-divider>
          <v-expansion-panel-content  v-if="meet.meeting_date > currentDate">
            <v-row class="buttons">
              <v-spacer></v-spacer>
                <v-dialog
                    v-model="dialog"
                    persistent
                >
                  <template v-slot:activator="{ on, attrs }"
                  >
                    <v-spacer></v-spacer>
                <v-btn
                    color="cyan" dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Przenieś
                </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Przenieś spotkanie
                        {{format_date(meet.meeting_date) }} godz. {{format_time(meet.meeting_date)}}
                      </span>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="dialog = false" >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-title>
                  <GameMove :meetId="meet._id"/>
                  </v-card>
                </v-dialog>

                <v-spacer></v-spacer>
                <v-btn
                    color="primary" dark
                    id="btn"
                    @click="cancel(meet._id)"
                >
                  Odwołaj
                </v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>
    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
import moment from 'moment'
import GameFriends from "@/components/GameFriends.vue";
import GameEdit from "@/components/GameEditFriends.vue";
import Cookies from "universal-cookie/es6";
import GameMove from "@/components/GameMove.vue";

const cookies = new Cookies()
export default {
  components: {GameMove, GameEdit, GameFriends},
  data ()
  {
    return {
      itemsMeet: [],
      item: '',
      show: false,
      dialog:false,
      currentEmail: cookies.get("email"),
      currentDate: new Date().toISOString()

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
    cancel(id){
      console.log("cancel" + id)

    }
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
.buttons {
  padding-top: 15px ;
}
</style>