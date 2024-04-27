import * as React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import './App.css'
import Header from './components/header'
import Products from './components/products'
import SignUp from './components/signup'
import SignIn from './components/signin'
import Product from './components/product'
import Cart from './components/cart'
import MyOrders from './components/my-orders'

import { useEffect } from 'react'
import { useAppDispatch } from './hooks'
import { messageCleared } from './reducers/message'

function App() {
  let location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(messageCleared())
  }, [dispatch, location])
  return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/products/:itemId' element={<Product />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/my-orders' element={<MyOrders />} />
        </Routes>
      </div>
  )
}

export default App
