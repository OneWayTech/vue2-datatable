import Vue from 'vue'
import App from './App.vue'
import Datatable from '../../'
// import locale from '../../locales/zh-cn'

Vue.use(Datatable)
// Vue.use(Datatable, { locale })

new Vue({
  el: '#app',
  render: h => h(App)
})
