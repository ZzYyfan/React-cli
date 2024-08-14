import { useEffect, useState } from 'react'
import { Menu, type MenuProps } from 'antd'
import { getMenu } from '@/service/system'
import './index.less'

const LayoutMenu = () => {
  type MenuItem = Required<MenuProps>['items'][number]
  const [menu, setMenu] = useState<MenuItem[]>([])
  // 处理菜单数据
  const handleMenu = (data: System.MenuItem[]): MenuItem[] => {
    // 遍历处理接口返回菜单数据
    const mapArr = (item: System.MenuItem): MenuItem => {
      if (item.children.length) {
        return {
          key: item.id,
          label: item.meta.title,
          children: item.children.map((i) => mapArr(i))
        }
      } else {
        return {
          key: item.id,
          label: item.meta.title
        }
      }
    }
    return data.map((menuItem: System.MenuItem) => {
      return mapArr(menuItem)
    })
  }
  // 获取菜单
  const getMenuData = async () => {
    const [err, res] = await getMenu({
      clientId: '50952a25bf3a897d1b1f89fbe9f081bb',
      userId: 'super_admin'
    })
    if (res) {
      setMenu(handleMenu(res))
    }
  }
  useEffect(() => {
    getMenuData()
  }, [])
  return (
    <div className='menu'>
      <Menu items={menu} mode='inline' />
    </div>
  )
}

export default LayoutMenu
