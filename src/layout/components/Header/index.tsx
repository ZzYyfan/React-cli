import { Layout } from 'antd'
import CollapseIcon from './components/CollapseIcon.tsx'
import './index.less'

const LayoutHead = () => {
  const { Header } = Layout
  return (
    <Header style={{ background: '#409eff', height: '50px' }}>
      <div>
        <CollapseIcon />
      </div>
    </Header>
  )
}

export default LayoutHead
