import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { updateCollapse } from '@/store/menu'
import type { RoutState } from '@/store'

const CollapseIcon = () => {
  const dispatch = useDispatch()
  const { isCollapse } = useSelector((state: RoutState) => state.menu)
  const handleIconClick = () => {
    dispatch(updateCollapse(!isCollapse))
  }
  return (
    <div onClick={handleIconClick}>
      {isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  )
}
