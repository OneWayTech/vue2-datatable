import Datatable from './lib/index.vue'

export default {
  install (Vue, options = {}) {
    const { locale = {} } = options
    
    // this might be the simplest i18n solution
    Vue.prototype.$i18n = srcTxt => locale[srcTxt] || srcTxt
    
    Vue.component('Datatable', Datatable)
  }
}
