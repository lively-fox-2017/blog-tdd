<template>
<nav class="navbar navbar-default">
  <div class="container-fluid">

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><router-link to="/blog" >Blog</router-link></li>
        <li><router-link to="/">Home</router-link></li>
      </ul>      
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Blog Ahay</a></li>
      </ul>
    </div>
  </div>
</nav>

</template>
<script>
  export default {
    props: ['news']
  }
</script>
