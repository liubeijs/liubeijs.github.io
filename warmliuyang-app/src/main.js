import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import MasonryWall from '@yeger/vue-masonry-wall'

import './styles/tokens.css'
import './styles/base.css'
import 'vant/lib/index.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(MasonryWall)
app.mount('#app')