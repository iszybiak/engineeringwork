<template>
  <v-container>
    <v-row justify="center">
      <v-expansion-panels inset>
        <v-expansion-panel
            v-for="meet in filterData"
            :key="meet._id"
        >

          <v-expansion-panel-header class="title">

              <span>
                <v-icon color="blue">mdi-account-group</v-icon>
              Spotkanie
              {{format_date(meet.meeting_date)}}
              </span>

              <template v-slot:actions>
                <v-icon color="primary">
                  $expand
                </v-icon>
              </template>

          </v-expansion-panel-header>
          <GameFriends
              v-for="friend in meet.friends"
              :key="friend"
              :friend="friend"
          >
          </GameFriends>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
import moment from 'moment'
import GameFriends from "@/components/GameFriends.vue";

export default {
  components: {GameFriends},
  data ()
  {
    return {
      itemsMeet: [],
      item: '',
      show: false

    };
  },
  async mounted(){
    const res = await axios.get('api/listMeets/')
    this.itemsMeet = res.data;
  },
  methods: {
    format_date(value){
      if (value) {
        return moment(String(value)).format('DD.MM.YYYY')
      }
    },
  },
  computed: {
    filterData: function () {
      return this.itemsMeet.sort((a,b) => new Date(b.meeting_date) - new Date(a.meeting_date))
    }
  }

}

</script>

<style>
.title{
  color: rgb(53, 53, 58);
}
</style>