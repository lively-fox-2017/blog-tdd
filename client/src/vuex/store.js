import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

const state = {
  // users: [],
  user: [],
  articles: [],
  article: {}
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setArticles (state, payload) {
    state.articles = payload
  },
  setArticle (state, payload) {
    state.article = payload
  },
  addArticle (state, payload) {
    state.articles.push(payload)
  },
  removeArticle (state, payload) {
    let idx = state.articles.findIndex((article) => article._id === payload._id)
    state.articles.splice(idx, 1)
  },
  updateArticle (state, payload) {
    // console.log('ini idnya', payload._id)
    let idx = state.articles.findIndex((article) => article._id === payload._id)
    state.articles.splice(idx, 1)
    state.articles.push(payload)
  }
}

const actions = {
  addUser ({ commit }, newUser) {
    // console.log('masusussu')
    http.post('users/signup', newUser)
    .then(({ data }) => {
      alert('Signup Sukeses')
    })
    .catch(err => {
      console.log(err)
    })
  },
  signIn ({ commit }, login) {
    http.post('users/signin', login)
    .then(({ data }) => {
      localStorage.setItem('Blog-Token', data.token)
      alert(data.message)
      let decoded = jwtDecode(data.token)
      commit('setUser', decoded)
    })
    .catch(err => {
      alert('user/password anda salah')
      console.log(err)
    })
  },
  getUserActive ({ commit }) {
    // console.log('masukkkkasdfasd', localStorage.getItem('Blog-Token'))
    if (localStorage.getItem('Blog-Token') != null) {
      // console.log('masukkkk')
      let decoded = jwtDecode(localStorage.getItem('Blog-Token'))
      commit('setUser', decoded)
    }
  },
  signOut ({ commit }, login) {
    // console.log('ini login======', user)
    http.post('/users/signin', login)
    .then(({ data }) => {
      localStorage.setItem('Blog-Token', data.token)
      alert(data.message)
      // commit('setUser', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getArticles ({ commit }) {
    http.get('/articles')
    .then(({ data }) => {
      // console.log(data.data)
      commit('setArticles', data.data)
      // console.log('cek data', this.state.articles)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  getDetailArticle ({ commit }, id) {
    // console.log('masuk sini')
    http.get('/articles/' + id)
    .then(({data}) => {
      // console.log('adfasdfasd', data.data)
      commit('setArticle', data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  addArticle ({ commit }, data) {
    // console.log('masukk', data)
    let decoded = jwtDecode(localStorage.getItem('Blog-Token'))
    http.post('/articles/', { title: data.title, content: data.content, imageUrl: data.imageUrl, author: decoded.userId })
    .then(({data}) => {
      // console.log('adfasdfasd', data.data)
      commit('addArticle', data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  removeArticle ({ commit }, id) {
    http.delete('/articles/' + id)
    .then(({data}) => {
      // console.log('adfasdfasd', data.data)
      commit('removeArticle', data.data)
      alert(data.message)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  updateArticle ({ commit }, dataArticle) {
    console.log('masukkkk ', dataArticle)
    http.put('/articles/' + dataArticle._id, dataArticle)
    .then(({ data }) => {
      // console.log('adfasdfasd', data)
      commit('updateArticle', dataArticle)
      alert(data.message)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
