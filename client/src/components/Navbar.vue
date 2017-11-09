<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Blog TDD</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li><a href="#">Link</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">Login</a></li>
          <li><a href="#" data-toggle="modal" data-target="#register">Register</a></li>
        </ul>
      </div><!-- /.navbar-collapse -->

      <!-- Register -->
      <div class="modal fade text-left" id="register" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <form @submit.prevent="activate(formRegister)">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Register</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" class="form-control" id="text" placeholder="Email" name="email" v-model="formRegister.email" v-validate="'required|email'" :class="{ 'input': true, 'is-danger': errors.has('email') }">
                  <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </div>
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" class="form-control" id="text" placeholder="Username" name="username" v-model="formRegister.user" v-validate="'required|min:6|regex:^[a-zA-Z0-9-_]+$'" :class="{ 'input': true, 'is-danger': errors.has('username') }">
                  <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" id="password" placeholder="Password" name="password" v-model="formRegister.pass" v-validate="'required|min:8'" :class="{ 'input': true, 'is-danger': errors.has('password') }">
                  <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Password</label>
                  <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" name="confirmPassword" v-validate="'required|confirmed:password'" :class="{ 'input': true, 'is-danger': errors.has('confirmPassword') }">
                  <span v-show="errors.has('confirmPassword')" class="help is-danger">{{ errors.first('confirmPassword') }}</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default{
    data: function(){
      return {
        formRegister: {
          email: '',
          user: '',
          pass: ''
        }
      }
    },
    computed: {
      ...mapState([
        'users'
      ])
    },
    methods: {
      ...mapActions([
        'getUser'
      ]),
      activate: function(dis){
        this.$store.commit('saveUser', dis)
      }
    },
    mounted: function(){
      this.getUser()
    }
  }
</script>

<style scoped>
  .navbar {
    border-radius: 0
  }

  .navbar-brand {
    color: white
  }

  span.help.is-danger {
    color: red;
    font-size: 13px;
  }
</style>
