<template>
  <v-card
      class="mx-auto"
  >
    <v-card-title>Organizatorzy</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item
            v-for="item in filterData"
            :key="item._id"
            v-if="item.role == 'ROLE_ADMIN'"
        >
          <v-list-item-content>
            <v-list-item-title >{{ item.name + " " + item.surname}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>{{ item.email}}</v-list-item-content>
          <v-list-item-content>
            <v-btn
                color="red accent-3" dark
                @click="makeUser(item._id)"
            > ODBIERZ ORGANIZATORA </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-title>Użytkownicy</v-card-title>
    <v-card-text>
    <v-list>
      <v-list-item
          v-for="item in filterData"
          :key="item._id"
          v-if="item.role == 'ROLE_USER'"
      >

        <v-list-item-content>
          <v-list-item-title >{{ item.name + " " + item.surname}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>{{ item.email}}</v-list-item-content>
        <v-list-item-content>
          <v-btn
              color="blue accent-3" dark
              @click="accessAdmin(item._id)"
          > UZNAJ ORGANIZATOREM </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-card-text>

    <v-card-title>Aplikujący</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item
            v-for="item in filterData"
            :key="item._id"
            v-if="item.role == 'ROLE_BASIC'"
        >

          <v-list-item-content>
            <v-list-item-title >{{ item.name + " " + item.surname}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>{{ item.email}}</v-list-item-content>

          <v-list-item-content>
            <v-btn
                color="cyan " dark
                @click="makeUser(item._id)"
            > UZNAJ UŻYTKOWNIKIEM </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import router from "@/router";

Vue.use(Vuetify)


export default {
  data () {
    return {
      items: [],
      loader: null,
      loading: false,
    };
  },
  async mounted(){
    const response = await axios.get('api/listItems/')
    this.items = response.data;
  },
  computed: {
    filterData: function () {
      return this.items.sort((a,b) => new Date(b.points) - new Date(a.points))
    },

  },
  methods: {
    async makeUser(id){
      const res =  await axios.put('api/listItems/' + id , {
        role : 'ROLE_USER'
      });
      window.location.reload()
    },
    async accessAdmin(id){
      const res =  await axios.put('api/listItems/' + id , {
        role : 'ROLE_USER'
      });
      window.location.reload()
    },
  },
}
</script>