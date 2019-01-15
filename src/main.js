import Vue from 'vue'
import App from './App.vue'
import * as Utils from '../lib/index'

Vue.config.productionTip = false

Vue.prototype.$utils = Utils

new Vue({
  render: h => h(App),
}).$mount('#app')
