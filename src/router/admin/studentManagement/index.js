import Layout from '@/views/layout/Layout'
const routerMap = [
  {
    path: 'studentList',
    component: () => import('@/views/studentManagement/studentList'),
    name: 'studentList',
    meta: { title: '学生列表' }
  }
]
const studentManagement = {
  path: '/studentManagement',
  component: Layout,
  children: routerMap
}
export default studentManagement
