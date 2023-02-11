<template>
  <v-card
      class="mx-auto"
  >
    <v-card-actions>

    </v-card-actions>
    <v-list>
      <v-list-item
          v-for="item in filterData"
          :key="item._id"
          v-if="item.role == 'ROLE_BASIC'"
      >
        <v-list-item-content>
          <v-list-item-title >{{ item.name + " " + item.surname}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-btn
              color="blue accent-3" dark
              @click="access(item._id)"
          > Przyjmij </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
    async access(id){
      await axios.put('api/listItems/' + id , {
        role : 'ROLE_USER'
      });
      window.location.reload()


    }
  },
}
</script>

