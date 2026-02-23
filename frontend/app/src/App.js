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