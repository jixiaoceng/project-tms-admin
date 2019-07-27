/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getStorage } from '@/utils/handleStorage'
// // import { userInfo } from '@/api/base/'
// // import { logout } from '@/api/base'
// import errRouterMap from '@/router/base/error'
// import { formatMenuMap, getMenuIndex } from '@/utils/handleData'
import HandleToken from '@/utils/auth'
const handleToken = new HandleToken()

import baseRouterMap from './base/'
Vue.use(Router)
console.log(baseRouterMap)
const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: baseRouterMap
})

NProgress.configure({ showSpinner: false }) // 页面加载滚动条的设置


router.afterEach((to, from) => {
  store.commit('SET_CURRENT_PATH', to.fullPath)
  if (!to.meta.mustCache) {
    if (to.name !== null) {
      store.commit('DEL_VISITED_VIEWS', from)
    }
  }
  // 结束滚动条
  NProgress.done()
})

function resetStore () {
  // 重置公共状态
  const getters = store.getters
  if (getters.tableSelectArr.length !== 0) {
    store.commit('SET_TABLE_SELECT_ARR', [])
  }
  if (getters.pageTitle !== '') {
    store.commit('SET_PAGE_TITLE', '')
  }

  if (getters.tableSelectArr.length !== 0) {
    store.commit('SET_TABLE_SELECT_ARR', [])
  }
}

export default router