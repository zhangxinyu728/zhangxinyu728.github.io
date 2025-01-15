import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login"
import Layout from "../views/layout.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:"/",
    name:"Layout",
    redirect:"/product",
    component:Layout,
    meta:{
      requiresAuth:true
    },
    children:[
      {
        path:"product",
        name:"Product",
        component:() => import("../views/product"),
        meta:{
          requiresAuth:true
        },
      },
      {
        path:"params",
        name:"Params",
        component:() => import("../views/params"),
        meta:{
          requiresAuth:true
        },
      },
      {
        path:"content",
        name:"Content",
        component:() => import("../views/content"),
        meta:{
          requiresAuth:true
        },
      }
    ]
  },
  {
    path:"/user",
    name:"User",
    component:() => import("../views/user"),
    meta:{
      requiresAuth:true
    },
  }
]

const router = new VueRouter({
  routes
})

export default router
