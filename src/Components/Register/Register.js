import React, { useRef } from 'react'
import "../Login/Login.scss"
import {Link, useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import {register} from "../../redux/apiCalls"

function Register() {

  const userNameRef = useRef()
  const passwordRef = useRef()
  const emailRef = useRef()

  const dispatch = useDispatch()

const navigate = useNavigate()

  function handleRegister(event)
  {
    event.preventDefault()

    const username=userNameRef.current.value
    const email=emailRef.current.value
    const password=passwordRef.current.value

    if(username=='' || email == '' || password =='')
    {
      return;
    }

    else
    {
        register(dispatch,{username,email,password})
        alert('You have successfully registered!')
        navigate('/login')
    }

  }

  return (
    <div className="login">
        <div className="login-box">
            <h1>REGISTER</h1>
            <input type="text" className="input-fields" placeholder="Username" required ref={userNameRef} />
            <input type="email" className="input-fields" placeholder='Email' required ref={emailRef} />
            <input type="password" className='input-fields password-login' placeholder="Password" required ref={passwordRef} />
            <button className='login-button' onClick={handleRegister}>Register</button>
            <Link to='/login' style={{textDecoration:'none', color:'black' , fontWeight:'bold', textDecoration:'underline'}} >Already a user?</Link>
            
        </div>
    </div>
  )
}

export default Register