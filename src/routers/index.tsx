import { useRoutes } from 'react-router'
import LayoutIndex from '@/layout'
import Dashboard from '@/views/dashboard'

export const rootRouter = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
        meta: {
          requiresAuth: true,
          title: "首页",
          key: "home"
        }
      }
    ]
  }
]

const Router = () => {
  return useRoutes(rootRouter)
}

export default Router
