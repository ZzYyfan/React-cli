import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getMenu } from '@/service/system'
import { Button, Spin } from 'antd'
import type { RoutState } from '@/store'

const App = () => {
  const { loading } = useSelector((state: RoutState) => state.system)
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
  return (
    <>
      <Button type='primary' onClick={_getMenu}>
        Button
      </Button>
      <Spin tip='加载中' spinning={loading} />
    </>
  )
}

export default App
