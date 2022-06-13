import React from 'react'
import "./Categories.scss"
import CategoryProduct from './CategoryProduct'
import category1 from '../../Assets/category-1.jpg'
import category2 from '../../Assets/category-2.jpg'
import category3 from '../../Assets/category-3.jpg'

function Categories() {
  return (
    <div className="category-container">
    <h1 className="category-title">Categories</h1>
    <div className='categories'>
        
        <CategoryProduct img={category1} content={'Shirt Style'} url='/products/shirts' />
        <CategoryProduct img={category2} content={"Women's Fashion"} url={'/products/women'} />
        <CategoryProduct img={category3} content={'Suit up!'} url='/products/coats' />
        
    </div>  
    </div>
  )
}

export default Categories