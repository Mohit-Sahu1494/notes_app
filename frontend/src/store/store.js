import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user'
import noteReducer from './notes'
import themeReducer from './theme'
export const store = configureStore({
    reducer:{
        user:userReducer,
        notes:noteReducer,
        theme:themeReducer
    }
})
