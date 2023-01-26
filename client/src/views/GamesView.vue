<template>
  <v-container>
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
          
        >
          Utwórz spotkanie
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
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
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
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menu = false"
                >
                  Anuluj
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
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
                label="Miejsce"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
                :items="level"
                label="Poziom"
            ></v-select>
          </v-col>
          <v-col
              max-width="30%">
            <v-text-field
            label="Cena"
            type="number"
            value="10"
            suffix="zł"
            ></v-text-field>

          </v-col>

        </v-row>

        <v-row>
          <v-col>
          <v-autocomplete
              v-model="friendsID"
              :items = "fData"
              chips
              label="Wybierz uczestników"
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
                    <v-list-item-subtitle>{{ "Punkty  "+ data.item.points}}</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>

            </v-autocomplete>

          </v-col>
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
            DODAJ
          </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>
    <game-list/>

</v-container>


</template>


<script>
import axios from "axios";
import GameList from "@/components/GameList"
import Cookies from "universal-cookie/es6";

const cookies = new Cookies()
const currentEmail = cookies.get("email")
console.log(currentEmail)
  export default {
  components: { GameList },
    data ()
    {
      return {
        items: [],
        dialog: false,
        menu: false,
        friendsID: [],
        date: "",
        time: "",
        menu2: false,
        modal2: false,
        level: [
          { text: 'D - Amatorski', value: 1},
          { text: 'C - Rekreacyjny', value: 2 },
          { text: 'B - Średnio-zaawansowany', value: 3 },
          { text: 'A - Zaawansowany', value: 4 },
        ],
      };
    },

    async mounted(){
      const response = await axios.get('api/listItems/')
      this.items = response.data;
    },
    methods: {
      async addItem(){
        const response = await axios.post('api/listMeets/', {
          meeting_date: this.date + "T" + this.time,
          friends: this.friendsID,
          maker: currentEmail
          });
          this.items.push(response.data);

          for (const elem of this.friendsID) {
            const res = await axios.post('api/listMeets/squad/', {
              friendId: elem,
              meetId: response.data._id,
            });
            this.items.push(res.data);
          }
          window.location.reload();

        // this.meeting_date = "";
        // this.friends = [];
        // this.dialog = false

        // for (const elem of this.friends) {
        //   sendEmail(elem, this.meeting_date)
        //
        // }
      },
      remove (item) {
        const index = this.items.indexOf(item.id)
        if (index >= 0) this.items.splice(index, 1)
      },
      limiteCategory() {
        if (this.friendsID.length > 12)  this.friendsID.pop()
      },

    },
    computed: {
      fData: function () {
        return this.items.filter( el => { return el.role !== "ROLE_BASIC" } )
      },
    },

    
  }
</script>
