import React, { useEffect, useState } from 'react'
import { RouteObject, useRoutes } from 'react-router'
import { useDispatch } from 'react-redux'
import dynamicRouter from './dynamicRouter'
import LayoutIndex from '@/layout'
import lazyLoad from '@/routers/utils/lazyLoad.tsx'

const Router = () => {
  const dispatch = useDispatch()
  const rootRouter: RouteObject[] = [
    {
      element: <LayoutIndex />,
      children: [
        {
          path: '/',
          element: lazyLoad(React.lazy(() => import('@/views/test')))
        }
      ]
    }
  ]
  const [menuData, setMenuData] = useState<RouteObject[]>([])
  useEffect(() => {
    dynamicRouter(dispatch).then((res) => setMenuData((pre) => pre.concat(res)))
  }, [dispatch])
  const menu = menuData.concat(rootRouter)
  console.log('menu', menu)
  return useRoutes(menu)
}

export default Router
