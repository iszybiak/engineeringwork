<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="400"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Witaj w aplikacji V-Team
        </h1>
        <p class="subheading font-weight-regular" v-if="currentRole === 'ROLE_HEAD_ADMIN'">
          Jako administrator główny możesz zarządzać organizatorami
        </p>
        <p class="subheading font-weight-regular" v-if="currentRole === 'ROLE_ADMIN'">
          Jako organizator możesz zarządzać spotkaniami oraz graczami
        </p>
        <p class="subheading font-weight-regular" v-if="currentRole === 'ROLE_USER'">
          Przymij zaproszenie i graj!
        </p>
        <p class="subheading font-weight-regular" v-if="currentRole === 'ROLE_BASIC'">
          Oczekujesz na akceptację przez organizatora
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Cookies from "universal-cookie/es6";

const cookies = new Cookies()
const currentRole = cookies.get("role")

</script>
