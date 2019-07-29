import Vue from 'vue'
import App from './App'
import router from './router/'
import store from './store/'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
Vue.use(Element, { size: 'small' })

import '@/styles/index.scss' // global css
Vue.config.productionTip = false

// 自定义插件
import Plugin from './plugin'
Vue.use(Plugin)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
