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
        <v-list-item-content class="mobileNone">
          <v-list-item-title >Ilość punktów</v-list-item-title>
        </v-list-item-content >
        <v-list-item-content class="mobileNone">
          <v-list-item-title >Ilość nieobecności</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content class="mobileNone">
          <v-list-item-title >Ilość odmów</v-list-item-title>
        </v-list-item-content>
        <div class="mob">
          <v-list-item-avatar>Pkt</v-list-item-avatar>
          <v-list-item-avatar>Nob.</v-list-item-avatar>
          <v-list-item-avatar>Odm.</v-list-item-avatar>
        </div>
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

        <v-list-item-content class="mobileNone">
          <v-list-item-title >{{item.points}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content class="mobileNone">
          <v-list-item-title >{{item.behavior}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content class="mobileNone">
          <v-list-item-title >{{item.refusal}}</v-list-item-title>
        </v-list-item-content>

        <div class="mob">
          <v-list-item-avatar>{{item.points}}</v-list-item-avatar>
          <v-list-item-avatar>{{item.behavior}}</v-list-item-avatar>
          <v-list-item-avatar>{{item.refusal}}</v-list-item-avatar>
        </div>

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
<style>
@media only screen and (min-width: 586px) {
  .mob {
    display: none;
  }
}
@media only screen and (max-width: 585px) {
  .mobileNone{
    display: none;
  }
}


</style>
