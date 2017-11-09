<template id="">
  <!-- nav -->
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Brand</a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li ><router-link to="/">Home<span class="sr-only">(current)</span></router-link></li>
          <li ><router-link to="/admin">Admin<span class="sr-only">(current)</span></router-link></li>
          <!-- <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li> -->
        </ul>
        <form class="navbar-form navbar-left" role="search">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
        <ul class="nav navbar-nav navbar-right">
          <li><Login :frmLogin=frmLogin @emitLogin="signIn"></Login></li>
          <li v-if="user.length==0"><a @click="setBlankForm" href="" data-toggle="modal" data-target="#login">Login</a></li>
          <li v-else><a @click="logout" href="">Logout</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><Signup :frmSignup=frmSignup @emitSignup="addUser"></Signup></li>
          <li v-if="user.length==0">
            <a @click="setBlankForm" :disabled="!user.length" href="" data-toggle="modal" data-target="#signup">Signup</a>
          </li>
          <li v-else>
            <a href="#">Username : {{ user.username }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- /nav -->
</template>

<script>
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import {mapState, mapActions} from 'vuex'
export default {
  components: {
    Login,
    Signup
  },
  data () {
    return {
      token: '',
      frmSignup: {
        username: '',
        password: '',
        email: '',
        imageUrl: ''
      },
      frmLogin: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'addUser',
      'signIn',
      'getUserActive'
    ]),
    logout () {
      // console.log('asdfasd')
      localStorage.removeItem('Blog-Token')
    },
    setBlankForm () {
      this.frmSignup.username = ''
      this.frmSignup.password = ''
      this.frmSignup.email = ''
      this.frmLogin.username = ''
      this.frmLogin.password = ''
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  mounted () {
    this.getUserActive()
  }
}
</script>
