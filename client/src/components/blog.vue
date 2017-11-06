<template>
<div class="container">
  <div class="row">
    <!-- <titlenews></titlenews> -->
    <sidenav :news="news"></sidenav>
    <bignews :news="news"></bignews>
    </div>
  </div>
</template>
<script>
  import sidenav from '@/components/sidenav'
  import titlenews from '@/components/titlenews'
  import bignews from '@/components/bignews'
  export default{
    components: {
      sidenav,
      titlenews,
      bignews
    },
    data () {
      return {
        news: []
      }
    },
    methods: {
      getNews () {
        this.$http.get('/blog')
        .then(({data}) => {
          this.news = data
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    mounted () {
      this.getNews()
    }
  }
</script>