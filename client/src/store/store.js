import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VeeValidate from 'vee-validate'

Vue.use(Vuex)
Vue.use(VeeValidate)

const http = axios.create({
  baseURL: 'http://localhost:3123'
})

const store = new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    setUser: function(state, payload){
      state.users = payload
    },
    saveUser: function(state, payload){
      this.$validator.validateAll()
      .then(result => {
        console.log(result)
      })
      // http.post('/signup', payload)
      // .then(data => {
      //   console.log(data)
      // })
    }
  },
  actions: {
    getUser: function({ commit }){
      http.get('/signup')
      .then(({data}) => {
        commit('setUser', data)
      })
    },

  }
})

export default store
