import Vue from 'vue'
import VueRouter from 'vue-router'
import GamesView from '../views/GamesView.vue'
import UsersView from '../views/UsersView.vue'
import HomeView from '../views/HomeView.vue'
import LogIn from "@/components/LogIn.vue"
import Registration from "@/components/Registration.vue"
import SignIn from "@/SignIn.vue";
//import RankingView from '../views/RankingView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/games',
    name: 'games',
    component: GamesView 
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },
  {
    path: '/ranking',
    name: 'ranking',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RankingView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
