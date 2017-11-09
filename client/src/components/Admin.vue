<template>
  <div class="">
    <form @submit.prevent="submitData(frmArticle)">
      <fieldset>
        <legend v-if="isEdit">Edit News</legend>
        <legend v-else>Add News</legend>
        <div class="form-group">
          <label>Title</label>
          <input v-model="frmArticle.title" type="text" class="form-control" placeholder="Enter title">
        </div>
        <div class="form-group">
          <label>Content</label>
          <textarea v-model="frmArticle.content" class="form-control" rows="10" placeholder="write your content"></textarea>
        </div>
        <div class="form-group">
          <label>Image Url</label>
          <input v-model="frmArticle.imageUrl" type="text" class="form-control" placeholder="Image Url">
        </div>
      </fieldset>
      <button v-if="isEdit" type="submit" class="btn btn-primary">Edit Data</button>
      <button v-else type="submit" class="btn btn-primary">Add Data</button>
      <button @click="batal" type="button" class="btn btn-primary">Cancel</button>
    </form><br><br>
    <table class="table">
      <thead>
        <th></th>
        <th>Title</th>
        <th>Content</th>
        <th>Author</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="(article, index) in articles">
          <td>
            <img v-bind:src="article.imageUrl" alt="" style="width:100px">
          </td>
          <td>{{ article.title }}</td>
          <td>{{ article.content.substring(0,150) }} ...</td>
          <td>{{ article.author }}</td>
          <td>
            <a href="#" @click="editData({_id:article._id, title:article.title,content:article.content,imageUrl:article.imageUrl})">Edit</a>|
            <a href="#" @click="removeArticle(article._id)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  export default {
    components: {
    },
    data () {
      return {
        isEdit: false,
        frmArticle: {
          _id: '',
          title: '',
          content: '',
          imageUrl: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'getArticles',
        'addArticle',
        'removeArticle',
        'updateArticle'
      ]),
      editData (data) {
        // console.log('masuk ', this.frmArticle)
        this.frmArticle._id = data._id
        this.frmArticle.title = data.title
        this.frmArticle.content = data.content
        this.frmArticle.imageUrl = data.imageUrl
        this.isEdit = true
      },
      batal () {
        this.frmArticle._id = ''
        this.frmArticle.title = ''
        this.frmArticle.content = ''
        this.frmArticle.imageUrl = ''
        this.isEdit = false
      },
      submitData (data) {
        // console.log('edit nggga', this.isEdit, 'data', this.frmArticle)
        if (this.isEdit) {
          this.updateArticle(data)
          // this.isEdit = false
          // this.batal()
        } else {
          this.addArticle(data)
          this.batal()
        }
      }
    },
    computed: {
      ...mapState([
        'articles'
      ])
    },
    created () {
      this.getArticles()
    }
  }
</script>
