<template>
  <v-card
    class="mx-auto"
  >

    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item._id"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
        
        <v-list-item-content>
          <v-list-item-title >{{ item.name + " " + item.surname}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>

        
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
    }
  }
</script>
