

import Vue from 'vue'
import App from './App'
import api from '@/api/index.js'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()


