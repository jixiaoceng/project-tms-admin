import GetData from '@/utils/axios.js'
const { $get } = new GetData()
export const searchTeacher = function(params) {
    return $get('/manager/filter_teacher/' )
  }