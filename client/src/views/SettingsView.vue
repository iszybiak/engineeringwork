<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="text-h4 blue--text">
        Aplikuj na organizatora
      </v-card-title>
      <v-divider/>
      <v-card-subtitle class="text-h6 black--text font-weight-light">
        Organizujesz zajęcia w siatkówkę?
        <p>Chcesz za pomocą kilku kliknęć zaprosić znajomych do wspólnej gry? </p>
        <p><b>Zostań organizatorem spotkań!</b></p>

      </v-card-subtitle>
      <v-card-subtitle class="text-h6 black--text font-weight-light">
        Opisz swój wkład w organizację spotkań.
        <p> Uzasadnij dlaczego powinieneś zostać organizatorem i  <b>prześlij aplikację</b></p>
      </v-card-subtitle>

      <v-card-text>
        <v-textarea
            label="Uzasadnienie"
            v-model="justification"
            auto-grow
            outlined
            rows="5"
            row-height="20"
            shaped
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn class="blue ma-5"
               x-large
               dark
               outlined
               @click="aply"
        >
          Aplikuj
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import Cookies from "universal-cookie/es6";
import axios from "axios";
import {ref} from "vue";

const cookies = new Cookies()
const email = cookies.get('email')

const justification = ref('')

async function aply() {
  await axios.post('api/listMeets/email-send', {
    to: "izabela.szybiak@urz.pl",
    subject: "Prośba o role organizatora",
    text: "Użytkownik z emailem: " +email+ "prosi o rolę organizatora (ADMINA)"
        + "Uzasadnienie: ,, " + justification.value + " `` "
  });

}

</script>