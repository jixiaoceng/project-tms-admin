import Layout from '@/views/layout/Layout'
const routerMap = [
  {
    path: 'activityList',
    component: () => import('@/views/operateManagement/activityList'),
    name: 'activityList',
    meta: { title: '19双十一拼团' }
  }
]
const operateManagement = {
  path: '/operateManagement',
  component: Layout,
  children: routerMap
}
export default operateManagement
