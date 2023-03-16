import React from 'react'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Product from './pages/Product'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Success from './pages/success'

const App = () => {
  const user = useSelector((state) => state.user.currentUser)
  const counter = useSelector((state) => state.counter.value)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          {counter > 0 && <Route path="checkout" element={<Checkout />} />}
          <Route
            path="login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="product/:id" element={<Product />} />
          <Route path="success" element={<Success />} />
          <Route path="products" element={<ProductList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
