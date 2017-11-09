import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import Blog from '@/components/Blog'
import MainContent from '@/components/MainContent'
import ArticleDetail from '@/components/ArticleDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/',
      component: Blog,
      children: [
        {
          path: '',
          component: MainContent
        },
        {
          path: ':id',
          component: ArticleDetail,
          props: true
        }
      ]
    }
  ]
})
