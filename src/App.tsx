import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getMenu } from '@/service/system'
import { Button, Spin, Layout } from 'antd'
import type { RoutState } from '@/store'

const App = () => {
  const { Header, Sider, Content } = Layout
  const loading = useSelector((state: RoutState) => state.system.loading)
  const [menu, setMenu] = useState<System.MenuItem[]>([])
  const _getMenu = async () => {
    const [err, res] = await getMenu({
      clientId: '35a9765e8739ad09cd07378e0402f3db',
      userId: '55990a8c-31df-4bf5-96d2-6e9a689130fa'
    })
    if (res) {
      setMenu(res)
      console.log('res--->', res)
    }
  }
  // useEffect(() => {
  //   _getMenu()
  // }, [])
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    lineHeight: '64px',
    backgroundColor: '#4096ff'
  }

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: 'calc(100vh - 64px)',
    color: '#fff',
    backgroundColor: '#0958d9'
  }

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: 'calc(100vh - 64px)',
    color: '#fff',
    backgroundColor: '#1677ff'
  }
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%'
  }
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Sider width='25%' style={siderStyle}>
          Sider
        </Sider>
        <Content style={contentStyle}>Content</Content>
      </Layout>
    </Layout>
    // <>
    //   <Button type='primary' onClick={_getMenu}>
    //     Button
    //   </Button>
    //   <Spin tip='加载中' spinning={loading} />
    // </>
  )
}

export default App
