<<<<<<< HEAD
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header.jsx'
import login from './components/login'
import signup from './components/signup'
import profile from './components/profile'
=======
<<<<<<< HEAD
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Booklist from './components/booklist'
import Bookform from './components/bookform'
>>>>>>> 49ed4c375b3886912249c93c4f6652e0e9b9fa27

function App() {
  return (
    <Router>
<<<<<<< HEAD
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
=======
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
=======
import { Route, Routes } from "react-router-dom";
import loginscreen from "./components/screens/LoginScreen";
import productdetails from "./components/screens/ProductDetails";
import products from "./components/screens/Products";

export default function App(){
  return (
    <>
    <BrowserRouter>
    <Header/>
    <main>
      <container>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <Routes>
          <Route path="/login" element={<loginscreen/>} />
        </Routes>
        <Routes>
          <Route path="/product/:id" element={<productdetails/>} />
        </Routes>
        <Routes>
          <Route path="/products" element={<products/>} />
        </Routes>
        <Routes>
          <Route path="/cart" element={<cart/>} />
        </Routes>
        <Routes>
          <Route path="/shipping" element={<shipping/>} />
        </Routes>
        <Routes>
          <Route path="/payment" element={<payment/>} />
        </Routes>
        <Routes>
          <Route path="/placeorder" element={<placeorder/>} />
        </Routes>
        <Footer/>
      </container>
    </main>
    </BrowserRouter>
    </>
  )
}
>>>>>>> 9286a9866adad29763e83d60e6e4defb88d9cc37
>>>>>>> 49ed4c375b3886912249c93c4f6652e0e9b9fa27
