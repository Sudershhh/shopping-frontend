import React, { useEffect, useState } from 'react'
import "./ProductList.scss"
import axios from 'axios'
import ProductCategoryHolder from '../ProductCategoryHolder/ProductCategoryHolder';


function ProductList(props) {

    const {category,filter,sort} = props;
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(()=>{

        const getProducts = async ()=>{

            try
            {
                const res = await axios.get(
                    category?
                    `${process.env.REACT_APP_BACKEND_API}api/products?category=${category}` : `${process.env.REACT_APP_BACKEND_API}api/products`)
                setProducts(res.data)
            }
            catch(err)
            {
                console.log(err)
            }

        }

        getProducts()


    },[category])


    useEffect(()=>{

        category && setFilteredProducts(
            products.filter((item) => Object.entries(filter).every(([key,value]) => item[key].includes(value) ))
        )


    },[products,category,filter])


    useEffect(()=>{

        if(sort == 'newest')
        {

            setFilteredProducts((prev)=>[...prev].sort((a,b) => a.createdAt - b.createdAt))

        }
        else if(sort =='low')
        {
            setFilteredProducts((prev)=>[...prev].sort((a,b) => a.price - b.price))

        }
        else if(sort == 'high')
        {
            setFilteredProducts((prev)=>[...prev].sort((a,b) => b.price - a.price))

        }

    },[sort])


  return (
    <div className="productlist-container">

        {category ? 
        
            filteredProducts.map((item) => <ProductCategoryHolder product={item} key={item._id} />) :
            
            products.map((item) => <ProductCategoryHolder product={item} key={item._id} />) 
        }
        
    </div>
  )
}

export default ProductList