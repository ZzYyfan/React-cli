import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from 'antd'
import { getMenu } from '@/service/system'
import { updateMenuList } from '@/store/menu'
import { getOpenKeys } from '@/utils'
import './index.less'
import type { MenuProps } from 'antd'
import type { RoutState } from '@/store'

type MenuItem = Required<MenuProps>['items'][number]

const LayoutMenu = () => {
  const dispatch = useDispatch()
  const { isCollapse, menuList: reduxMenuList } = useSelector((state: RoutState) => state.menu)
  const { pathname } = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [menu, setMenu] = useState<MenuItem[]>([])
  useEffect(() => {
    setSelectedKeys([pathname])
    if (!isCollapse) setOpenKeys(getOpenKeys(pathname))
  }, [isCollapse, pathname])
  // SubMenu 展开/关闭的回调
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)
    setOpenKeys([latestOpenKey])
  }
  // 处理菜单数据
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
  // 获取菜单
  const getMenuData = async () => {
    const [err, res] = await getMenu({
      clientId: '50952a25bf3a897d1b1f89fbe9f081bb',
      userId: 'super_admin'
    })
    if (res) {
      setMenu(handleMenu(res))
      dispatch(updateMenuList(handleMenu(res)))
    }
  }
  useEffect(() => {
    getMenuData()
  }, [])
  const navigate = useNavigate()
  // menu点击回调
  const handleMenuClick: MenuProps['onClick'] = ({ key }: { key: string }) => {
    console.log('key', key)
    navigate(key)
  }
  return (
    <div className='menu'>
      <Menu
        mode='inline'
        items={menu}
        triggerSubMenuAction='click'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={handleMenuClick}
      />
    </div>
  )
}

export default LayoutMenu
