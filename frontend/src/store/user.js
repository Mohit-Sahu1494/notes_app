import {register,login,logout,fetchProfile} from '../Api/Apicall'
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:null,
    isAuthenticated:false,
    loading:false,
    error:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
            state.isAuthenticated = true
        },
        clearUser:(state)=>{
            state.user = null
            state.isAuthenticated = false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(register.fulfilled,(state,action)=>{
            state.user = action.payload.data.user
            state.isAuthenticated = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.user = action.payload.data.user
            state.isAuthenticated = true
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user = null
            state.isAuthenticated = false
        })
        .addCase(fetchProfile.fulfilled,(state,action)=>{
            state.user = action.payload.data
            state.isAuthenticated = true
        })
    }
})

export const {setUser,clearUser} = userSlice.actions
export default userSlice.reducer