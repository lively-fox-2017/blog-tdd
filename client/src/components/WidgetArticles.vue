<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      Lates Articles
    </div>
    <div class="panel-body">
      <div class="list-group">
        <router-link v-for="(article, index) in articles"
        :to="'/' + article._id" class="list-group-item" :key="index">
          {{ article.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['articles']
  }
</script>

<style scoped>
.panel-body {
  padding: 0;
}
.list-group {
  margin-bottom: 0;
}
.list-group-item {
  cursor: pointer;
}
</style>
