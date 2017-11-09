<template lang="html">
  <div class="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Signup</h4>
        </div>
        <form class="form-group">
          <div class="modal-body">
            <label for="exampleInputUsernme">Username</label>
            <input v-model="frmSignup.username" type="text" class="form-control" placeholder="Username">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="frmSignup.password" type="password" class="form-control" placeholder="Password">
            <label for="exampleInputPassword1">Email</label>
            <input v-model="frmSignup.email" type="email" class="form-control" placeholder="Email">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            <button @click="signup(frmSignup)" type="button" class="btn btn-primary" data-dismiss="modal">Signup</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import {mapActions} from 'vuex'
export default {
  props: ['frmSignup'],
  methods: {
    signup (dataUser) {
      this.$emit('emitSignup', dataUser)
    }
  }
}
</script>

<style lang="css">
</style>
