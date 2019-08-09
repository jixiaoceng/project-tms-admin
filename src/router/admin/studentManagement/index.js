import Layout from '@/views/layout/Layout'
const routerMap = [
  {
    path: 'newStudentList',
    component: () => import('@/views/studentManagement/newStudentList'),
    name: 'newStudentList',
    meta: { title: '新用户列表' }
  },
  {
    path: 'oldStudentList',
    component: () => import('@/views/studentManagement/oldStudentList'),
    name: 'oldStudentList',
    meta: { title: '新用户列表' }
  },
  {
    path: 'studentInfo',
    component: () => import('@/views/studentManagement/subPage/studentInfo'),
    name: 'studentInfo',
    meta: { title: '学生档案' }
  }
]
const studentManagement = {
  path: '/studentManagement',
  component: Layout,
  children: routerMap
}
export default studentManagement
