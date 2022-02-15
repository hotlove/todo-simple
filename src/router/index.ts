import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'todo/:date',
        name: 'todo',
        component: () => import('@/views/todo/Todo.vue')
      },
      {
        path: 'note',
        name: 'note',
        component: () => import('@/views/note/Note.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
