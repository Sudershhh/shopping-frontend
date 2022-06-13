import React from 'react'
import "./Slider.scss"
import slider1 from "../../Assets/slider-1.webp"
import slider2 from "../../Assets/slider-2.jpg"
import slider3 from "../../Assets/slider-3.jpg"

function Slider() {

    

  
  return (
    <div className='slider-container'>


        <div className='component'>

            <div className='carousel-container'>
                <div className='image-container'>
                    <img src={slider1} alt="" />
                </div>
                <div className='info-container'>
                    <h1>SUMMER SALE</h1>                    
                    <h2>DONT COMPROMISE ON STYLE!</h2>
                    
                    <h3> GET FLAT 30% OFF FOR NEW RENTALS</h3>
                    
                    <button >SHOP NOW</button>
                </div>
            </div>

            <div className='carousel-container'>
                <div className='image-container'>
                    <img src={slider2} alt="" />
                </div>
                <div className='info-container'>
                    <h1>SUIT UP!</h1>
                    
                    <h2>DONT COMPROMISE ON CLASS!</h2>
                    
                    <h3> GET FLAT 44% OFF FOR NEW SUITS!</h3>
                    <button>SHOP NOW</button>
                </div>
            </div>

            <div className='carousel-container'>
                <div className='image-container'>
                    <img src={slider3} alt="" />
                </div>
                <div className='info-container'>
                    <h1>IT'S RAINING HANDBAGS</h1>
                    
                    <h2>DONT COMPROMISE ON SASS!</h2>
                    
                    <h3> GET FLAT 55% OFF FOR NEW HANDBAGS</h3>
                    <button>SHOP NOW</button>
                </div>
            </div>

        </div>
      

    </div>
  )
}

export default Slider