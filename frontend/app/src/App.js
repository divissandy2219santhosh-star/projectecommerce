import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Booklist from './components/booklist'
import Bookform from './components/bookform'

function App() {
  return (
    <Router>
      <Container>
        <h1 className='my-4 text-center'>Book Management System</h1>
        <Routes>
          <Route path="/" element={<Booklist />} />
          <Route path="/add" element={<Bookform />} />
        </Routes>
      </Container>
      </Router>
  )
}

export default App