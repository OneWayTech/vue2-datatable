import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'

/* *** Use `umd` version *** */
// import '../../dist/min.css'
// import Datatable from '../../dist/min.js'

/* *** Use `module` version *** */
import Datatable from '../../'

/* *** i18n example *** */
// import locale from '../../locale/zh-cn'
// Vue.use(Datatable, { locale })

Vue.use(Datatable)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
