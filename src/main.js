import './assets/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/routes/router'
import store from '@/store'
import comnonents from '@/components/UI'

const app = createApp(App)

comnonents.forEach((component) => {
  app.component(component.name, component)
})

app.use(store).use(router).mount('#app')
