
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// "vue-router": "^3.0.7",
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
    children: [
      {
        path: "/city",
        name: 'city',
        component: () => import('../views/home/City.vue')
      },
      {
        path:'/test1',
        name:"test1",
        component:()=>import('./../views/home/test1.vue')
      },
      {
        path:'/test2',
        name:"test2",
        component:()=>import('./../views/home/test2.vue')
      },
      {
        path:'/test4',
        name:"test4",
        component:()=>import('./../views/home/test4.vue')
      },
      {
        path:'/test3',
        name:"test3",
        component:()=>import('./../views/home/test3.vue')
      },
      {
        path:'/test5',
        name:"test5",
        component:()=>import('./../views/home/test5.vue')
      }
    ]
  },
  {
    path: "/shop",
    name: 'shop',
    component: () => import("../views/shop/Shop.vue"),
    children: [
      {
        path: '/details',
        name: 'details',
        component: () => import("../views/shop/Details.vue")
      },
      {
        path: "/search",
        name: "search",
        component: () => import("../views/shop/Search.vue"),
        children: [
          {
            path: '/details1',
            name: 'details1',
            component: () => import("../views/shop/Details.vue")
          },
        ]
      },
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import("../views/cart/Cart.vue"),
    meta: {
      requireAuth: true
      // 需要验证登录状态
    },
    children: [
      {
        path: '/order',
        name: 'order',
        component: () => import("../views/cart/Order1.vue")
      }
    ]
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import("../views/my/Mine.vue"),
    children: [
      {
        path: '/userinfo',
        name: "userinfo",
        component: () => import("../views/my/Userinfo.vue"),
        meta: {
          requireAuth: true
          // 需要验证登录状态
        },
        children: [
          {
            path: '/message',
            name: 'message',
            component: () => import("../views/my/Message.vue"),
            children: [
              {
                path: '/signature',
                name: 'signature',
                component: () => import("../views/my/Signature.vue")
              },
              {
                path: '/revisename',
                name: "revisename",
                // component: resolve => require(['@/views/my/Revisename.vue'],resolve)
                // component: r => require.ensure([], () => r(require('@/views/my/Revisename.vue')), 'demo') 
                component: () => import('../views/my/Revisename.vue')
              }
            ]
          },
          {
            path: '/addresses',
            name: 'addresses',
            component: () => import("../views/my/Addresses.vue"),
            children: [
              {
                path: '/address',
                name: 'address',
                component: () => import("../views/my/Address.vue")
              }
            ]
          }

        ]
      },
      {
        path: "/collect",
        name: "collect",
        component: () => import("../views/my/Collect.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/signature',
        name: 'signature',
        component: () => import("../views/my/Signature.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/orders/:orderid",
        name: 'orders',
        component: () => import("../views/my/Orders"),
        meta: {
          requireAuth: true
          // 需要验证登录状态
        }
      },
      {
        path: "/aftersale",
        name: "aftersale",
        component: () => import('../views/my/Aftersale.vue'),
        meta: {
          requireAuth: true
          // 需要验证登录状态
        }
      },
      {
        path: "/login",
        name: "login",
        component: () => import('../views/my/Login.vue')
      },
    ]
  },
  {
    path: "/try",
    name: 'try',
    components: {
      "big": () => import('../views/Try.vue')
    }
  }


]

const router = new VueRouter({
  routes
})

export default router
