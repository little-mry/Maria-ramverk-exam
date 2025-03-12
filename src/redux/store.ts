import { configureStore } from "@reduxjs/toolkit";
import activeOrderReducer from './slices/activeOrderSlice'
import authReducer from './slices/authSlice'
import tenantReducer from './slices/tenantSlice'
import menuSliceReducer from "./slices/menuSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from './slices/orderSlice'

const store = configureStore({
    reducer: {
        apiKey: authReducer,
        menu: menuSliceReducer,
        cart: cartReducer,
        tenant: tenantReducer,
        order: orderReducer,
        activeOrder: activeOrderReducer,
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 