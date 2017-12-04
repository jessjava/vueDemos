import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path:"/",
      name:"login",
      component: resolve => require(['@/components/ms/pages/Login.vue'], resolve)
    },{
      redirect: '/18admin',
      path: '/login',
      name: 'mslayout',
      component: resolve => require(['@/components/ms/layout/MSLayout.vue'], resolve),
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: resolve => require(['@/components/ms/pages/Dashboard.vue'], resolve)
        },
        //xxx
        {
          path: '/18admin',
          name: '18admin',
          component: resolve => require(['@/components/ms/pages/18admin.vue'], resolve)
        },
        {
          path: '/ttt',
          name: 'ttt',
          component: resolve => require(['@/components/ms/pages/test.vue'], resolve)
        },
        {
          path: '/ttt/info',
          name: 'tttInfo',
          component: resolve => require(['@/components/ms/pages/test2.vue'], resolve)
        }

      ]
    }
  ]
})
