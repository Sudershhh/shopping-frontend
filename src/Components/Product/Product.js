import React, {useState,useEffect} from 'react'
import './Product.scss'
import plus from "../../Assets/plus.svg"
import minus from "../../Assets/minus.svg"
import axios from "axios"
import { useLocation } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import {addProduct} from "../../redux/reduxCart"
import  {addProductToCart} from "../../redux/apiCalls"


function Product() {
    

    const location = useLocation()
    const {pathname} = location
    

    const [singleProduct, setSingleProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')


    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.currentUser)

    const cartProducts = useSelector(state=>state.cart.products)
  
    useEffect(() => {

        const getSingleProduct = async () =>{
            try{
                const SINGLE_PRODUCT = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/products/find/`+pathname.split('/')[2])
                setSingleProduct(SINGLE_PRODUCT.data)
            }
            catch(err){
                console.log(err)
            }
        }
        getSingleProduct()

    },[cartProducts])


    const handleQuantity = (type) =>
    {
        if(quantity == 1 && type=='decrease') return;

        if(type=='increase')
        {
            setQuantity(quantity+1)
        }
        else if(type=='decrease')
        {
            setQuantity(quantity-1)
        }
    }


    const handleColor = (color) =>
    {
        setColor(color)
    }

    const handleSize = (size) =>
    {
        setSize(size)
    }





    const handleAddToCart = () =>
    {

        if(!user)
        {
            alert('Please Login or Register')
            
            return;
        }


        if(color=='' || size=='') return;

        const {title,description,img,price,_id} = singleProduct

        
        //STATE CHANGE
        dispatch(addProduct({title,price,description,img,quantity,color,size,productId:_id}))

        

        //BACKEND CHANGE
        let existingProductIndex = cartProducts.findIndex((item,index)=>item.productId==_id && item?.color==color && item?.size==size)
        let existingProduct = cartProducts[existingProductIndex]


        const previousProducts = cartProducts.filter((item)=> item.productId!= _id || (item.productId==_id && item.color!=color || item.size!=size))
        const existProduct = cartProducts.filter((item)=>item.productId==_id && item.color==color&& item.size==size )
        

        //EMPTY CART

        const cartObj={
            
            userId:user._id,
            products:[
                ...cartProducts
                ,
                {
                    
                    quantity,
                    size,
                    color,
                    price,
                    img,
                    title,
                    description,
                    productId:_id
                }

            ]
        }


        //0. no cart

        if(cartProducts.length==0)
        {

            addProductToCart(dispatch,user._id,cartObj,user.accessToken,true)

        }



        //CART EXISTS

        // 1. PRODUCT ALREADY EXISTS
        
        else if(existProduct[0]?.color==color && existProduct[0]?.size==size)
        {
            
            
            const updatedCartObj ={
                userId:user._id,
                products:[...previousProducts,{
                    productId:_id,
                    quantity:existProduct[0].quantity+quantity,
                    size,
                    color,
                    price,
                    img,
                    title,
                    description
                }]
            }

            addProductToCart(dispatch,user._id,updatedCartObj,user.accessToken)


        }


        //2. PRODUCT DOESNOT EXIST
        else
        {
            addProductToCart(dispatch,user._id,cartObj,user.accessToken)

        }



        
    }

    
  return (
    <main className="product">
        <div  className="product-image">

        <img src={singleProduct.img} />
        </div>
        <div className="product-info">
            <h1>{singleProduct.title}</h1>
            <p>{singleProduct.description}</p>
            <span className="price">$ {singleProduct.price}</span>
            <div className='item-info'>
                <div className="color-selection">
                    <h4>Color</h4>
                


                    <select onChange={(e)=>handleColor(e.target.value)} defaultValue={color} >
                        <option value=''>Select Color</option>
                    {singleProduct.color?.map((item,index) => <option key={index} value={item}><div className='color-options'>{item.toUpperCase()} <div className = 'color-circle' style={{backgroundColor:item}}></div> </div></option> )}

                    </select>

                </div>
                <div className='size-selection'>
                    <h4>Size</h4>
                    <select onChange={(e)=>handleSize(e.target.value)} defaultValue={size} >
                        <option value=''>Select Size</option>
                        {singleProduct.size?.map((item) => <option value={item} key={item}>{item}</option> )}

                    </select>
                </div>
            </div>
            <div className='quantity-container'>

                <div className="quantity-selection">
                    <button onClick={()=>{handleQuantity('decrease')}}>
                        <img src={minus} />
                    </button>
                    <div>{quantity}</div>
                    <button onClick={()=>{handleQuantity('increase')}}>
                        <img src={plus} />
                    </button>
                </div>
                <button className="add-to-cart" onClick={handleAddToCart}>
                    ADD TO CART
                </button>
            </div>
        </div>
    </main>
  )
}

export default Product