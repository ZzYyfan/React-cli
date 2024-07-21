import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from 'antd'

const Home = () => {
  return <h2>Home</h2>
}

const About = () => {
  return <h2>About</h2>
}

const App = () => {
  return (
    <Router>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Button type='primary'>Button</Button>
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
