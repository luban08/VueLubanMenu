import Vue from 'vue'
import App from './App.vue'

import NavMenu from './components'
Vue.use(NavMenu);

new Vue({
  el: '#app',
  render: h => h(App)
})
