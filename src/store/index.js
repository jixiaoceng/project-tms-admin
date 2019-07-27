import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tabs from './modules/tabs'
import lingoUI from './modules/lingoUI'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    lingoUI,
    user,
    tagsView,
    tabs
  },
  getters
})

export default store
