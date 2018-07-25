import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home'
import Pagina from 'pages/Pagina'
import Info from 'pages/Info'

Vue.use(Router)

const routes = [
  {
    path: '*',
    component: Home
  },
  {
    path: '/pagina',
    component: Pagina
  },
  {
    path: '/info',
    component: Info
  }
]

export default new Router({
  routes
})
