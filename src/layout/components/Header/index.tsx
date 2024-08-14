import { Layout } from 'antd'
import CollapseIcon from './components/CollapseIcon.tsx'
import './index.less'

const LayoutHead = () => {
  const { Header } = Layout
  return (
    <Header style={{ background: '#fff' }}>
      <div>
        <CollapseIcon />
      </div>
    </Header>
  )
}

export default LayoutHead
