<template>
  <v-container >
    <v-dialog
      v-model="dialog"
      persistent
    >
      <template v-slot:activator="{ on, attrs }"
      >
        <v-btn
          block
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        > Utwórz spotkanie
        </v-btn>
      </template>


      <v-card>
        <v-card-title>
          <span class="text-h5">Nowe spotkanie</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Data"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"

                    ></v-text-field>
                  </template>


          <v-date-picker
                v-model="date"
                :rules="[rules.required]"
                :min="currentDate"
                @input="menu = false"
              >
          </v-date-picker>
          </v-menu>
              </v-col>
              <v-col
                  cols="11"
                  sm="5"
              >
                <v-dialog
                    ref="dialog"
                    v-model="modal2"
                    :return-value.sync="time"
                    persistent
                    width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="time"
                        label="Godzina"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                      v-if="modal2"
                      :rules="[rules.required]"
                      v-model="time"
                      format="24hr"
                      full-width
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="modal2 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(time)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                v-model="place"
                :rules="[rules.required]"
                label="Miejsce"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
                :items="level"
                v-model="level"
                item-text="text"
                item-value="value"
                label="Poziom"
            ></v-select>
          </v-col>
          <v-col
              max-width="30%">
            <v-text-field
            label="Cena"
            v-model="price"
            type="number"
            value="0"
            suffix="zł"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <p>Lista zawodników</p>
          <v-autocomplete
              v-model="friendsID"
              :rules="[rules.required]"
              :items = "fData"
              chips
              outlined
              solo
              label="Wybierz zawodników"
              item-value="id"
              multiple
              @change="limiteCategory"
            >

              <template v-slot:selection="data"
              >
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"

                >
                  {{ data.item.name + " " + data.item.surname }}
                </v-chip>
              </template>

              <template v-slot:item="data"
              >
                <template v-if="typeof data.item !== 'object' ">
                <v-list-item-content v-text="data.item"

                >{{data.item}}</v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title>{{ data.item.name + " " + data.item.surname }}</v-list-item-title>
                    <v-list-item-subtitle v-if="data.item.level === 1">
                      {{ "Punkty  "+ data.item.points+ " | "}}  Amatorski
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-if="data.item.level === 2">
                      {{ "Punkty  "+ data.item.points+ " | "}}  Rekreacyjny
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-if="data.item.level === 3">
                      {{ "Punkty  "+ data.item.points + " | "}} Średnio-zaawansowany
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-if="data.item.level === 4">
                      {{ "Punkty  "+ data.item.points + " | "}}  Zaawansowany
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
          <v-row>
            <v-col>
              <p>Lista rezerwowa</p>
              <v-autocomplete
                  v-model="reserveID"
                  :rules="[rules.required]"
                  :items = "rData"
                  chips
                  solo
                  label="Wybierz zawodników rezerwowych"
                  outlined
                  item-value="id"
                  multiple
                  @change="limiteCategory"
              >

                <template v-slot:selection="data"

                >
                  <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      @click="data.select"
                      @click:close="remove2(data.item)"
                  >
                    {{ data.item.name + " " + data.item.surname }}
                  </v-chip>
                </template>

                <template v-slot:item="data"
                >
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item">
                      {{data.item}}</v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content >
                      <v-list-item-title>{{ data.item.name + " " + data.item.surname }}</v-list-item-title>
                      <v-list-item-subtitle v-if="data.item.level === 1">
                        {{ "Punkty  "+ data.item.points+ " | "}}  Amatorski
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-if="data.item.level === 2">
                        {{ "Punkty  "+ data.item.points+ " | "}}  Rekreacyjny
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-if="data.item.level === 3">
                        {{ "Punkty  "+ data.item.points + " | "}} Średnio-zaawansowany
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-if="data.item.level === 4">
                        {{ "Punkty  "+ data.item.points + " | "}}  Zaawansowany
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
            <v-row>
              <v-switch
                  v-model="switch1"
                  label="Spotkanie cykliczne"
              ></v-switch>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions
        >
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            WYJDŹ
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addItem"
          >
            UTWÓRZ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <game-list/>
</v-container>
</template>


<script>
import axios, {get} from "axios";
import GameList from "@/components/GameList"
import Cookies from "universal-cookie/es6";

let predFriends = [];
const cookies = new Cookies()
const currentEmail = cookies.get("email")
export default {
  components: { GameList },
  data () {
    return {
      items: [],
      dialog: false,
      currentDate: new Date().toISOString().slice(0,10),
      menu: false,
      friendsID: predFriends,
      reserveID: [],
      date: "",
      time: "",
      place: "",
      price: 0,
      menu2: false,
      modal2: false,
      switch1: false,
      level: [
        { text: 'D - Amatorski', value: 1},
        { text: 'C - Rekreacyjny', value: 2 },
        { text: 'B - Średnio-zaawansowany', value: 3 },
        { text: 'A - Zaawansowany', value: 4 },
      ],
      rules: {
        required: value => !!value || "Wymagane"
      }
    };
  },
  async mounted(){
    const response = await axios.get('api/listItems/')
    this.items = response.data;

    const res = await axios.get('api/listMeets/maker/' + currentEmail)
    this.meet = res.data;

    const sortMeet = this.meet.sort(function (a,b) {
      if(a.creation_date < b.creation_date){ return -1}
      if(a.creation_date > b.creation_date){ return 1 }
      return 0;
    });

    if(predFriends.length == 0){
      for(const elem of sortMeet[0].friends){
        const response = await axios.get('api/listItems/' + elem)
        this.f = response.data;
        predFriends.push(this.f)
      }
    }
  },
  methods: {
    async addItem(){
      const response = await axios.post('api/listMeets/', {
        meeting_date: this.date + "T" + this.time,
        place: this.place,
        price: this.price,
        level: this.level,
        friends: this.friendsID,
        maker: currentEmail,
        reserved: this.reserveID,
        periodicity: this.switch1
        });
      if(response.status === 200) {
        for (const elem of response.data.friends) {
          await axios.post('api/listMeets/squad/', {
            friendId: elem,
            meetId: response.data._id,
          });
        }
     }
      window.location.reload();
    },
    remove (item) {
      const index = this.friendsID.findIndex(elem => elem._id === item._id)
      if (index >= 0) {this.friendsID.splice(index, 1)}
    },
    remove2 (item) {
      const index = this.reserveID.findIndex(elem => elem._id === item._id)
      if (index >= 0) {this.this.reserveID.splice(index, 1)}
    },
    limiteCategory() {
      if (this.friendsID.length > 12)  this.friendsID.pop()
    },
  },
  computed: {
    fData: function () {
      return this.items.filter( el => { return el.role === "ROLE_USER" || el.role === "ROLE_ADMIN" }).sort((a,b) => b.level - a.level)
    },
    rData: function () {
      return this.fData.filter(o => !this.friendsID.map(op => op._id).includes(o._id))
    },
  }
}
</script>

