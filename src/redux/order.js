import { createSlice} from "@reduxjs/toolkit";


const orderSlice = createSlice({

    name:'order',
    initialState:{

        orders:[],
        isFetching:false,
        isError:false,
        orderInfo:[]
    },

    reducers:{

        getOrdersStart : (state) => {
            state.isFetching = true;
            state.orders=[]
        },
        getOrdersSuccess : (state,action) => {
            state.isFetching=false;
            state.orders.push(...action.payload)
        },
        getOrdersFail : (state) => {
            state.isFetching =false;
            state.isError=true;
        }
 


    }


})



export const {getOrdersFail,getOrdersStart,getOrdersSuccess} = orderSlice.actions

export default orderSlice.reducer