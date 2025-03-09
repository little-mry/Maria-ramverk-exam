import { configureStore } from "@reduxjs/toolkit";
import orderReducer from './slices/orderSlice'
import apiKeyReducer from './slices/apiKeySlice'

const store = configureStore({
    reducer: {
        apiKey: apiKeyReducer,
        order: orderReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 