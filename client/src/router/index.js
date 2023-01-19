import Vue from 'vue'
import VueRouter from 'vue-router'
import GamesView from '../views/GamesView.vue'
import UsersView from '../views/UsersView.vue'
import HomeView from '../views/HomeView.vue'
import LogIn from "@/components/LogIn.vue"
import Registration from "@/components/Registration.vue"
import SignIn from "@/SignIn.vue";
import RankingView from "@/views/RankingView.vue";
import MyGamesView from "@/views/MyGamesView.vue";
import RequestsToJoinView from "@/views/RequestsToJoinView.vue";
//import RankingView from '../views/RankingView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true, roles: ['ROLE_BASIC', 'ROLE_USER', 'ROLE_ADMIN'] }
  },
  {
    path: '/games',
    name: 'games',
    component: GamesView 
  },
    //Admin, User
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },
    //Admin, User
  {
    path: '/ranking',
    name: 'ranking',
    component: RankingView
  },
  {
    path: '/request',
    name: 'request',
    component: RequestsToJoinView,
    meta: { requiresAuth: true, roles: ['ROLE_OWNER', 'ROLE_ADMIN'] }
  },
    //User
  {
    path: '/userGames',
    name: 'userGames',
    component: MyGamesView,
    meta: { requiresAuth: true, roles: ['ROLE_OWNER', 'ROLE_ADMIN'] }
  },
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to) => {
//   const cookies = cookies.get("token")
//   const role = ''
//
//
//   if( to.meta.requiresAuth  && !to.meta.roles.includes(role) ){
//     return{
//       path: "/sign"
//     }
//   }
// })


export default router
