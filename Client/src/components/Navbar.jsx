import React, { use, useContext, useState } from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import AppContext from '../context/AppContext'
const Navbar = () => {
  const [searchTerm,setSearchTerm]=useState("")
  const navigate=useNavigate()
  const location=useLocation()
  const {setFilteredProducts,products,logout}=useContext(AppContext)

  const filterbyCategory=(cat)=>{
    setFilteredProducts(products.filter((data)=>data.category.toLowerCase()==cat.toLowerCase()))
  }
  const filterbyPrice=(price)=>{
    setFilteredProducts(products.filter((data)=>data.price>=price))
  }
  const submitHandler=(e)=>{
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`)
    setSearchTerm('');

  }
  return (
    <>
      <div className="nav sticky-top" >
        <div className="nav_bar ">
          <Link to={'/'} className="left" style={{ textDecoration: 'none', color: 'white' }}>
            <h3>MERN E-Commerce</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined px-2">
              search
            </span>
            <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='Search Products...' />
          </form>
          <div className="right">
            <button className="btn btn-warning mx-3">cart</button>
            <button className="btn btn-warning mx-3">profile</button>
            <Link to={'/login'}  className="btn btn-secondary mx-3">login</Link>
            <Link to={'/register'} className="btn btn-info mx-3">register</Link>
            <button className="btn btn-danger mx-3" onClick={()=>{
              logout();
              navigate('/')
            }}>logout</button>
          </div>
        </div>
        {location.pathname=='/' && (
          <div className="sub_bar">
          <div className="items"  onClick={()=>setFilteredProducts(products)}>No Filter</div>
          <div className="items"  onClick={()=>filterbyCategory("mobiles")}>Mobiles</div>
          <div className="items"  onClick={()=>filterbyCategory("laptops")}>Laptops</div>
          <div className="items"  onClick={()=>filterbyCategory("cameras")}>Camera's</div>
          <div className="items"  onClick={()=>filterbyCategory("headphones")}>Headphones</div>
          <div className="items"  onClick={()=>filterbyPrice(15999)}>15999</div>
          <div className="items"  onClick={()=>filterbyPrice(25999)}>25999</div>
          <div className="items"  onClick={()=>filterbyPrice(45999)}>45999</div>
          <div className="items"  onClick={()=>filterbyPrice(65999)}>65999</div>
          <div className="items"  onClick={()=>filterbyPrice(89999)}>89999</div>
        </div>
        )}
        
      </div>
    </>
  )
}

export default Navbar
