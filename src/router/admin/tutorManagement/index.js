import Layout from '@/views/layout/Layout'
const routerMap = [
  {
    path: 'searchTeacher',
    component: () => import('@/views/tutorManagement/searchTeacher'),
    name: 'searchTeacher',
    meta: { title: '查找老师' }
  }
]
const tutorManagement = {
  path: '/tutorManagement',
  component: Layout,
  children: routerMap
}
export default tutorManagement
