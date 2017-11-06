import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import bignews from '@/components/bignews'
import blog from '@/components/blog'
import titlenews from '@/components/titlenews'
// import Posts from '@/components/Posts'
// import NewPost from '@/components/NewPost'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    // {
    //   path: '/posts',
    //   name: 'Posts',
    //   component: Posts
    // },
    // {
    //   path: '/posts/new',
    //   name: 'NewPost',
    //   component: NewPost
    // },
    {
      path: '/blog',
      component: blog,
      children: [
        {
          path: '',
          component: bignews,
          props: true
        },
        {
          path: ':id',
          component: titlenews,
          props: true
        }
      ]
    }
  ]
})
