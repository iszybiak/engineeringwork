<template>
  <v-col cols="12" md="8">
  <v-card-text class="mt-10 ">
    <h1 class="text-center display-2 blue--text text--accent-3 mb-10">Utwórz konto</h1>
    <v-form ref="registerForm" v-model="valid" lazy-validation>
      <v-text-field
          label="Imię"
          :rules="[rules.required]"
          name="Name"
          prepend-icon="person"
          type="text"
          v-model="firstName"
          color="blue accent-3"
          outlined
          clearable
      >
        <template v-slot:prepend>
          <v-tooltip
              bottom
          >
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">
                mdi-account
              </v-icon>
            </template>
            Podaj imie
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
          label="Nazwisko"
          name="Surname"
          :rules="[rules.required]"
          v-model="lastName"
          prepend-icon="person"
          type="text"
          color="blue accent-3"
          outlined
          clearable
      >
        <template v-slot:prepend>
          <v-tooltip
              bottom
          >
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">
                mdi-account
              </v-icon>
            </template>
            Podaj nazwisko
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
      <v-alert
          v-if="showAlert"
          dense
          outlined
          type="error"
      >
        Użytkownik z podanym <strong>emailem</strong> już istnieje.
      </v-alert>
      <v-text-field
          v-model="email"
          :rules="emailRules"
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
          v-model="password"
          :rules="[rules.required, rules.min]"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          label="Hasło"
          name="password"
          :type="show1 ? 'text' :'password' "
          color="blue accent-3"
          outlined
          clearable
          @click:append="show1 = !show1"
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

      <v-text-field
          id="passwordReepet"
          v-model="passwordReepet"
          label="Powtórz hasło"
          :rules="[rules.required, passwordMatch]"
          name="passwordReepet"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          prepend-icon="lock"
          :type="show2 ? 'text' : 'password'"
          color="blue accent-3"
          outlined
          clearable
          @click:append="show2 = !show2"
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

      <v-text-field
          v-model="phoneNumber"
          :counter="9"
          :rules="[rules.required, rules.number]"
          :error-messages="errors"
          label="Numer telefonu"
          outlined
          clearable
          type="text"
          color="blue accent-3"
      >
        <template v-slot:prepend>
          <v-tooltip
              bottom
          >
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">
                mdi-phone
              </v-icon>
            </template>
            Podaj numer telefonu
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
    <v-btn rounded color="blue accent-3" dark :disabled="valid == false" @click="registerUser" >ZAREJESTRUJ</v-btn>
  </div>

  </v-col>
</template>


<script >
import axios from "axios";
import router from "@/router";

export default {
  computed: {
    passwordMatch() {
      return () => this.password === this.passwordReepet || "Hasła muszą być takie same";
    }
  },
  data: () => ({
    show1: false,
    show2: false,
    valid: false,
    alert: false,
    showAlert: false,
    rules: {
      required: value => !!value || "Wymagane",
      min: v => (v && v.length >= 8) || "Min 8 characters",
      number: v => /^[0-9\b]+$/.test(v) || "To nie jest numer telefonu"
    },
    emailRules: [
      v => !!v || "Wymagane",
      v => /.+@.+\..+/.test(v) || "Nie istnieje taki email"
    ],
    return : {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: ''
    }
  }),
  methods: {
    async registerUser() {
      let newUser = {
      name: this.firstName,
      surname: this.lastName,
      email: this.email,
      password: this.password,
      number : this.phoneNumber
      }

      const r = await axios.post('api/listItems/auth', newUser);
      if(r.status === 201) {
        window.location.reload();
      }else{
        this.showAlert = true;
      }
    }
  },

}
</script>
<style>
.visible{
  visibility: hidden;

}
</style>
