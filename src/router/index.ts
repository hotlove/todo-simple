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
        path: 'todo-list',
        name: 'todo-list',
        component: () => import('@/views/todo/TodoList.vue')
      },
      {
        path: 'note',
        name: 'note',
        component: () => import('@/views/note/Note.vue'),
        children: [
          {
            path: "notelist",
            name: "notelist",
            component: () => import('@/views/note/NoteList.vue')
          },
          {
            path: "notedetail/:id",
            name: "notedetail",
            component: () => import('@/views/note/NoteDetail.vue')
          }
        ]
      },
      {
        path: "meeting",
        name: "meeting",
        component: () => import('@/views/meeting/Meeting.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
