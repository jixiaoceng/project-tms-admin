import Layout from '@/views/layout/Layout'
const baseURI = 'views/classManagement/'
const routerMap = [
  {
    path: 'scheduling',
    component: () => import(`@/${baseURI}scheduling`),
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
