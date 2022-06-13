import React from 'react'
import "./ProductCategoryHolder.scss"
import {Link} from 'react-router-dom'



function ProductCategoryHolder(props) 
{
    const {_id,img}= props.product

  return (
    <div className='product-category-holder'>
        
        <Link className="product-link-holder" to={`/product/${_id}`} key={_id}>
        
        <div className='div-holder'>
            <img src={img} alt='Recommended Product' />
           
        </div>
        
        </Link>
       
        
        
        
        
    </div>
  )
}

export default ProductCategoryHolder