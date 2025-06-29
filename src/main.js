import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Initialize AOS
AOS.init()

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')