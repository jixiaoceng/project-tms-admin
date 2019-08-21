import HandleToken from '@/utils/auth'
const handleToken = new HandleToken()
import { setStorage } from '@/utils/handleStorage'

const user = {
  state: {
    user: '',
    status: '',
    token: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    department: '无',
    userName: '',
    userId: '30000'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      handleToken.setToken(token)
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
      setStorage('userName', userName)
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        handleToken.removeToken()
        resolve()
      })
    }
  }
}

export default user
