import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Spin } from 'antd'
import type { RoutState } from '@/store'
import LayoutIndex from '@/layout'

const App = () => {
  const { loading } = useSelector((state: RoutState) => state.system)
  return (
    <>
      {/*<Spin tip='加载中' spinning={loading} />*/}
      <LayoutIndex />
    </>
  )
}

export default App
