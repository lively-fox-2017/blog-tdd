<template>
  <div class="container">
    <sidebar :articles="articles"></sidebar>
    <router-view :articles="articles"></router-view>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import Sidebar from '@/components/Sidebar'
  import MainContent from '@/components/MainContent'
  export default {
    components: {
      Sidebar,
      MainContent
    },
    data () {
      return {

      }
    },
    methods: {
      ...mapActions([
        'getArticles'
      ])
    },
    computed: {
      ...mapState([
        'articles'
      ])
    },
    created () {
      this.getArticles()
    }
  }
</script>
