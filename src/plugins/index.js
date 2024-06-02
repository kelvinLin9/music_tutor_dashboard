import '../style/all.scss' // Import our custom CSS
import * as bootstrap from 'bootstrap' // Import all of Bootstrap's JS
import 'bootstrap-icons/font/bootstrap-icons.css';

import router from '../router'
import axios from "axios"
import { createPinia } from "pinia"
const pinia = createPinia()

import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});


configure({
  generateMessage: localize({ zh_TW: zh_TW }),
  validateOnInput: true,
});
setLocale('zh_TW');


export function registerPlugins (app) {
  app.config.globalProperties.$axios = axios;
  app
    .use(pinia)
    .use(router)
    .component('VField', Field)
    .component('VForm', Form)
    .component('ErrorMessage', ErrorMessage)
}
