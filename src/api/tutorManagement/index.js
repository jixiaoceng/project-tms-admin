import GetData from '@/utils/axios.js'
const { $get } = new GetData()
/**
 * 老师搜索
 * @param {Object} params 参数对象，包括：
 *        programme              {String} 版本
 *        course_level           {String} 级别
 *        class_type             {String} 班型
 *        date_day               {String} 日期
 *        times                  {String} 时间
 */
export const searchTeacher = function(params) {
  return $get('/manager/filter_teacher/', params)
}
