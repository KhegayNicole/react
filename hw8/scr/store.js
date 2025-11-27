import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './features/items/itemsSlice.js'

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
  
  devTools: process.env.NODE_ENV !== 'production',
})

