import React, { createContext, useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const {login}=useContext(AppContext)
  const navigate=useNavigate();
  const [formData,setFormdata]=useState({
    email:'',
    password:''
  })

  const onChangeHandler=(e)=>{
    const {name,value}=e.target
    setFormdata({...formData, [name]:value});
  }

  const {email,password}=formData
  const submitHandler=async(e)=>{
    e.preventDefault();
    const result=await login(email,password);

    
    if(result.success==true){
      navigate('/')
    }
    console.log(formData)
  }
  return (
    <>
      <div className="container my-5 p-4" style={{width:"600px",border:"2px solid yellow",borderRadius:'10px'}}>
        <h1 className='text-center'>User Login</h1>
        <form onSubmit={submitHandler} className='my-3'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" name='email'
            value={formData.email}
            onChange={onChangeHandler}
            className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='password'
            value={formData.password}
            onChange={onChangeHandler}
            className="form-control" id="exampleInputPassword1"/>
          </div>
          <div className="d-grid col-6 mx-auto">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
          
        </form>
      </div>
    </>
  )
}

export default Login
