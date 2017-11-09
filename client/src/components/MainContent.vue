<template id="">
  <div class="col-md-9">
    <!--conten  -->
    <!-- <div class="panel panel-default">
      <div class="panel-heading">Panel heading</div>
      <div class="panel-body">
        Panel content
      </div>
    </div> -->
    <div class="list-group">
      <article-summary
      v-for="(article, index) in articles"
      :article="article"
      :key="index">
    </article-summary>
    </div>
  </div>
</template>

<script>
  import ArticleSummary from '@/components/ArticleSummary'
  export default{
    props: ['articles'],
    components: {
      ArticleSummary
    }
  }
</script>
