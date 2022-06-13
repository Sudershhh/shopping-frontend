import React from 'react'
import { Link} from 'react-router-dom'
import "./CategoryProduct.scss"

function CategoryProduct(props) {
  return (

    

    <div className='category-product'>
        <div className='cat-prod-img'>

            <img src={props.img} alt='' />
        </div>
        <div className='category-body'>
            <h1>{props.content}</h1>
            <Link to={props.url}>
              <button>
                SHOP NOW
              </button>
            </Link>
        </div>
    </div>




  )
}

export default CategoryProduct