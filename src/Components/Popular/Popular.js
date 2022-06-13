import React from 'react'
import "./Popular.scss"
import heart from "../../Assets/heart.svg"
import cart from "../../Assets/cart.svg"
import search from "../../Assets/search.svg"
import {Link} from 'react-router-dom'

function Popular(props) {

  const {_id,img}= props.product

  return (
    <Link className="popular" to={`/product/${_id}`} key={_id} >
        <img src={img} alt='Recommended Product' />
        <div className="invisible">
            <button className="circle"><img src={cart} /></button>
            <button className="circle"><img src={search} /></button>
            <button className="circle"><img src={heart} /></button>
        </div>
    </Link>
  )
}

export default Popular