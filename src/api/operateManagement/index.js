import GetData from '@/utils/axios.js'

const { $get, $post, $put } = new GetData()

/**
 * 成团明细
 * @param {Object} params 参数对象，包括：
 *        student_name         {String} 学生名称
 */
export const managerGroupActivity = function(params) {
  return $get('/manager/group_activity/', params)
}

/**
 * 创建团
 * @param {Object} params 参数对象，包括：
 *
 */
export const managerGroupActivityAdd = function() {
  return $post('/manager/group_activity/add/')
}

/**
 * 团成员
 * @param {Object} params 参数对象，包括：
 *     group_activity_id         {int}  团id
 */
export const managerGroupMember = function(group_activity_id) {
  return $get('/manager/group_activity/' + group_activity_id + '/member/')
}

/**
 * 发放奖励
 * @param {Object} params 参数对象，包括：
 *     group_activity_id         {int}  团id
 */
export const managerGroupProvideReward = function(group_activity_id) {
  return $put('/manager/group_activity/' + group_activity_id + '/provide_reward/')
}

