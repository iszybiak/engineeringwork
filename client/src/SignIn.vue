<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-10 ">
                        <h1
                          class="mb-10 text-center display-2 blue--text text--accent-3"
                        >Logowanie</h1>
                      <v-form>
                          <v-text-field
                            v-model="message"
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
                            v-model="message"
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
                        <small>Zapomniałeś hasła?</small>
                      </v-card-text>
                      <div class="text-center mt-3 mb-10">
                        <v-btn rounded color="blue accent-3" dark>ZALOGUJ</v-btn>
                      </div>
                    </v-col>
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

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-10 ">
                        <h1 class="text-center display-2 blue--text text--accent-3 mb-10">Utwórz konto</h1>
                        <v-form>
                          <v-text-field
                            label="Name"
                            name="Name"
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
                                Podaj imie i nazwisko
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
                            v-model="message"
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
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="blue accent-3"
                            v-model="message"
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
                      <div class="text-center mt-n5 mb-10">
                        <v-btn rounded color="blue accent-3" dark>ZAREJESTRUJ</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    step: 1
  }),
  props: {
    source: String
  }
};
</script>