<template>
  <div class="col-md-9">
    <div class="berita" v-for="berita in news">
      <img :src=" berita.image" class="img-responsive"alt="">
      <h3>{{ berita.title }}</h3>
      <p>{{berita.content}}</p>
    </div>
  </div>
</div>
</template>
<script>
import titlenews from '@/components/titlenews'
export default{
  props: ['news'],
  components: {
    titlenews
  }
}
</script>
<style>
#berita{
 border:2px, 
}
p{
  text-align: center justify;
}
</style>
