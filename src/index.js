import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
import { rutas } from './rutas.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Vue2Filters from 'vue2-filters'

import VueMoment from 'vue-moment'

import 'assets/css/app.styl'
 
Vue.use(require('vue-moment'));

var options = {
    persist: true
}

Vue.prototype.$http = axios;

Vue.use(ElementUI, { locale });
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueSession, options);
Vue.use(Vue2Filters)

//Vue.prototype.$http = axios;
//axios.defaults.baseURL = 'http://localhost/sample2/';


const enrutador = new VueRouter({
	routes : rutas/*,
	mode : 'history'*/
})

/*axios.defaults.baseURL = 'http://localhost/'; // Базовый URL адрес */

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//axios.defaults.headers.common['authorization'] = '*';


new Vue({
  el: '#app',
  router : enrutador,
  render: h => h(App)
})

