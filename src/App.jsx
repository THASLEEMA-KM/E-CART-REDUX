 import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import Footer from './Components/Footer'
import Cart from './Pages/Cart'
import Home from './Pages/Home'
import Wishlist from './Pages/Wishlist'
import View from './Pages/View'

function App() {


  return (
    <>
  
      <Routes>

        <Route element={<Home/>} path='/'></Route>
        <Route element={<Cart/>} path='/cart'></Route>
        <Route element={<Wishlist/>} path='/wishlist'></Route>
        <Route element={<View/>} path='/:id/view'></Route>
        <Route element={<Navigate to={'/'}/>} path='/*'></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
