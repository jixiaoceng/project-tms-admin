import GetData from '@/utils/axios.js'

const { $get } = new GetData()

/**
 * 充值明细
 * @param {Object} params 参数对象，包括：
 *        month_query         {String} 日期
 *        start_time          {String} 时间段
 *        cms_user_id         {String} 学管或者课程顾问id
 */
export const managerRecharge = function(params) {
  return $get('/recharge/', params)
}

/**
 * 课消明细
 * @param {Object} params 参数对象，包括：
 *        month_query         {String} 日期
 *        start_time          {String} 时间段
 *        cms_user_id         {String} 学管或者课程顾问id
 */
export const attendClassInfo = function(params) {
  return $get('/attendclassinfo/', params)
}

/**
 * 统计新老学生课消
 * @param {Object} params 参数对象，包括：
 *        month_query         {String} 日期
 *        start_time          {String} 时间段
 *        cms_user_id         {String} 学管或者课程顾问id
 */
export const managerAdhoc = function(params) {
  return $get('/statistic/ad_hoc/', params)
}

/**
 * 统计新学生老学生充值
 * @param {Object} params 参数对象，包括：
 *        month_query         {String} 日期
 *        start_time          {String} 时间段
 *        cms_user_id         {String} 学管或者课程顾问id
 */
export const attendRecharge = function(params) {
  return $get('/statistic/recharge/', params)
}
