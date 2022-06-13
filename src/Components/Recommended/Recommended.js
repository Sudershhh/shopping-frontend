import React , {useState, useEffect}from 'react'
import "./Recommended.scss"
import Popular from '../Popular/Popular'
import axios from 'axios'

function Recommended() {

  const [recommendedProducts,setRecommendedProducts] = useState([])

  useEffect(() =>{

    const getRecommendedProducts = async() =>
    {
      try
      {
        const recommendedProducts = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/products`)
        setRecommendedProducts(recommendedProducts.data.slice(0,8))
      }
      catch (err) {
        console.log(err)
      }
    }

    getRecommendedProducts()


  },[])


  return (
    <div className="recommended-container">
      <h1>Recommended for you !</h1>
      <div className='recommended'>
          {recommendedProducts?.map((item)=> <Popular product={item} key={item._id} /> )}
      </div>
    </div>
  
  )

}

export default Recommended