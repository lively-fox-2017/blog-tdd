<template>
  <div class="list-group">
    <a href="#" class="list-group-item list-group-item-action active">
      <h4 class="list-group-item-heading">List group item heading</h4>
      <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    </a>
  </div>
  <!-- <div class="col-md-9">
    <div class="berita" v-for="berita in news">
      <img :src=" berita.image" class="img-responsive"alt="">
      <h3>{{ berita.title }}</h3>
      <p>{{berita.content}}</p>
    </div>
  </div>
</div> -->
</template>
<script>
import Listnews from '@/components/Listnews'
export default{
  props: ['news'],
  components: {
    Listnews
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
