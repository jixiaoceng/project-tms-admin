import Layout from '@/views/layout/Layout'
const routerMap = [
  {
    path: 'scheduling',
    component: () => import('@/views/classManagement/scheduling'),
    name: 'scheduling',
    meta: { title: '上课安排' }
  }
]
const classManagement = {
  path: '/classManagement',
  component: Layout,
  children: routerMap
}
export default classManagement
