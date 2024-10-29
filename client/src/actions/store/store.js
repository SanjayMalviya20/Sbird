// import { configureStore } from '@reduxjs/toolkit'


// import  counterSlice  from '../actions'
// import {  persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
//  import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1
// }

// const persistedReducer = persistReducer(persistConfig, counterSlice)
// const store = configureStore({
//   reducer:persistedReducer ,
//   middleware: (get) =>
//     get({
//       serializableCheck: {
//         ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//       }
//     })

// })


// export default store

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../action";
import postSlice  from "../postaction";
export const store = configureStore({
    reducer:{
        user:userSlice,
        posts:postSlice,
    }
  
})
