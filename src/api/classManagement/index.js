import GetData from '@/utils/axios.js'

const { $get, $post, $put } = new GetData()

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
  return $get('/classroom/', params)
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
  return $get('/student/', params)
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
  return $get('/oldstudent/', params)
}

/**
 * 学生详情注册
 * @param {Number} id 学生
 */
export const managerStudentDetails = function(id) {
  return $get('/student/' + id + '/details/')
}

/**
 * 学生详情 扩展
 * @param {Number} id 学生
 */
export const managerExtstudent = function(id) {
  return $get('/extstudent/' + id)
}

/**
 * 学生详情 扩展添加
 * @param {Object} params 参数对象
 */
export const managerExtstudentAdd = function(params) {
  return $post('/extstudent/add/', params)
}

/**
 * 学生详情 是否允许小班课
 * @param {Object} params 参数对象
 */
export const studentAllowSmallclass = function(student_id, allow_smallclass) {
  return $put('/student/' + student_id + '/set_allow_smallclass/', { allow_smallclass })
}

/**
 * 学生详情 是否只上小班课
 * @param {Object} params 参数对象
 */
export const studentOnlySmallclass = function(student_id, only_smallclass) {
  return $put('/student/' + student_id + '/set_only_smallclass/', { only_smallclass })
}

/**
 * 学生详情 上课进度
 * @param {Number} id 学生
 */
export const managerStudentCourse = function(id) {
  return $get('/student/' + id + '/course_info/')
}

/**
 * 学生详情 备注
 * @param {Object} params 参数对象
 */
export const getRemarkstudent = function(params) {
  return $get('/remarkstudent/', params)
}

/**
 * 学生详情 备注添加
 * @param {Object} params 参数对象
 */
export const postRemarkstudent = function(params) {
  return $post('/remarkstudent/', params)
}

/**
 * 课堂转换
 * @param {Number} virtualclass_id 教室id
 */
export const virtualclassRevert = function(virtualclass_id) {
  return $get('/classroom/' + virtualclass_id + '/revert/')
}

/**
 * 课堂转换
 * @param {Number} virtualclass_id 教室id
 */
export const virtualclassMonitor = function(virtualclass_id) {
  return $get('/classroom/' + virtualclass_id + '/monitor/')
}

/**
 * 课堂回放
 * @param {Number} virtualclass_id 教室id
 */
export const virtualclassPlayback = function(virtualclass_id) {
  return $get('/classroom/' + virtualclass_id + '/course_playback/')
}

/**
 * 老师评语学生反馈
 * @param {Number} virtualclass_id 教室id
 * @param {Number} target Tutor获得的是学生反馈， Student获得的是老师评语
 */
export const virtualclassComment = function(virtualclass_id, target) {
  return $get('/classroom/' + virtualclass_id + '/comment/?target=' + target)
}

/**
 * 角色学管和课程顾问列表
 * @param {String} role 角色 course_adviser  课程顾问，learn_manager   学管老师
 */
export const managerUser = function(role) {
  return $get('/user/userlist/', { role })
}

/**
 * 分配课程顾问
 * @param {Object} params 参数对象
 *        student_ids         {String} 学生id
 *        course_adviser_id   {String} 课程顾问id
 */
export const distributAdviser = function(params) {
  return $post('/student/add_advisers/', params)
}

/**
 * 重新分配课程顾问
 * @param {Number} student_id 学生id
 * @param {Number} course_adviser_id 课程顾问id
 */
export const changeAdviser = function(student_id, course_adviser_id) {
  return $put('/student/' + student_id + '/change_adviser/', { course_adviser_id })
}

/**
 * 分配学管老师
 * @param {Object} params 参数对象
 *        student_ids        {String} 学生id
 *        learn_manager_id   {String} 学管老师id
 */
export const distributLearnmanager = function(params) {
  return $post('/oldstudent/add_learnmanagers/', params)
}

/**
 * 重新分配学管老师
 * @param {Number} student_id 学生id
 * @param {Number} learn_manager_id 学管老师id
 */
export const changeLearnmanager = function(student_id, learn_manager_id) {
  return $put('/oldstudent/' + student_id + '/change_learnmanager/', { learn_manager_id })
}

/**
 * 异常处理
 * @param {Number} virtualclass_id 课堂id
 */
export const virtualclassException = function(virtualclass_id) {
  return $get('/classroom/' + virtualclass_id + '/virtualclass_exception/')
}

/**
 * 提交异常审核结果
 * @param {Number} virtualclass_id 课堂id
 */
export const checkExceptionPut = function(virtualclass_id, param) {
  return $put('/classroom/' + virtualclass_id + '/check_exception/', param)
}

/**
 * 已上课堂发放课时费
 * @param {Number} virtualclass_id 课堂id
 */
export const virtualclassCost = function(virtualclass_id) {
  return $put('/classroom/' + virtualclass_id + '/provide_cost/')
}

/**
 * 设置学生等级
 * @param {Number} student_id 学生id
 */
export const setStudentLesson = function(student_id, params) {
  return $put('/student/' + student_id + '/set_student_lesson/', params)
}
