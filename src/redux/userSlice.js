import { createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{
        currentUser :null,
        isFetching :false,
        error:false
    },
    reducers:{
        loginStart : (state) => {
            state.isFetching = true;
        },
        loginSuccess : (state,action) => {
            state.isFetching=false;
            state.currentUser = action.payload
        },
        loginFail : (state) => {
            state.isFetching =false;
            state.error=true;
        },
        logout:(state)=>
        {
            state.currentUser=null
        },

        //REGISTER

        registerStart : (state) => {
            state.isFetching = true;
        },
        registerSuccess : (state,action) => {
            state.isFetching=false;
            state.currentUser = action.payload
        },
        registerFail : (state) => {
            state.isFetching =false;
            state.error=true;
        },


    }
})

export const {loginStart,loginSuccess,loginFail,logout,registerFail,registerStart,registerSuccess} = userSlice.actions

export default userSlice.reducer  