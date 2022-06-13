import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./Cart.scss"
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios'
import plus from "../../Assets/plus.svg"
import minus from "../../Assets/minus.svg"
import { cartDelete, updateCartBackend} from "../../redux/apiCalls"
import {deleteCartState} from "../../redux/reduxCart"

function Cart() {

    const {products,total,quantity} = useSelector(state => state.cart)

    const currentUser = useSelector((state)=>state.user.currentUser)

    const [stripeToken, setStripeToken] = useState(null)


    const dispatch = useDispatch()

    const navigate = useNavigate()


    const onToken = (token) => {
        setStripeToken(token);
      };

      


    useEffect(()=>{

       

        const makeRequest = async() => {
            try
            {
                
                    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/checkout/payment`,{
                            tokenId:stripeToken.id,
                            amount:Number((total *100).toFixed(2))  
    
                    })
               
               
                const orderBody = {
                    userId: currentUser._id,
                    products: products.map((item,index)=> {
                        return {
                            productId: item._id,
                            quantity : item.quantity,
                            title:item.title,
                            color:item.color,
                            size:item.size,
                            price:item.price,
                            img:item.img
                        }
                    }),
                    amount:total.toFixed(2),
                    address:res.data.billing_details.address,
                    status:res.data.status,
                    payment:res.data.payment_method_details
                }

                const orderCreate = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/orders`,orderBody,{headers:{token:`Bearer ${currentUser.accessToken}`}})
                
                
                const orderData = orderCreate.data
                
                
                
                if(orderData) navigate('/orders')
                cartDelete(dispatch,currentUser._id,currentUser.accessToken)


            }
            catch(err)
            {
                console.log(err)
            }
        }

      
            stripeToken &&  makeRequest()
        


    },[stripeToken,total,navigate])




    function handleQuantity(type,id,color,size,productId)
    {

        //STATE HANDLE
        dispatch(deleteCartState({type,id,color,size,productId}))



        //BACKEND HANDLE

        const {_id,accessToken} = currentUser
        

        const existingProducts = products.filter((item)=> item.productId!= productId || (item.productId==productId && item.color!=color || item.size!=size))
        let backendProducts=products.filter((item,index) => item.productId==productId && item.color == color && item.size == size)
    

        let updatedCart = {
            userId:_id,
            products:[
                ...existingProducts,
                
            ]
        }

        if(type=='decrease' && backendProducts[0].quantity==1 )
        {
           
           
            if(updatedCart.products.length==0)
            {
                //DELETE CART
                cartDelete(dispatch,_id,accessToken)
                return;
            }
        }
        else if(type=='decrease' && backendProducts[0].quantity!=1)
        {
            // backendProducts[index].quantity-=1
            let updatedProduct={
                ...backendProducts[0],
                quantity:backendProducts[0].quantity-1
            }
           updatedCart.products.push(updatedProduct)

            

        }
        else if(type=='increase')
        {
            let updatedProduct={
                ...backendProducts[0],
                quantity:backendProducts[0].quantity+1
            }
           updatedCart.products.push(updatedProduct)

        }

       

        updateCartBackend(dispatch,_id,updatedCart,accessToken,type,id)
        


    }


  return (
    <div className="cart-container">
            <h1 className='bag-title'>YOUR BAG</h1>
            <div className="top-cart">
                <div className="top-left">
                    <Link to='/'>
                    <button>CONTINUE SHOPPING</button>
                    
                    </Link>
                    <h4>SHOPPING BAG ({quantity})</h4>
                </div>
                <div className='top-right'>
                    <h4>Your Wishlist (0)</h4>
                    {currentUser._id && products.length!=0 &&<StripeCheckout 
                                name="STORE"
                                image="https://4.imimg.com/data4/BB/VX/MY-8218225/plain-shopping-bag-500x500.jpg"
                                billingAddress
                                shippingAddress
                                description={`Your total is $${total}`}
                                amount={Number((total * 100).toFixed(2))}
                                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                                token={onToken}
                    >

                    <button className='checkout-btn'>
                        CHECKOUT NOW
                    </button>
                    </StripeCheckout> }
                    
                </div>
            </div>

            <div className="cart-info">

                <div className="items">

                    {products?.map((item,index) =>(
                         <div className="item" key={index}>
                                <img src={item.img} />
                                <div className="item-info">
                                    <h4>Product: {item.title}</h4>
                                    <div className='id-qty'>
                                        <h3>ID : {item.productId}</h3>
                                        <div className='qty-selector'>
                                            <button onClick={()=>{handleQuantity('decrease',item._id,item.color,item.size,item.productId)}}>
                                                <img src={minus} />
                                            </button>
                                            <div className='qty'>{item.quantity}</div>
                                            <button onClick={()=>{handleQuantity('increase',item._id,item.color,item.size,item.productId)}}>
                                                <img src={plus} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='color-price'>
                                        <div className='color-cart-body'>
                                            <h3>Color : </h3>
                                            <div className='item-color' style={{backgroundColor:item.color}}></div>
                                        </div>
                                        <div>
                                            <h3>$ {item.price}</h3>
                                        </div>
                                    </div>
                                    <h3>Size : {item.size}</h3>
                                </div>
 
                        </div>
                    ))}


                   
                
                  

                </div>

                <div className="order-summary">
                    <h1>ORDER SUMMARY</h1>
                    <div className="summary-info">
                        <h3>Subtotal</h3>
                        <h3>$ {total.toFixed(2)}</h3>
                    </div>
                    <div className="summary-info">
                        <h3>Estimated Shipping</h3>
                        <h3>$ 4.99</h3>
                    </div>
                    <div className="summary-info">
                        <h3>Shipping Discount</h3>
                        <h3>- $ 4.99</h3>
                    </div>

                    <div className='summary-info'>
                        <h1>Total</h1>
                        <h1>$ {total.toFixed(2)}</h1>
                    </div>
                    
                    {currentUser._id && products.length!=0 && <StripeCheckout 
                                name="STORE"
                                image="https://4.imimg.com/data4/BB/VX/MY-8218225/plain-shopping-bag-500x500.jpg"
                                billingAddress
                                shippingAddress
                                description={`Your total is $${total}`}
                                amount={Number((total * 100).toFixed(2))}
                                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                                token={onToken}
                    >

                    <button className='checkout-btn'>
                        CHECKOUT NOW
                    </button>
                    </StripeCheckout>}
                    
                </div>

            </div>

    </div>
  )
}

export default Cart