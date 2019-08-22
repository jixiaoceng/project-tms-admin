import GetData from '@/utils/axios.js'

const { $get, $post } = new GetData()

/**
 * 上课安排
 * @param {Object} params 参数对象，包括：
 *        search_day          {String} 日期
 *        start_time          {String} 时间段
 *        class_type          {String} 班型
 *        student             {String} 课程类型
 *        teacher             {String} 教师
 *        programme_name      {String} 版本
 *        ordering            {String} 排序
 */
export const managerScheduler = function(params) {
  return $get('/manager/scheduler/', params)
}

/**
 * 新用户列表
 * @param {Object} params 参数对象，包括：
 *        source              {String} 来源
 *        student_status      {String} 状态
 *        programme_name      {String} 版本
 *        course_level        {String} 级别
 *        username            {String} 用户名
 *        ordering            {String} 排序
 */
export const managerStudent = function(params) {
  return $get('/manager/student/', params)
}

/**
 * 老用户列表
 * @param {Object} params 参数对象，包括：
 *        source              {String} 来源
 *        student_status      {String} 状态
 *        programme_name      {String} 版本
 *        course_level        {String} 级别
 *        username            {String} 用户名
 *        ordering            {String} 排序
 */
export const managerOldstudent = function(params) {
  return $get('/manager/oldstudent/', params)
}

/**
 * 学生详情注册
 * @param {Number} id 学生
 */
export const managerStudentDetails = function(id) {
  return $get('/manager/student/' + id + '/details/')
}

/**
 * 学生详情 扩展
 * @param {Number} id 学生
 */
export const managerExtstudent = function(id) {
  return $get('/manager/extstudent/' + id)
}

/**
 * 学生详情 扩展添加
 * @param {Object} params 参数对象
 */
export const managerExtstudentAdd = function(params) {
  return $post('/manager/extstudent/add/', params)
}

/**
 * 学生详情 上课进度
 * @param {Number} id 学生
 */
export const managerStudentCourse = function(id) {
  return $get('/manager/student/' + id + '/course_info/')
}

/**
 * 学生详情 备注
 * @param {Object} params 参数对象
 */
export const getRemarkstudent = function(params) {
  return $get('/manager/remarkstudent/', params)
}

/**
 * 学生详情 备注添加
 * @param {Object} params 参数对象
 */
export const postRemarkstudent = function(params) {
  return $post('/manager/remarkstudent/', params)
}

/**
 * 课堂转换
 * @param {Number} virtualclass_id 教室id
 */
export const virtualclassRevert = function(virtualclass_id) {
  return $get('/manager/virtualclass/' + virtualclass_id + '/revert/')
}

/**
 * 课堂转换
 * @param {Number} virtualclass_id 教室id
 */
export const virtualclassMonitor = function(virtualclass_id) {
  return $get('/manager/virtualclass/' + virtualclass_id + '/monitor/')
}

/**
 * 课堂回放
 * @param {Number} virtualclass_id 教室id
 */
export const virtualclassPlayback = function(virtualclass_id) {
  return $get('/manager/virtualclass/' + virtualclass_id + '/course_playback/')
}

/**
 * 老师评语学生反馈
 * @param {Number} virtualclass_id 教室id
 * @param {Number} target Tutor获得的是学生反馈， Student获得的是老师评语
 */
export const virtualclassComment = function(virtualclass_id, target) {
  return $get('/manager/virtualclass/' + virtualclass_id + '/comment/?target=' + target)
}

/**
 * 角色分配学管和课程顾问
 * @param {String} role 角色 course_adviser  课程顾问，learn_manager   学管老师
 */
export const managerUser = function(role) {
  return $get('/manager/user/', { role })
}
