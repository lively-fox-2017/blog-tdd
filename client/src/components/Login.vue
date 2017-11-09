<template lang="html">
  <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Login</h4>
        </div>
        <form class="form-group">
          <div class="modal-body">
            <label for="exampleInputUsernme">Username</label>
            <input v-model="frmLogin.username" type="text" class="form-control" placeholder="Username">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="frmLogin.password" type="password" class="form-control" placeholder="Password">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            <button @click="login(frmLogin)" type="button" class="btn btn-primary" data-dismiss="modal">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import {mapActions} from 'vuex'
export default {
  props: ['frmLogin'],
  methods: {
    login (dataUser) {
      this.$emit('emitLogin', dataUser)
    }
  }
}
</script>

<style lang="css">
  /*.container[login]{
    width: 30%;
  }*/
</style>
