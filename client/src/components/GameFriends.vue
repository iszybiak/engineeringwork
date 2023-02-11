<template>
  <v-expansion-panel-content>
    <v-row v-if="data2.confirm !== 2">
      <v-col>
        {{data.name +" "+ data.surname}}
      </v-col>
      <v-col class="edit-col">
        <v-row>
        <v-col>
        <v-tooltip v-if="data2.confirm === 0" left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                x-small
                icon
                dark
                v-bind="attrs"
                v-on="on"
                @click="cancel(data._id, data.email, data.number)"

                :style="{ color: hover ? 'red' : 'gray' }"
                @mouseover="hover = true"
                @mouseout="hover = false"
            >
              <v-icon>mdi-cancel</v-icon>
            </v-btn>
          </template>
          <span>Anuluj zaproszenie</span>
        </v-tooltip>
        </v-col>
        <v-col class="mob">
          <p v-if="data2.confirm === 0"  class="gray" @click="alert = !alert, send(data.email, data.number)">
            <v-icon>mdi-send</v-icon>
          </p>
          <p v-if="data2.confirm === 1" ><v-icon class="green--text">mdi-account-check</v-icon></p>
        </v-col>
        </v-row>
      </v-col>
      <v-col class="mobileNone">
        <p v-if="data2.confirm === 0"  class="gray clickable" @click="alert = !alert, send(data.email, data.number)"></p>
        <p v-if="data2.confirm === 1" class="green-text">Będzie</p>
      </v-col>
      <v-col >
        <template v-if="data2.arrived === 0 && data2.confirm === 1" >
        <v-menu
            v-model="menu"
            bottom
            right
            transition="scale-transition"
            origin="top left"
        >
          <template v-slot:activator="{ on }">

            <span class="gray check" v-on="on" v-bind:class="{'green-text': selected === 1, 'red-text': selected === 0, 'yellow-text': selected === 2}">
              {{selected === 0 ? 'Nie przybył' : selected === 1 ? 'Opłacono' : selected === 2 ? 'Nie opłacono' : 'Dodaj'}}</span>
          </template>
          <v-card width="200">
            <v-list>
              <v-list-item  @click="chosen( 0, data._id)">
              <v-list-item-title class="red-text">Nie przybył</v-list-item-title>
            </v-list-item>
              <v-list-item  @click="chosen( 1, data._id)">
                <v-list-item-title class="green-text">Opłacono</v-list-item-title>
              </v-list-item>
            <v-list-item  @click="chosen(2,data._id)">
              <v-list-item-title class="yellow-text">Nie opłacono</v-list-item-title>
            </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        </template>
        <p v-if="data2.confirm !== 1" class="grey--text align-center">Brak</p>
        <p v-if="data2.arrived === 2" class="red-text">Nie przybył</p>
        <p v-if="data2.fee === 1" class="green-text">Opłacono</p>
        <p v-if="data2.fee === 2" class="yellow-text">Nie opłacono</p>
      </v-col>
    </v-row>
    <v-alert :value="alert"
    outlined
    type="success"
    text
    >Wysłano przypomnienie</v-alert>
  </v-expansion-panel-content>
</template>

<script setup>
import axios from "axios";
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  friend: {
    type: String
  },
  meetId: {
    type: String
  }
})



const data = ref('')
const data2 = ref('')
const meet = ref('')
const show = ref('')
const currentDate = new Date().toISOString()
computed(() => show)

onMounted(async () => {
  const r =  await axios.get('api/listMeets/' + props.meetId );
  meet.value = r.data;

  const response =  await axios.get('api/listItems/' + props.friend );
  data.value = response.data;

  const res =  await axios.get('api/listMeets/squad/' +props.meetId + "/" + props.friend);
  data2.value = res.data;
})

function format_date(value){
  if (value) {
    return moment(String(value)).lang('PL').format(' dddd - '+'DD MMM ')
  }
}

function format_time(value){
  if (value) {
    return moment(String(value)).format('HH:mm')
  }
}
async function send(email, number) {
  await axios.post('api/listMeets/email-send', {
    to: email,
    subject: "Przypomnienie o spotkaniu ",
    text: "Nie poinformowałeś ogranizatorów o swojej obecności na spotkaniu. " +
        "Zrób to jak najszybciej! http://localhost:8080/userGames"
  });

  // await axios.post('api/listMeets/sms', {
  //   to: number,
  //   text: "Nie poinformowałeś ogranizatorów o swojej obecności na spotkaniu. " +
  // "Zrób to jak najszybciej! http://localhost:8080/userGames"
  // });
}
async function chosen(d, friend){
  let points = parseInt(data.value.points)
  let badBehavior = data.value.behavior + 1
  if(d === 0 ){
    await axios.put('api/listMeets/squad/' +props.meetId + "/" + friend, {
      arrived: 2,
    });
    points = points - 2
  }
  if(d === 1){
    console.log("Opłacił")
    await axios.put('api/listMeets/squad/' +props.meetId + "/" + friend, {
      arrived: 1,
      fee: 1,
    });
    points = points + 2
  }if(d === 2){
    console.log("Nie opłacił")
    await axios.put('api/listMeets/squad/' +props.meetId + "/" + friend, {
      arrived: 1,
      fee: 2,
    });
  }

  await axios.put('api/listItems/' + friend, {
    points: points.toString(),
    behavior: badBehavior
  });
  selected.value = d
}
async function cancel(id, email, number){
  let points = parseInt(data.value.points)
  points = points - 1

  await axios.put('api/listItems/' + id, {
    points: points.toString()
  });

  await axios.put('api/listMeets/cancelled/' +  meet.value._id, {
    cancelled: id
  });

  await axios.delete('/api/listMeets/friends/' + meet.value._id , {
    data: { friends: id }
  });

  // await axios.post('api/listMeets/email-send', {
  //   to: email,
  //   subject: "Zaproszenie zostało anulowane",
  //   text: "Zaproszenie z dnia " + format_date(meet.value.meeting_date) +
  //       " o godz. " + format_time(meet.value.meeting_date) +
  //       " w miejscu "+ meet.value.place +
  //       " zostało anulowane. Ogranizator zbyt długo oczekiwał Twojej odpowiedzi "
  // });


  // await axios.post('api/listMeets/sms', {
  //   to: number,
  //   text: "Nie poinformowałeś ogranizatorów o swojej obecności na spotkaniu. " +
  // "Zrób to jak najszybciej! http://localhost:8080/userGames"
  // });
  location.reload();
}

</script>
<script>
import moment from "moment/moment";

export default {
  data () {
    return {
      dialog: false,
      alert: false,
      menu: false,
      hover: false,
      selected: ""
    };
  },
  watch: {
    alert (val) {
      if (!val) return
      setTimeout(() => (this.alert = false), 3000)
    },
    selected: function (d){
      console.log("Napis")
    }
  },
}
</script>

<style>
.red-text{
  color: #a94839;
  font-weight: bold;
}
.gray{
  color: gray;
}
.green-text{
  color: #50af62;
  font-weight: bold;
}
.yellow-text{
  color: #bfc541;
  font-weight: bold;
}

.clickable{
  cursor: pointer;
}
.clickable::before{
  content:'Nie potwierdzono';
  position: absolute;
}
.clickable::after{
  content:'Wyślij przypomnienie';
  color: rgba(253,68,229,0);
}
.clickable:hover::before {
  color: rgba(253,68,229,0);
}
.clickable:hover::after {
  top: 0;
  color: dodgerblue;
  font-weight: bold;
}
.check{
  cursor: pointer;
}
.check:hover{
  color: #000000;
  font-weight: bold;
}
.v-application p {
  margin-bottom: 0;
}

.cancel{
  left: -40px;
}
@media only screen and (min-width: 586px){
.mob{
  display: none;
}
}

@media only screen and (max-width: 585px) {
  .edit-col {
    display: block !important;
    max-width: 100% !important;
    text-align: center;
  }
  .clickable {
    cursor: pointer;
  }
  .check {
    display: block;
    text-align: center;
  }
  .mobileNone{
    display: none;
    text-align: right;
  }

}
</style>