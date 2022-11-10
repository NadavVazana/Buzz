import { createRouter, createWebHashHistory } from 'vue-router'
import buzzApp from '../views/buzz-app.cmp.vue'


const routerOptions = {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/',
            component: ()=> import('../views/buzz-app.cmp.vue')
        },

        {
            path:'/login',
            component:()=>import ('../views/login.cmp.vue')
        },
        {
            path:'/signup',
            component:()=>import('../views/signup.cmp.vue')
        },
        {
            path:'/inbox/:id',
            component:()=> import ('../views/inbox.vue')
        }

    ]
  }
const router = createRouter(routerOptions)
  
  export default router