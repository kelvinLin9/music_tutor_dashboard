import '../style/all.scss' // Import our custom CSS
import * as bootstrap from 'bootstrap' // Import all of Bootstrap's JS
import 'bootstrap-icons/font/bootstrap-icons.css';

import router from '../router'
import axios from "axios"
import { createPinia } from "pinia"
const pinia = createPinia()

export function registerPlugins (app) {
  app.config.globalProperties.$axios = axios;
  app
    .use(pinia)
    .use(router)
}
