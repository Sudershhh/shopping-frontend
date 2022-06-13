import React, { useState } from 'react'
import "./ProductContainer.scss"
import {useLocation} from "react-router-dom"
import ProductList from '../ProductList/ProductList'



function ProductContainer() {

    const location = useLocation()
    const category = location.pathname.split('/')[2];
    const [filter,setFilter] = useState({})
    const [sort, setSort] = useState({})

   



    const handleFilterChange = (event) =>
    {
        const colorValue = event.target.value;
        setFilter({
            ...filter,
            [event.target.name]:colorValue
        })
    }

    const handleSortChange = (event) =>
    {
        const sortValue = event.target.value
        setSort({
                [event.target.name]:sortValue
        })
    }






  return ( 
    <div className="product-list">
        <h1>Dresses</h1>

        <div className='filter-container'>
            <div className='filter-attribute'>
                <h1>Filter Products :</h1>
                <select onChange={handleFilterChange} name='color'>
                    <option value='red'>Red</option>
                    <option value='orange'>Orange</option>
                    <option value='black'>Black</option>
                    <option value='white'>White</option>
                    <option value='purple'>Purple</option>
                    <option value='blue'>Blue</option>
                </select>

                <select name='size' onChange={handleFilterChange}>
                    <option value='L'>L</option>
                    <option value='M'>M</option>
                    <option value='S'>S</option>
                    <option value='XS'>XS</option>
                </select>

            </div>
            <div className='sort'>
                <h1>Sort Products :</h1>
                <select onChange={handleSortChange} name='sort'>
                    <option value='newest'>Newest</option>
                    <option value='low'>Lowest Price</option>
                    <option value='high'>Highest Price</option>
                </select>
            </div>

        </div>


        <div className='product-container'>

            <ProductList category={category} sort={sort} filter={filter} />            

        </div>


    </div>
  )
}

export default ProductContainer