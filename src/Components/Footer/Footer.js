import React from 'react'
import "./Footer.scss"
import phone from "../../Assets/phone.svg"
import location from "../../Assets/location.svg"
import envelope from "../../Assets/envelope.svg"


function Footer() {
  return (
    <footer className="footer">
        <div className="left">
            <h1>STORE.</h1>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
        </div>
        <div className='middle'>
            <h1>Useful Links</h1>
            <div className='links-container'>
                <div className='links'>
                    <a href='#'>Home</a>
                    <a href='#'>Men's Fashion</a>
                    <a href='#'>Accessories</a>
                    <a href='#'>Order Tracking</a>
                    <a href='#'>Wishlist</a>
                </div>
                <div className='links'>
                    <a href='#'>Cart</a>
                    <a href='#'>Women's Fashion</a>
                    <a href='#'>My Account</a>
                    <a href='#'>Wishlist</a>
                    <a href='#'>Terms</a>
                </div>

            </div>
        </div>
        <div className='right-footer'>
                <h1>Contact</h1>
                
                <div className='contact-details'>
                    <img src={phone} alt='Phone Details' />
                    <h1>+1234 567 890</h1>
                </div>
                <div className='contact-details'>
                    <img src={location} alt='Phone Details' />
                    <h1>Philadelphia, Pennsylvania</h1>
                </div>
                <div className='contact-details'>
                    <img src={envelope} alt='Phone Details' />
                    <h1>contact@store.com</h1>
                </div>
             
        </div>
    </footer>
  )
}

export default Footer