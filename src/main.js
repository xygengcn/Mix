import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "@/assets/style/master.css";

Vue.config.productionTip = false


import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import ECharts from 'vue-echarts'
Vue.component('v-chart', ECharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')