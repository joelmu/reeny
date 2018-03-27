import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import post from '@/components/shared/DetailPostPage'

import Authentication from '@/components/Authentication'
// import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/authentication',
      name: 'Authentication',
      component: Authentication
    }
  ]
})
