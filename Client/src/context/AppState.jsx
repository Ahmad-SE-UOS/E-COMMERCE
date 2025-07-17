import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import { ToastContainer,toast,Zoom } from 'react-toastify'
import axios from 'axios';
const AppState = (props) => {
   const url="http://localhost:3000/api"
   const [products,setProducts]=useState([])
   const [token,setToken]=useState([])
   const [isAuthenticated,setIsAuthenticated]=useState(false)
   const [filteredProducts,setFilteredProducts]=useState([])

    useEffect(()=>{
        const fetchProduct=async()=>{
            const api=await axios.get(`${url}/product/get`,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            setProducts(api.data.products)
            console.log(api.data)
            setFilteredProducts(api.data.products)
        }
        fetchProduct()
    },[])

    useEffect(() => {
        console.log(products)
      }, [products])

    // register user
    const register=async(name,email,password)=>{
        const api=await axios.post(`${url}/user/register`,{name,email,password},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
            });
          
        return api.data;
    }
    // login user
      const login=async(email,password)=>{
        const api=await axios.post(`${url}/user/login`,{email,password},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
            });
         setToken(api.data.token);
         setIsAuthenticated(true);
         localStorage.setItem('token',token)
        return api.data;
    }
    // logout user
    const logout=()=>{
        setIsAuthenticated(false)
        setToken(" ")
        localStorage.removeItem('token')
        toast.success('Logout successfully...', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
            });
    }
  return (
   <AppContext.Provider
    value={{
        products,
        register,
        login,
        token,
        isAuthenticated,
        filteredProducts,
        setFilteredProducts,
        logout }}>
    {props.children}
   </AppContext.Provider>
  )
}

export default AppState
