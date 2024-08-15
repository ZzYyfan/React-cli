import React from 'react'
import Router from '@/routers/index'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

const App = () => {
  return (
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <Router />
      </ConfigProvider>
    </HashRouter>
  )
}

export default App
