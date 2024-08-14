import { Outlet } from 'react-router'
import LayoutMenu from './components/Menu'
import LayoutHead from './components/Header'
import { Layout } from 'antd'
import './index.less'
import { useSelector } from 'react-redux'
import type { RoutState } from '@/store'

const LayoutIndex = () => {
  const { Content, Sider } = Layout
  const { isCollapse } = useSelector((state: RoutState) => state.menu)
  return (
    <section className='container'>
      <LayoutHead />
      <Layout>
        <Sider
          style={{
            height: 'calc(100vh - 64px)',
            overflowY: 'scroll',
            scrollbarWidth: 'thin'
          }}
          trigger={null}
          width={220}
          theme='light'
          collapsible
          collapsed={isCollapse}
        >
          <LayoutMenu />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </section>
  )
}

export default LayoutIndex
