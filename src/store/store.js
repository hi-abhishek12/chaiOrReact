import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
const store = configureStore({
    reducer: {
       auth : authReducer
       //TODO : Add more slice here for posts
    }
});

export default store;