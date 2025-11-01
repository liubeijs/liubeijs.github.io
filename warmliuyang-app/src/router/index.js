import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Discover from '../pages/Discover.vue'
import Capture from '../pages/Capture.vue'
import About from '../pages/About.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/discover', name: 'Discover', component: Discover },
  { path: '/capture', name: 'Capture', component: Capture },
  { path: '/about', name: 'About', component: About }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router