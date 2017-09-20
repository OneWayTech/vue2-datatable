// mainly refers to https://github.com/eddyerburgh/avoriaz-ava-example
// also thanks to https://knpw.rs/blog/testing-vue-in-node/
require('babel-polyfill')
require('browser-env')()
require('localstorage-polyfill')

// eliminate verbose info in examples/src/_mockData/index.js
function noop() {}
['group', 'groupEnd', 'info', 'clear'].forEach(fn => {
  console[fn] = noop
})

global.$ = require('jquery')

global.Vue = require('vue')
Vue.config.silent = true
Vue.config.productionTip = false
Vue.use(require('../dist/min').default) // Vue.use(Datatable)

const hooks = require('require-extension-hooks')
// Setup vue files to be processed by `require-extension-hooks-vue`
hooks('vue').plugin('vue').push()
// Setup vue and js files to be processed by `require-extension-hooks-babel`
hooks(['vue', 'js']).plugin('babel').push()
