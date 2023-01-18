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
  </v-app>
</template>



<script>
import Registration from "@/components/Registration.vue"
import LogIn from "@/components/LogIn.vue";

export default {
  data: () => ({
    step: 1
  }),
  components: {LogIn, Registration},
  props: {
    source: String
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        // registration
      }
      }
    },
    setup() {
      const showPassword = ref(false);

      const auth = useAuth();

      const user = ref({
        email: "",
        password: "",
      });

      //const router = useRouter();

      const snackbar = ref(false);
      const snackbarText = ref("");

      function register() {
        schema
            .validate({
              password: password.value,
              rePassword: rePassword.value,
              email: email.value,
            })
            .then(() => {
              user.value.email = email.value;
              user.value.password = password.value;
              auth
                  .register(user.value)
                  .then((response) => {
                    if (response.message) {
                      snackbarText.value = response.message;
                      snackbar.value = true;
                    }
                  })
                  .catch((error) => {
                    snackbarText.value = error.response.data.message;
                    snackbar.value = true;
                  });
            })
            .catch((error) => {
              snackbar.value = true;
              snackbarText.value = error.errors[0];
            });
      }

      const schema = yup.object({
        password: yup
            .string()
            .min(8, "Hasło musi mieć przynajmniej 8 znaków")
            .nullable()
            .notRequired(),
        rePassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Hasła muszą być takie same")
            .when("password", {
              is: (password) => password?.length > 0,
              then: yup.string().required("Powtórz nowe hasło"),
            }),
        email: yup.string().email().required("Email jest wymagany"),
      });

      useForm({
        validationSchema: schema,
      });

      const {value: password, errorMessage: passwordError} =
          useField("password");
      const {value: rePassword, errorMessage: rePasswordError} =
          useField("rePassword");
      const {value: email, errorMessage: emailError} = useField("email");

      return {
        router,
        showPassword,
        user,
        password,
        passwordError,
        rePassword,
        rePasswordError,
        email,
        emailError,
        snackbar,
        snackbarText,
        register,
      };
    }

}

</script>