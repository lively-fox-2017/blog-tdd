<template>
  <div class="col-md-9">
    <div class="row">
      <h2>{{ article.title }}</h2>
    </div>
    <div class="row">
        <img v-bind:src="article.imageUrl" class="img-responsive">
    </div>
    <div class="row">
      <div id="article-content">
        <p>{{ article.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  export default {
    props: ['id'],
    data () {
      return {
      }
    },
    methods: {
      ...mapActions([
        'getDetailArticle'
      ])
    },
    computed: {
      ...mapState([
        'article'
      ])
    },
    mounted () {
      // console.log('this is id=', this.id)
      this.getDetailArticle(this.id)
      // console.log('asdfas', this.article)
    },
    watch: {
      id (newId) {
        // console.log('this is id==', this.id)
        this.getDetailArticle(newId)
        // console.log('asdfas', this.article)
      }
    }
  }
</script>

<style media="screen">
  h2 {
    margin-top: 0px;
  }
  #article-content {
    margin-top: 16px;
  }
</style>
