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
          <v-expansion-panel-content v-if="meet.meeting_date > currentDate && meet.friends.length < 12">
            <v-dialog
                v-model="addFriends"
                width="400"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    class="mx-1"
                    fab
                    small
                    v-bind="attrs"
                    v-on="on"
                    color="primary" dark
                ><v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </template>
              <GameAddFriend :meetId="meet._id" />
            </v-dialog>
          </v-expansion-panel-content>
          <v-divider></v-divider>
          <v-expansion-panel-content  v-if="meet.meeting_date > currentDate">
            <v-row class="buttons">
                <v-dialog
                    v-model="dialog"
                    persistent
                >
                  <template v-slot:activator="{ on, attrs }"
                  >
                <v-btn
                    color="primary" dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Przenieś
                </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Przenieś spotkanie
                        {{format_date(meet.meeting_date) }} godz.
                        {{format_time(meet.meeting_date)}}
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
              <v-dialog
                  v-model="dialog2"
                  width="500"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="cyan" dark
                      id="btn"
                      v-bind="attrs"
                      v-on="on"
                      >Odwołaj
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Odwołaj
                  </v-card-title>

                  <v-card-text>
                    Czy napewno chesz odwołać spotkanie {{format_date(meet.meeting_date) }}
                    o godz. {{format_time(meet.meeting_date)}}?
                    Uczestnicy zostaną poinformowani o odwołaniu.
                    </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="dialog2 = false"
                    >
                      Anuluj
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="dialog2 = false ;
                        cancel(meet._id);
                        loading = true"
                    >
                      TAK
                    </v-btn>
                    <v-dialog
                        v-model="loading"
                        hide-overlay
                        persistent
                        width="300"
                    >
                      <v-card
                          color="primary"
                          dark
                      >
                        <v-card-text>
                          Odwoływanie
                          <v-progress-linear
                              indeterminate
                              color="white"
                              class="mb-0"
                          ></v-progress-linear>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
import GameAddFriend from "@/components/GameAddFriend.vue";

const cookies = new Cookies()
export default {
  components: {GameAddFriend, GameMove, GameEdit, GameFriends},
  data ()
  {
    return {
      itemsMeet: [],
      item: '',
      friend: '',
      show: false,
      dialog: false,
      addFriends: false,
      loading: false,
      dialog2:false,
      currentEmail: cookies.get("email"),
      currentDate: new Date().toISOString()
    };
  },
  async mounted(){
    const res = await axios.get('api/listMeets/')
    this.itemsMeet = res.data;

    const resp = await axios.get('api/listItems/')
    this.friend = resp.data;

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
    async cancel(id) {
      const res = await axios.get('api/listMeets/' +id)
      this.meet = res.data;
      await axios.delete('api/listMeets/' + id)

      for (const elem of this.meet.friends) {
        const checkFriends = this.friend.filter((item) => item._id == elem)


        const date = this.format_date(this.meet.meeting_date);
        const time = this.format_time(this.meet.meeting_date);
        const place = this.meet.place

        //Send Email
        await axios.post('api/listMeets/email-send', {
          to: checkFriends[0].email,
          subject: "Odwołane zajęcia - "+ date,
          text: "Przykro nam! Zajęcia z dnia "+date+
              " o godzinie "+time+
              " w miejscu " +place+ "zosłay ODWOŁANE."
        });

        //Send SMS
        // await axios.post('api/listMeets/sms', {
        //   to: this.friend.number,
        //   text: this.friend.name +"! Bardzo nam przykro. Zajęcia z dnia "
        //       +date+" o godzinie "+ time+" w miejscu "+place+ "zostały ODWOŁANE."
        // });
        }
      window.location.reload();
    },
  },
  computed: {
    filterData: function () {
      return this.itemsMeet.sort((a,b) => new Date(b.meeting_date) - new Date(a.meeting_date))
    }
  },
  watch: {
    dialog(val) {
      if (!val) return

      setTimeout(() => (this.loading = false), 4000)
    },
  },

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
  padding-top: 20px;
  padding-bottom: 10px;
}
</style>