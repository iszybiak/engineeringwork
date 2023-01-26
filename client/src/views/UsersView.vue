<template>
  <v-card
    class="mx-auto"
  >
    <v-list>
        <UserItem
            v-for="item in filterData"
            :key="item._id"
            :friend="item._id"></UserItem>

    </v-list>
  </v-card>
</template>
<script>
import axios from "axios";
import UserDetails from "@/components/UserDetails.vue";
import UserItem from "@/components/UserItem.vue";


  export default {
    components: {UserItem, UserDetails},
    data () {
      return {
        items: [],
        dialog: false
      };
    },
    async mounted(){
      const response = await axios.get('api/listItems/')
      this.items = response.data;
    },
    computed: {
      filterData: function () {
        return this.items.sort((a, b) => new Date(b.points) - new Date(a.points))
      }
    }
  }
</script>
