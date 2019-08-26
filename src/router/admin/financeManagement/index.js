import Layout from '@/views/layout/Layout'
const routerMap = [
  {
    path: 'detailedList',
    component: () => import('@/views/financeManagement/detailedList'),
    name: 'detailedList',
    meta: { title: '充值明细' }
  },
  {
    path: 'attendClassInfo',
    component: () => import('@/views/financeManagement/attendClassInfo'),
    name: 'attendClassInfo',
    meta: { title: '课消明细' }
  }
]
const financeManagement = {
  path: '/financeManagement',
  component: Layout,
  children: routerMap
}
export default financeManagement
