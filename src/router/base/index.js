/* Layout */
import Layout from '@/views/layout/Layout'

// 常规路由（没有权限限制）
const baseRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: false
  },
  {
    path: '',
    component: Layout,
    children: []
  }
]

export default baseRouterMap
