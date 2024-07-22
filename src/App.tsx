import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { testReqGet } from './service/user'
import { Button, Spin } from 'antd'
import type { RoutState } from '@/store/index'

const App = () => {
  const loading = useSelector((state: RoutState) => state.system.loading)
  const [userInfo, setUserInfo] = useState<User.Test>()
  const testGet = async () => {
    const [err, res] = await testReqGet()
    if (res) {
      setUserInfo(res)
    }
  }
  useEffect(() => {
    testGet()
  }, [])
  return (
    <>
      <Button type='primary' onClick={testGet}>
        Button
      </Button>
      <Spin tip='加载中' spinning={loading} />
    </>
  )
}

export default App
