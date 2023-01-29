import Vue from 'vue'
import VueRouter from 'vue-router'
import GamesView from '../views/GamesView.vue'
import UsersView from '../views/UsersView.vue'
import HomeView from '../views/HomeView.vue'
import SignIn from "@/views/SignIn.vue";
import RankingView from "@/views/RankingView.vue";
import MyGamesView from "@/views/MyGamesView.vue";
import SettingsView from "@/views/SettingsView.vue";
import RequestsToJoinView from "@/views/RequestsToJoinView.vue";
import Cookies from "universal-cookie/es6";
import Admin from "@/components/Admin.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign',
    name: 'sign',
    component: SignIn,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true, roles: ['ROLE_BASIC', 'ROLE_USER', 'ROLE_ADMIN', "ROLE_HEAD_ADMIN"] }
  },
  {
    path: '/games',
    name: 'games',
    component: GamesView,
    meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
  },
    //Admin, User
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta: { requiresAuth: true, roles: ['ROLE_USER', 'ROLE_ADMIN'] }
  },
    //Admin, User
  {
    path: '/ranking',
    name: 'ranking',
    component: RankingView,
    meta: { requiresAuth: true, roles: ['ROLE_USER', 'ROLE_ADMIN'] }
  },
  {
    path: '/request',
    name: 'request',
    component: RequestsToJoinView,
    meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
  },
    //User
  {
    path: '/userGames',
    name: 'userGames',
    component: MyGamesView,
    meta: { requiresAuth: true, roles: ['ROLE_USER', 'ROLE_ADMIN'] }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: { requiresAuth: true, roles: ['ROLE_USER'] }
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAuth: true, roles: ['ROLE_HEAD_ADMIN'] }
  }
]


const router =  new VueRouter({
  routes: routes,
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  const cookies = new Cookies()
  //const token = cookies.get("token")
  const role = cookies.get("role")
  console.log(role)
  if(to.meta.requiresAuth  && !to.meta.roles.includes(role) ){
    next({
      name: 'sign'
    })
  }else{
    next()
  }
})


export default router
