import React,{useRef} from 'react'
import "./Login.scss"
import {Link} from 'react-router-dom'
import { login } from '../../redux/apiCalls'
import { useDispatch} from 'react-redux'
import {increaseLoginCount} from "../../redux/reduxCart"


function Login() {


  const userNameRef = useRef()
  const passwordRef=  useRef()

  const dispatch = useDispatch()

  function handleLogin(event)
  {
    event.preventDefault()

    const userNameValue = userNameRef.current.value
    const passwordValue = passwordRef.current.value

    if(userNameValue =='' || passwordValue =='')
    {
      return;
    }

        login(dispatch,{username:userNameValue,password:passwordValue})
        dispatch(increaseLoginCount())
    
    
  }


  return (
    <div className="login">
        <div className="login-box">
            <h1>SIGN IN</h1>
            <input type="text" className="input-fields" placeholder="Username" required ref={userNameRef} />
            <input type="password" className='input-fields password-login' placeholder="Password" required ref={passwordRef} />
            <button className='login-button' onClick={handleLogin}>
              LOGIN
            </button>
            <Link to='/register' style={{textDecoration:'none', color:'black' , fontWeight:'bold', textDecoration:'underline'}} >CREATE A NEW ACCOUNT</Link>
            
        </div>
    </div>
  )
}

export default Login