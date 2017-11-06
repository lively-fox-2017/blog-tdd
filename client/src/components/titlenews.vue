<template>
  <h4>{{news}}</h4>
</template>
<script>
  export default {
    data () {
      return {
        news: []
      }
    },
    methods: {
      getNews () {
        this.$http.get('/blog')
        .then(({data}) => {
          console.log(data)
          this.news = data
          // res.send(data)
        })
        .catch((err) => console.log(err))
      }
    },
    mounted () {
      this.getNews(this.id)
    }
  }
</script>
