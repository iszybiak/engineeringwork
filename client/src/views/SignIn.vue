<template>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <log-in/>
                    <v-col cols="12" md="4" class="blue accent-3" >
                      <v-card-text class="white--text ">
                        <h1 class="text-center display-1 fill-height ">Cześć!</h1>
                        <h5
                            class="text-center fill-height"
                        >Lubisz grać w siatkówkę i chcesz dołączyć do zespołu? Zarejestruj się!</h5>
                      </v-card-text>
                      <div class="text-center mb-5">
                        <v-btn  rounded outlined dark @click="step++">REJESTRACJA</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="blue accent-3">
                      <v-card-text class="white--text mt-2 h-50">
                        <h1 class="text-center display-1">Witaj!</h1>
                        <h5
                            class="text-center"
                        >Masz już konto? Aby korzystać z naszych usług zaloguj się!</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">LOGOWANIE</v-btn>
                      </div>
                    </v-col>
                    <registration/>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>



<script>
import Registration from "@/components/Registration.vue"
import LogIn from "@/components/LogIn.vue";

export default {
  data: () => ({
    step: 1
  }),
  components: {LogIn, Registration},


}

</script>