import { configureStore  } from "@reduxjs/toolkit";
import cartReducer from "./reduxCart"
import userReducer from "./userSlice"
import orderReducer from "./order"

 

  export const store = configureStore({
    reducer: {
      cart:cartReducer,
      user:userReducer,
      order:orderReducer
    },
   
  });
  




