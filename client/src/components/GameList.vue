<template>
  <v-container>
    <v-row justify="center">
      <v-expansion-panels inset>
        <v-expansion-panel
            v-for="meet in filterData"
            :key="meet._id"
        >

          <v-expansion-panel-header  class="title" v-if="meet.meeting_date > currentDate" >
              <span >
                <v-icon color="blue">mdi-account-group</v-icon>
                Spotkanie
              {{format_date(meet.meeting_date) }}- {{meet.place}} - godz. {{format_time(meet.meeting_date)}}
              </span>
            <template v-slot:actions>
                <v-icon color="primary">
                  $expand
                </v-icon>
              </template>
          </v-expansion-panel-header>
          <v-expansion-panel-header  class="title archived" v-else >
              <span class="white--text">
                <v-icon color="white">mdi-account-group</v-icon>
                Spotkanie
              {{format_date(meet.meeting_date) }}- {{meet.place}} - godz. {{format_time(meet.meeting_date)}}
              </span>
            <template v-slot:actions>
              <v-icon color="gray">
                $expand
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row v-if="meet.periodicity === true">
              <p class="grey--text ml-3">Spotkanie cykliczne - utworzy tydzień po tym</p>
            </v-row>
            <v-row class="tab-header">
              <v-col>Zawodnik</v-col>
              <v-col class="edit-col"></v-col>
              <v-col>Obecność</v-col>
              <v-col>Status </v-col>
            </v-row>
          </v-expansion-panel-content>
          <GameFriends
              v-for="friend in meet.friends"
              :key="friend"
              :meetId="meet._id"
              :friend="friend"
              :cancelled:="meet.cancelled"
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
          <v-expansion-panel-content>
            <v-divider ></v-divider>
          </v-expansion-panel-content>
          <GameCancelled
              v-for="cancelled in meet.cancelled"
              :key="cancelled"
              :meetId="meet._id"
              :friend="friend"
              :cancelled="cancelled"
          />
          <v-expansion-panel-content  v-if="meet.meeting_date > currentDate">
            <v-divider/>
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
                        {{format_date(meet.meeting_date)}} godz.
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
                  v-if="meet.invitation == false"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      id="btn"
                      v-bind="attrs"
                      v-on="on"
                  >Zaproś
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Wyślij zaproszenia do wspólnej gry
                  </v-card-title>

                  <v-card-text class="mt-7">
                    Czy napewno chesz wysłać zaproszenia do gry w  {{format_date(meet.meeting_date) }}
                    o godz. {{format_time(meet.meeting_date)}}?
                  <b class="red--text">Jesli tego nie zrobisz zaproszenia wyślą się automatycznie 2 dni przed spotkaniem.</b>
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
                        sendInvite(meet._id);
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
                          Wysyłanie zaproszeń
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
              <div v-else class="grey--text mt-2" >
                Zaproszenia zostały wysłane
              </div>
              <v-spacer/>


              <v-dialog
                  v-model="dialog3"
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

                  <v-card-text class="mt-7">
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
                        @click="dialog3 = false"
                    >
                      Anuluj
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="dialog3 = false ;
                        cancel(meet._id);
                        loading2 = true"
                    >
                      TAK
                    </v-btn>
                    <v-dialog
                        v-model="loading2"
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
import GameCancelled from "@/components/GameCancelled.vue";
const cookies = new Cookies()
const currentEmail = cookies.get("email")
export default {
  components: {GameCancelled, GameAddFriend, GameMove, GameEdit, GameFriends},
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
      loading2: false,
      dialog2:false,
      dialog3:false,
      currentDate: new Date().toISOString()
    };
  },
  async mounted(){
    const res = await axios.get('api/listMeets/maker/' + currentEmail)
    this.itemsMeet = res.data;

    const resp = await axios.get('api/listItems/')
    this.friend = resp.data;

    const date2 = new Date (this.currentDate)

    for(const elem of this.filterByInvitation){
      const date1 = new Date (elem.meeting_date)
      const timeDiff = Math.abs(date1 - date2);
      const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      if( diffDays < 3){
        await this.sendInvite(elem._id)
      }
    }



    for(const elem of this.filterByPeriodicity){
      const date1 = new Date (elem.meeting_date)
      const timeDiff = Math.abs( date1 - date2);
      const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      if(date1 < date2 && diffDays > 4){
        const newDate = date1.setDate(date1.getDate() + 7);
        const response = await axios.post('api/listMeets/', {
          meeting_date: newDate,
          place: elem.place,
          price: elem.price,
          level: elem.level,
          friends: elem.friends,
          maker: currentEmail,
          reserved: elem.reserveID,
          periodicity: true
        });
        if(response.status === 200) {
          for (const elem of response.data.friends) {
            await axios.post('api/listMeets/squad/', {
              friendId: elem,
              meetId: response.data._id,
            });
          }
        }
        await axios.put('api/listMeets/' +elem._id , {
         periodicity: false });
      }
    }

  },
  methods: {
    format_date(value){
      if (value) {
        return moment(String(value)).lang('PL').format(' dddd - '+'DD MMM ')
      }
    },
    format_time(value){
      if (value) {
        return moment(String(value)).format('HH:mm')
      }
    },
    async cancel(id) {
      await axios.delete('api/listMeets/' + id)
      const res = await axios.get('api/listMeets/' +id)
      this.meet = res.data;

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
    async sendInvite(id){
      const res = await axios.get('api/listMeets/' +id)
      this.meet = res.data;

      for (const elem of this.meet.friends) {
          const checkFriends = this.friend.filter((item) => item._id == elem)
          const date = this.format_date(this.meet.meeting_date);
          const time = this.format_time(this.meet.meeting_date);
          const place = this.meet.place

        await axios.post('api/listMeets/email-send', {
          to: checkFriends[0].email,
          subject: "Siatkówka - "+date+" - godz. - "+time+" - "+place,
          text: "Cześć ! Zapraszam Cię do wspólnej gry "+date+" o godzinie "+
              time+". Miejsce - "+place +
              "Potwierdź swoją obecność lub nieobecność tu: http://localhost:8080/userGames"
        });
        // await axios.post('api/listMeets/sms', {
        //   to: checkFriends[0].number,
        //   text: "Cześć "+checkFriends[0].name +" ! Zapraszam Cię do wspólnej gry "+date+" o godzinie "+
        //       time+". Miejsce - "+place +
        //       "Potwierdź swoją obecność lub nieobecność tu: http://localhost:8080/#/"
        // });
      }
      await axios.put('api/listMeets/' + id,  {
        invitation: true
      })
      window.location.reload();
    },
  },
  computed: {
    filterData: function () {
      return this.itemsMeet.sort((a,b) => new Date(b.meeting_date) - new Date(a.meeting_date))
    },
    filterByInvitation: function (){
      return this.itemsMeet.filter( o => o.invitation === false )
    },
    filterByPeriodicity: function (){
      return this.itemsMeet.filter( o => o.periodicity === true )
    },
  },
  watch: {
    dialog(val) {
      if (!val) return
      setTimeout(() => (this.loading = false, this.loading2 = false), 4000)
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
  max-width: 3%;
}
.buttons {
  padding-top: 20px;
  padding-bottom: 10px;
}
.archived{
  background-color: #9a9a9a;
}
</style>