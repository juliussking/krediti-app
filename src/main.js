import './assets/main.css'
import { useMeStore } from './stores/auth/me'

import { createApp } from 'vue'
import pinia from '@/plugins/pinia.js'
import App from './App.vue'
import router from './router'
import '@/plugins/axios.js'
import '@/plugins/yup.js'



const app = createApp(App)
.use(pinia)

const meStore = useMeStore();

meStore.getMe()
.finally(() => {
    app
    .use(router)
    .mount('#app')

})
