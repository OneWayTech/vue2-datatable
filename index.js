module.exports = {
  install: function (Vue, options) {
    var locale = options && options.locale || {};
    
    // this might be the simplest i18n solution
    Vue.prototype.$i18nForDatatable = function (srcTxt) {
      return locale[srcTxt] || srcTxt;
    };

    Vue.component('Datatable', require('./lib/index.vue'));
  }
};
