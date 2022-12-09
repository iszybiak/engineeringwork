<template>
  <v-container>
  <v-row justify="center">
    <v-expansion-panels inset>
      <v-expansion-panel
      v-for="meet in itemsMeet "
        :key="meet._id" 
      >
    
        <v-expansion-panel-header class="title"> 
        <span>
          <v-icon color="blue">mdi-account-group</v-icon>
        Spotkanie:
        {{format_date(meet.meeting_date)}} 
        </span>
           
          <template v-slot:actions>
            <v-icon color="primary">
              $expand
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Zaproszeni: 
          {{meet.friends}}

  



        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
import moment from 'moment'
  export default {
    data ()
    {
      return {
        itemsMeet: function () {
          return __dirname.orderBy(this.itemsMeet, 'creation_date')
        },
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
           return moment(String(value)).format('DD-MM-YYYY')
          }
      }
    },
    
  }
</script>

<style>
.title{
  color: rgb(53, 53, 58); 
}
</style>
