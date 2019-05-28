import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/goods.vue'
import ratings from 'components/ratings/ratings.vue'
import sellers from 'components/sellers/sellers.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods',
      component: goods
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/sellers',
      component: sellers
    }
  ]
})
