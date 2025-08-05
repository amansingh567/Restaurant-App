import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorege = JSON.parse(localStorage.getItem("user"))

const initialState = { 
    img : "",
    email : "",
    name : "",
    token : "",
    uid : "",
    ...getUserFromLocalStorege
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: { 
        setLoginGoogle : (state,action)=>{
            console.log(action)
            state.name = action.payload.name
            state.img  = action.payload.img
            state.email = action.payload.email
            state.uid = action.payload.uid
            state.token = action.payload.token
        }
    },
    
})

export const  { setLoginGoogle } = userSlice.actions

export  default userSlice.reducer