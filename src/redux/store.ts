import { configureStore } from "@reduxjs/toolkit";
import orderReducer from './slices/orderSlice'
import authReducer from './slices/authSlice'
import tenantReducer from './slices/tenantSlice'
import menuSliceReducer from "./slices/menuSlice";

const store = configureStore({
    reducer: {
        apiKey: authReducer,
        menu: menuSliceReducer,
        order: orderReducer,
        tenant: tenantReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 