import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Navbar from '@/components/Navbar'
import VeeValidate from 'vee-validate'
import '@/assets/bootstrap/css/bootstrap.min.css'
import '@/assets/bootstrap/js/jquery.min.js'
import '@/assets/bootstrap/js/bootstrap.min.js'

Vue.use(Router)
Vue.use(VeeValidate)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Navbar
    }
  ]
})
