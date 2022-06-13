import axios from "axios"
import { loginFail,
      loginStart,
      loginSuccess ,
      registerFail,
      registerStart,
      registerSuccess,    
    } from "./userSlice"

import {getCartFail,getCartStart,getCartSuccess} from "../redux/reduxCart"

import {getOrdersFail,
        getOrdersStart,
        getOrdersSuccess} from "./order"


import {deleteCartFail,
        deleteCartSuccess,
        deleteCartStart,
        addProductCartFail,
        addProductCartStart,
        addProductCartSuccess} from "./reduxCart"



export const login = async(dispatch,user) =>
{
    dispatch(loginStart())
    try
    {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/login`, user)
        dispatch(loginSuccess(res.data))
    }
    catch (err)
    {
        dispatch(loginFail())
    }


}

export const register = async(dispatch,user) =>
{
    dispatch(registerStart())
    try
    {
        console.log('SUCCESS')
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/register`, user)
        dispatch(registerSuccess(res.data))
    }
    catch (err)
    {
        dispatch(registerFail())
    }

}


export const fetchCartProducts = async(dispatch,id,accessToken) =>
{
    dispatch(getCartStart())
    try
    {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/cart/find/${id}`,{headers:{token:`Bearer ${accessToken}`}})
        dispatch(getCartSuccess(res.data))
    }
    catch(err)
    {
        dispatch(getCartFail())
    }
}


export const addProductToCart = async (dispatch,id,prod,accessToken,first) =>{
    dispatch(addProductCartStart())
    try{

       

        if(first)
        {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/cart`,prod ,{headers:{token: `Bearer ${accessToken}`}})

            dispatch(addProductCartSuccess(res.data))
        }
        else
        {
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_API}api/cart/${id}`,prod ,{headers:{token: `Bearer ${accessToken}`}})

            dispatch(addProductCartSuccess(res.data))
        }

    }
    catch(err)
    {
        dispatch(addProductCartFail())
    }
}


export const cartDelete = async(dispatch,id,accessToken)=>{


    dispatch(deleteCartStart())
    try{

        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_API}api/cart/${id}`,{headers:{token: `Bearer ${accessToken}`}})
        dispatch(deleteCartSuccess())
    }catch(err)
    {
        dispatch(deleteCartFail(err))
    }


}


export const updateCartBackend = async (dispatch,_id,prod,accessToken)=>{


    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_API}api/cart/${_id}`,prod,{headers:{token: `Bearer ${accessToken}`}})
    }
    catch(err)
    {
        console.log(err)
    }
  
}


export const deleteDataLogOut = async(dispatch)=>{

    dispatch(deleteCartStart())
    try{
        dispatch(deleteCartSuccess())
    }catch(err)
    {
        dispatch(deleteCartFail(err))
    }

}



export const fetchOrders = async(dispatch,id,accessToken) =>
{

    dispatch(getOrdersStart())
    try
    {

        console.log(id,accessToken)

        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/orders/find/${id}`,{headers:{
            token:`Bearer ${accessToken}`
        }})

        dispatch(getOrdersSuccess(res.data))

    }
    catch(err)
    {
        dispatch(getOrdersFail)
    }




}





