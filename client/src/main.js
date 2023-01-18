import Vue from 'vue'
import App from './App.vue'
import User from './User.vue'
import SignIn from './SignIn.vue'
import LogIn from './components/LogIn.vue'
import Registration from './components/Registration.vue'
import Admin from './Admin.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(SignIn)
}).$mount('#app')
