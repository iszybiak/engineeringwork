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
                      label="Wybierz datę"
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
        </v-row>

        <v-row>
          <v-autocomplete
              v-model="friends"
              :items = "items"
              filled
              chips
              label="Wybierz uczestników"
              item-text="name"
              item-value="email"
              multiple
            >

              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar>
                  {{ data.item.name + " " + data.item.surname }}
                </v-chip>
              </template>

              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ data.item.name + " " + data.item.surname }}</v-list-item-title>
                    <v-list-item-subtitle>{{ "Punkty  "+ data.item.points}}</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>

            </v-autocomplete>


              </v-row>
              
          </v-container>
        </v-card-text>

        <v-card-actions>
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
            :disabled="loading"
            :loading="loading"
            @click="addItem"
          >
            DODAJ
          </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        darks
      >
        <v-card-text>
          Tworzenie spotkania
          <v-progress-linear
            indeterminate
            color="white" 
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</v-container> 

</template>


<script>
import axios from "axios";
  export default {
    data ()
    {
      return {
        items: [],
        dialog: false,
        loading: false,
        menu: false,
        friends: [],
        date: ""
      };
    },
    watch: {
      loading (val) {
        if (!val) return
        setTimeout(() => (this.loading = false), 2000)
      },
    },

    async mounted(){
      const response = await axios.get('api/listItems/')
      this.items = response.data;
    }, 
    // async moun(){
    //   const res = await axios.get('api/listMeets/')
    //   this.items = res.data;
    // },
    methods: {
      async addItem(){ 
      // this.loading = true 
      console.log(this.friends)
      const response = await axios.post('api/listMeets/', {
          meeting_date: this.date,
          friends: this.friends
      });
      this.items.push(response.data);
      this.meeting_date = ""; 
      this.friends = [];
      this.dialog = false 
      }
    },
    
  }
</script>
