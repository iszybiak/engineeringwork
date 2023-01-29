<template>
  <v-col cols="12" md="8">
    <v-card-text class="mt-10 ">
      <h1
          class="mb-10 text-center display-2 blue--text text--accent-3"
      >Logowanie</h1>

      <v-form>
        <v-text-field
            v-model="email"
            outlined
            clearable
            label="Email"
            type="text"
            color="blue accent-3"
        >
          <template v-slot:prepend>
            <v-tooltip
                bottom
            >
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">
                  mdi-email
                </v-icon>
              </template>
              Podaj email
            </v-tooltip>
          </template>
          <template v-slot:append>
            <v-fade-transition leave-absolute>
              <v-progress-circular
                  v-if="loading"
                  size="24"
                  color="info"
                  indeterminate
              ></v-progress-circular>
            </v-fade-transition>
          </template>
        </v-text-field>
        <v-text-field
            id="password"
            label="Hasło"
            name="password"
            prepend-icon="lock"
            type="password"
            color="blue accent-3"
            v-model="password"
            outlined
            clearable
        >
          <template v-slot:prepend>
            <v-tooltip
                bottom
            >
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">
                  mdi-lock
                </v-icon>
              </template>
              Podaj hasło
            </v-tooltip>
          </template>
          <template v-slot:append>
            <v-fade-transition leave-absolute>
              <v-progress-circular
                  v-if="loading"
                  size="24"
                  color="info"
                  indeterminate
              ></v-progress-circular>
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-form>
    </v-card-text>
  <div class="text-center mt-3 mb-10">
    <v-btn rounded color="blue accent-3" dark @click="logIn">ZALOGUJ</v-btn>

  </div>
  </v-col>

</template>

<script setup>
 import axios from "axios";
 import {ref} from "vue";
 import Cookies from "universal-cookie/es6";
 import router from "@/router";

 const email = ref('')
 const password = ref('')

 const cookie = new Cookies()
 async function  logIn() {

   const response = await axios.post('api/listItems/sign', {
     email: email.value,
     password: password.value
   });
   if(response.status == 200) {
     cookie.set("token", response.data.accessToken)
     cookie.set("role", response.data.role)
     cookie.set("email", response.data.email)
     await router.push("/")
     window.location.reload();
   }else{
     console.error("Niepoprawne hasło lub email")
   }
 }


</script>