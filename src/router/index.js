import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from "@/utils/utils.js";
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: () => import('../views/pc/App.vue'),
  children: [{
    path: '/',
    component: () => import('@/components/pc/Home.vue')
  }, {
    path: 'setting',
    component: () => import('@/components/pc/Setting.vue')
  }, {
    path: 'news',
    component: () => import('@/components/pc/News.vue')
  }, {
    path: 'sports',
    component: () => import('@/components/pc/Sports.vue')
  }]
},
{
  path: '/m',
  component: () => import('../views/mobie/App.vue'),
  children: [{
    path: '/',
    component: () => import('@/components/mobie/Home')
  }, {
    path: 'sports',
    component: () => import('@/components/mobie/Sports'),
  }, {
    path: 'dashboard',
    component: () => import('@/components/mobie/Dashboard'),
  }, {
    path: 'setting',
    component: () => import('@/components/mobie/Setting'),
  }, {
    path: 'news',
    component: () => import('@/components/mobie/News'),
  }, {
    path: 'verify',
    component: () => import('@/components/verify/Home'),
  }]
}, {
  path: '/login',
  component: () => import('../views/login/App.vue')
}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (utils.getCookie('token')) {
    if (to.path == '/login') {
      next({
        path: from.fullPath
      })
    } else {
      if (utils.os().isMobie) {
        if (to.path == "/m" || to.path == "/m/" || to.path.indexOf("/m/") != -1) {
          next();
        } else {
          next({ path: '/m' + to.fullPath });
        }
      } else {
        if (to.path != "/m" && to.path.indexOf("/m/") == -1) {
          next();
        } else {
          next({ path: to.fullPath.slice(2) });
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }

  }


});

export default router