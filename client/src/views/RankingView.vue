<template>
  <v-card
    class="mx-auto"
  >

    <v-list>
      <v-list-item>
        <v-list-item-avatar>Nr</v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title >Imię Nazwisko</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title >Ilość punktów</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title >Ilość niesłowności</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="(item, index) in filterData"
        :key="item._id"
        v-if="item.role == 'ROLE_USER' || item.role == 'ROLE_ADMIN'"

      >
        <v-list-item-avatar>{{index+1}}</v-list-item-avatar>
        
        <v-list-item-content>
          <v-list-item-title >{{item.name + " " + item.surname}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title >{{item.points}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title >{{item.behavior}}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import axios from "axios";
  export default {
    data () {
      return {
        items: [],
      };
    },
    async mounted(){
      const response = await axios.get('api/listItems/')
      this.items = response.data;
    },
    computed: {
      filterData: function () {
        return this.items.sort((a,b) => new Date(b.points) - new Date(a.points))
      }
    }
  }
</script>

