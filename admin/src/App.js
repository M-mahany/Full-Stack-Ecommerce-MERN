import React from 'react'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import List from './pages/list/List'
import Single from './pages/single/Single'
import New from './pages/new/New'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { productsInputs, userInputs } from './formSource'
import './style/dark.scss'
import { useContext } from 'react'
import { DarkModeContext } from './context/darkModeContext'
import { useSelector } from 'react-redux'
import Orders from './pages/orders/orders'

function App() {
  const user = useSelector((state) => state.user.currentUser)
  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          {user && (
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="users">
                <Route index element={<List title={'Add New User'} />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title={'Add New User'} />}
                />
              </Route>
              <Route path="products">
                <Route index element={<List title={'Add New product'} />} />
                <Route path=":productId" element={<Single />} />
                <Route
                  path="new"
                  element={
                    <New inputs={productsInputs} title={'Add New product'} />
                  }
                />
              </Route>
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
