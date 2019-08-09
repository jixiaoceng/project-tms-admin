import router from '@/router'
import store from '@/store'
import { setStorage } from '@/utils/handleStorage'

const tabs = {
  state: {
    menuMap: null,
    menuIndexObj: null,
    moduleMenuIndex: 0,
    firstMenuIndex: 0,
    secondMenuIndex: null,
    currentPath: '/'
  },
  mutations: {
    // 设置当前路径
    SET_CURRENT_PATH(state, path) {
      setStorage('currentPath', path)
      state.currentPath = path
    },
    // 设置菜单数组
    SET_MENU_MAP(state, map) {
      state.menuMap = map
    },
    // 设置menuIndex
    SET_MENU_INDEX_OBJ(state, obj) {
      state.menuIndexObj = obj
    },
    // 设置当前页面的所在模块
    SET_MODULE_MENU_INDEX: (state, index) => {
      const menuMap = state.menuMap
      let secondMenuIndex = null
      if (menuMap[index] && menuMap[index].children[0] && menuMap[index].children[0].children[0]) {
        secondMenuIndex = menuMap[index].children[0].children[0]
      } else {
        secondMenuIndex = { url: '/page/401' }
      }
      // const secondMenuIndex = state.menuMap[index].children[0].children[0].children[0]

      state.moduleMenuIndex = index
      state.secondMenuIndex = secondMenuIndex
      state.currentPath = secondMenuIndex.url
      setStorage('moduleMenuIndex', index)
      setStorage('firstMenuIndex', 0)
      setStorage('secondMenuIndex', JSON.stringify(secondMenuIndex))
      setStorage('currentPath', secondMenuIndex.url)
      goRouter(secondMenuIndex.url)
    },
    // 设置当前页面的所在一级菜单
    SET_FIRST_MENU_INDEX: (state, index) => {
      const menuMap = state.menuMap
      let secondMenuIndex = null

      if (menuMap[state.moduleMenuIndex].children[index] && menuMap[state.moduleMenuIndex].children[index].children[0]) {
        secondMenuIndex = menuMap[state.moduleMenuIndex].children[index].children[0]
      } else {
        secondMenuIndex = { url: '/page/401' }
      }

      // const secondMenuIndex = menuMap[state.moduleMenuIndex].children[index].children[0].children[0]

      state.firstMenuIndex = index
      state.secondMenuIndex = secondMenuIndex
      state.currentPath = secondMenuIndex.url
      setStorage('firstMenuIndex', index)
      setStorage('secondMenuIndex', JSON.stringify(secondMenuIndex))
      setStorage('currentPath', secondMenuIndex.url)
      goRouter(secondMenuIndex.url)
    },
    // 设置当前页面的所在二级菜单
    SET_SECOND_MENU_INDEX: (state, secondMenuIndex) => {
      state.secondMenuIndex = secondMenuIndex
      state.currentPath = secondMenuIndex.url
      setStorage('secondMenuIndex', JSON.stringify(secondMenuIndex))
      setStorage('currentPath', secondMenuIndex.url)
      goRouter(secondMenuIndex.url)
    },
    // 设置页面所在模块、所在一级菜单、所在二级菜单
    SET_MENU_INDEX(state, menuIndexArr) {
      state.moduleMenuIndex = menuIndexArr[0]
      state.secondMenuIndex = menuIndexArr[1]
      state.currentPath = menuIndexArr[2]
      setStorage('moduleMenuIndex', menuIndexArr[0])
      setStorage('secondMenuIndex', JSON.stringify(menuIndexArr[1]))
      setStorage('currentPath', menuIndexArr[2])
      if (store.getters.baseInfo.loginType === '1') {
        goRouter('/changePassword')
      } else {
        goRouter(menuIndexArr[2])
      }
    },
    // 设置页面所在模块、所在一级菜单、所在二级菜单
    SET_MENU_INDEX_NO(state, menuIndexArr) {
      state.moduleMenuIndex = menuIndexArr[0]
      state.secondMenuIndex = menuIndexArr[1]
      setStorage('moduleMenuIndex', menuIndexArr[0])
      setStorage('secondMenuIndex', JSON.stringify(menuIndexArr[1]))
    }
  }
}

function goRouter(path) {
  router.push({ path })
}

export default tabs
