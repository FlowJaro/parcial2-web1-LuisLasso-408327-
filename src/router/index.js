import { createRouter, createWebHistory } from 'vue-router'
import MuroView from '../views/MuroView.vue'
import InfoView from '../views/InfoView.vue'
import PhotosView from '../views/PhotosView.vue'

const routes = [
  { path: '/', redirect: '/muro' },
  { path: '/muro', component: MuroView },
  { path: '/info', component: InfoView },
  { path: '/photos', component: PhotosView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
