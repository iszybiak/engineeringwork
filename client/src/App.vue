<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            V-Team
          </v-list-item-title>
          <v-list-item-subtitle>
            Opcje
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          v-if="item.role.includes(currentRole)"
          link
        >

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-list-item v-if="currentRole" @click="logOut">
        <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Wyloguj</v-list-item-title>
        </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>V-Team</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({ drawer: null,
    items: [
      { title: 'Spotkania', icon: 'mdi-volleyball' , to:'/games', role:'ROLE_ADMIN' },
      { title: 'Moje spotkania', icon: 'mdi-account-box' , to:'/userGames', role:['ROLE_USER' , 'ROLE_ADMIN']},
      { title: 'Uczestnicy', icon: 'mdi-account-group', to:'/users', role:['ROLE_USER' , 'ROLE_ADMIN']},
      { title: 'Ranking', icon: 'mdi-format-list-numbered', to:'/ranking', role:['ROLE_USER' , 'ROLE_ADMIN']},
      { title: 'Prośby o dołączenie', icon: 'mdi-hand-back-left', to:'/request', role:'ROLE_ADMIN'  },
      { title: 'Uczestnicy', icon: 'mdi-account-group', to:'/admin', role:'ROLE_HEAD_ADMIN'  },
      { title: 'Ustawienia', icon: 'mdi-cog', to:'/settings', role:'ROLE_USER' },
    ]
  }),
}
</script>

<script setup>
import Cookies from "universal-cookie/es6";
import router from "@/router";
const cookies = new Cookies()
const currentRole = cookies.get("role")


function logOut(){
  cookies.remove("token")
  cookies.remove("role")
  cookies.remove("email")
  router.push("/sign")
  window.location.reload();
}
</script>
