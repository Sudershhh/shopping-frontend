import { createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        products:[],
        total:0,
        quantity:0,
        isFetching:false,
        isError:false,
        cartProducts:[],
        firstLogin:0
    },
    reducers:{

        //ADD PRODUCT STATE ONLY CHANGE

        addProduct : (state,action) =>{

            // IF PRODUCT EXISTS
            
            let existingProductIndex = state.products.findIndex((item,index) => item.productId == action.payload.productId && item.color == action.payload.color && item.size==action.payload.size)
            let existingProduct = state.products[existingProductIndex]
            
            if(existingProduct?.color==action.payload.color && existingProduct?.size==action.payload.size)
            {
                console.log(existingProduct)
                state.products[existingProductIndex].quantity+=action.payload.quantity
                state.total+=(state.products[existingProductIndex].price * action.payload.quantity)
            }
            else
            {
                state.quantity+=1;
                state.products.push(action.payload);
                state.total+=action.payload.price * action.payload.quantity
            }
            state.total.toFixed(2)


           
        },



        //DELETE PRODUCT STATE

        deleteCartState:(state,action)=>{

            //
            let index = state.products.findIndex((item,index) => item.productId==action.payload.productId && item.color == action.payload.color && item.size == action.payload.size)
            
            if(action.payload.type=='decrease' && state.products[index].quantity==1 )
            {
                
                state.total-=state.products[index].price
                state.total.toFixed(2)

                state.quantity-=1
                state.products.splice(index,1)
            }    
            else if(action.payload.type=='decrease' && state.products[index].quantity!=1 )
            {
                    state.products[index].quantity -=1
                    state.total-=state.products[index].price
                    state.total.toFixed(2)

                }

            else if(action.payload.type=='increase')
            {
                state.products[index].quantity +=1
                state.total+=state.products[index].price
                state.total.toFixed(2)

            }
        },


        //ADD PRODUCT TO CART BACKEND

        addProductCartStart : (state) =>{
            state.isFetching=true
        },
        addProductCartSuccess : (state,action) =>{
            state.isFetching=false;
            state.isError=false
        },
        addProductCartFail : (state) =>{
            state.isError=true
        },

        //GETTING CART DETAILS FROM BACKEND

        getCartStart : (state) => {
            state.isFetching = true;
        },

        increaseLoginCount:(state) =>{
            state.firstLogin+=1
        },

        getCartSuccess : (state,action) => {
            state.isFetching=false;
            state.products.push(...action.payload.products)
            state.quantity +=action.payload.products.length
            state.total +=  action.payload.products.map((item,index)=>item.price*item.quantity).reduce((prevValue,currValue)=>prevValue+currValue)
            state.total.toFixed(2)


            
        },
        getCartFail : (state) => {
            state.isFetching =false;
            state.error=true;
        },

        //DELETING CART DETAILS - LOGOUT

        deleteCartStart:(state)=>{
            state.isError=false
            state.isFetching=true
        },


        deleteCartSuccess:(state)=>{
            state.products=[]
            state.isFetching=false
            state.isError=false
            state.quantity=0
            state.total=0
        },
        deleteCartFail:(state)=>{
            state.isError=true
        }

       


    }
})

export const {addProduct,
            getCartFail,
            getCartStart,
            getCartSuccess,
            deleteCartFail,
            deleteCartSuccess,
            deleteCartStart,
            addProductCartStart,
            addProductCartSuccess,
            addProductCartFail,
            increaseLoginCount,
            deleteCartState
        } = cartSlice.actions

export default cartSlice.reducer  