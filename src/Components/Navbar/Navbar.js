import React from 'react'
import "./Navbar.scss"
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../../redux/userSlice"
import {deleteDataLogOut} from "../../redux/apiCalls"

function Navbar() {

    const cartQuantity = useSelector(state=> state.cart.quantity)

    const user = useSelector((state)=>state.user.currentUser)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    function handleLogout(event)
    {
        event.preventDefault()
        dispatch(logout())
        deleteDataLogOut(dispatch)
        navigate('/login')
    }




  return (
    <div className="navbar">


        {/* DESKTOP */}


        <div className="top-navbar">
            <p>Super Deal ! Free shipping on orders above $75</p>
        </div>
        
        <div className="main-navbar">
            <div className="left">
                <a href="#" className="link">EN</a>
                <input type="search" className='searchbar'></input>
                
            </div>
            <div className="middle">
                <Link to={'/'} style={{ textDecoration: 'none', color:'black'}}>
                    <h1>STORE</h1>
                </Link>
            </div>
            <div className="right">

                {user ? '' : <Link to="/register" className="link">REGISTER</Link> } 

                 <Link to="/login" className="link" onClick={handleLogout}>{user ? 'LOG OUT' : 'SIGN IN'}</Link> 

                {user ? <Link to='/orders' className='link' >ORDERS</Link> : ''}
              
                <Link to='/cart' className="link navbar-cart">CART <div className="cart-qty-value">{cartQuantity}</div></Link>
                
            </div>
            
        </div>


    {/* Mobile responsive */}

    <div className='mobile-responsive right'>

        <Link to={'/'} style={{ textDecoration: 'none', color:'black'}}>
            <span class="material-symbols-outlined">
                home
            </span>                
        </Link>
   
        {user ? '' : <Link to="/register" className="link">REGISTER</Link> } 

        <Link to="/login" className="link" onClick={handleLogout}>{user ? 'LOG OUT' : 'SIGN IN'}</Link> 

        {user ? <Link to='/orders' className='link' >ORDERS</Link> : ''}

        <Link to='/cart' className="link navbar-cart">CART <div className="cart-qty-value">{cartQuantity}</div></Link>


    </div>

</div>
        
  )
}

export default Navbar