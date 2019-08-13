import GetData from '@/utils/axios.js'

const { $get, $post } = new GetData()

// USER

/**
 * 登录
 * @param {Object} params 参数对象，包括：
 *        username          {String} 用户名
 *        password          {String} 密码
 */
export const login = function(params) {
  return $post('/manager/login/', params)
}

/**
 * 登录
 * @param {Object} params 参数对象，包括：
 *        username          {String} 用户名
 *        password          {String} 密码
 */
export const tokenAuth = function(params) {
  return $post('/manager/api-token-auth/', params)
}

/**
 * 获取账号信息
 * @param {Number} all
 */
export const userInfo = function() {
  return $get('/manager/menu/menu_list', { all: 1 })
}
