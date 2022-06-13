import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../redux/apiCalls'
import "./Orders.scss"


function Orders() {

 
  const dispatch = useDispatch()
  
  
  const user = useSelector(state=> state.user.currentUser)
  const orders = useSelector(state => state.order.orders)


  useEffect(() =>{

    fetchOrders(dispatch,user?._id,user?.accessToken)
    
  },[])






  return (
    <div className='orders'>

              <h1>YOUR ORDERS</h1>
      {orders?.map((item,index)=><div className='order-body' key={item?._id}>


              <div className='order-header'>

              <h2>Order ID : {item?._id}</h2>
              <p>Order Date : {item?.createdAt.substring(0, 10)}</p>
              </div>

              <hr></hr>

              <div className='order-products'>
                  {item?.products.map((product,ind) => <div key={ind} className="order-product-body">

                    <div className='body-left'>
                        <div className='img-holder'>
                            <img src={product.img} />
                        </div>
                        <h3>

                        {product.title}
                        </h3>
                    
                    </div>

                    <div className='body-right'>

                       
                        <h3>$ {product.price}</h3>
                        <h4>Qty : {product.quantity}</h4>
                    </div>



                  </div>
                  )}  

                
              </div>

              <div className='order-footer'>


                <div className='amount-payment'>
                    <h2>Order Total : $ {item?.amount} </h2>
                    <h3>Payment</h3>
                    <div className='payment-details'>
                        <h4>Card : {item?.payment?.card?.brand.toUpperCase()} <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22}  viewBox="0 0 576 512"><path d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2.3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4.2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2.2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2.1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z"/></svg> </h4>
                        <h4>Card Number : **{item?.payment?.card.last4}</h4>
                    </div>
                </div>

                <div className='order-delivery'>
                    <h3>Delivery Address</h3>
                    <div className='order-address'>
                          <div>

                          <h4>
                            {item.address?.line1}

                          </h4>
                          <h4>

                            {item.address?.line2}                          
                          </h4>
                          <h4>
                            <span>{item.address?.city} {item.address?.postal_code}, {item.address?.state}                          
                            </span>                          
                          </h4>
                         
                          <h4>
                          {item?.address.country}
                          </h4>                                                   
                          
                          </div>
                    </div>
                </div>

              </div>


              <h1>Order Status : <span className='order-status'>{item?.status.toUpperCase()}</span> </h1>

              </div> )}

        
    </div>
  )
}

export default Orders