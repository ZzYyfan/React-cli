import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu } from 'antd'
import { getMenu } from '@/service/system'
import { updateMenuList } from '@/store/menu'
import { getOpenKeys } from '@/utils'
import './index.less'
import type { MenuProps } from 'antd'
import type { RoutState } from '@/store'

type MenuItem = Required<MenuProps>['items'][number]

const LayoutMenu = () => {
  const { isCollapse, menuList } = useSelector((state: RoutState) => state.menu)
  const { pathname } = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const [openKeys, setOpenKeys] = useState<string[]>([])
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
        items={menuList}
        triggerSubMenuAction='click'
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
        onClick={handleMenuClick}
      />
    </div>
  )
}

export default LayoutMenu
