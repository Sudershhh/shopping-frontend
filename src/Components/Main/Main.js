import React from 'react'
import Categories from '../Categories/Categories'
import Footer from '../Footer/Footer'
import Newsletter from '../Newsletter/Newsletter'
import Recommended from '../Recommended/Recommended'
import Slider from '../Slider/Slider'
import "./Main.scss"




function Main() {




  return (
        <main className='main'>
            
            <Slider />
            <Categories />
            <Recommended />
            <Newsletter />
            <Footer />
        </main>

    
  )
}

export default Main