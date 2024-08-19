import React from 'react'
import { getMenu } from '@/service/system'
import lazyLoad from './utils/lazyLoad'
import type { MenuProps } from 'antd'
import { updateMenuList } from '@/store/menu'
import LayoutIndex from '@/layout'
import type { Dispatch, UnknownAction } from 'redux'
import type { RouteObject } from 'react-router'

type MenuItem = Required<MenuProps>['items'][number]

// 处理菜单数据用于redux存储
const handleMenu = (data: System.MenuItem[]): MenuItem[] => {
  // 遍历处理接口返回菜单数据
  const mapArr = (item: System.MenuItem): MenuItem => {
    if (item.children.length) {
      return {
        key: item.path,
        label: item.meta.title,
        title: item.meta.title,
        children: item.children.map((i) => mapArr(i))
      }
    } else {
      return {
        key: item.path,
        label: item.meta.title,
        title: item.meta.title
      }
    }
  }
  return data.map((menuItem: System.MenuItem) => {
    return mapArr(menuItem)
  })
}
// 引用layout
const importElement = (component: string): React.ReactNode => {
  if (['layout'].includes(component)) {
    return lazyLoad(React.lazy(() => import('@/layout')))
  } else {
    return lazyLoad(React.lazy(() => import(`@/views/${component}/index.tsx`)))
  }
}
// 处理菜单数据用于路由懒加载
const handleDynamicMenu = (data: System.MenuItem[]): RouteObject[] => {
  const mapArr = (item: System.MenuItem): RouteObject => {
    const { component, id, path, meta } = item
    if (item.children.length) {
      return {
        element: importElement(component),
        id: String(id),
        path,
        // children: item.children.map((i) => mapArr(i))
      }
    } else {
      return {
        element: importElement(component),
        id: String(id),
        path,
        children: []
      }
    }
  }
  return data.map((menuItem: System.MenuItem) => {
    return mapArr(menuItem)
  })
}
const dynamicRouter = async (dispatch: Dispatch<UnknownAction>): Promise<RouteObject[]> => {
  const [err, res] = await getMenu({
    clientId: '50952a25bf3a897d1b1f89fbe9f081bb',
    userId: 'super_admin'
  })
  if (res) {
    dispatch(updateMenuList(handleMenu(res)))
    return handleDynamicMenu(res)
  } else {
    return []
  }
}

export default dynamicRouter
