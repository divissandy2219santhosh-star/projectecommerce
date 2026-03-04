import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header.jsx'
import login from './components/login'
import signup from './components/signup'
import profile from './components/profile'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<login />} />
        <Route path="/signup" element={<signup />} />
        <Route path="/profile" element={<profile />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App