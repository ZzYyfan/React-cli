import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Spin } from 'antd'
import type { RoutState } from '@/store/index'

const App = () => {
  const loading = useSelector((state: RoutState) => state.system.loading)
  return (
    <>
      <Button type='primary'>Button</Button>
      <Spin tip='加载中' spinning={loading} />
    </>
  )
}

export default App
