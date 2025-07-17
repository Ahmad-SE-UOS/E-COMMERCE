import React, { useContext } from 'react'
import ShowProduct from './components/product/ShowProduct'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductDetail from './components/product/ProductDetail'
import Navbar from './components/Navbar'
import SearchProduct from './components/product/SearchProduct'
import Register from './components/user/Register'
import Login from './components/user/Login'
import { ToastContainer,toast } from 'react-toastify'
const App = () => {
  
  return (
    <Router>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<ShowProduct/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/product/search/:term' element={<SearchProduct/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
