import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tenantReducer from './tenantSlice';
import menuSliceReducer from './menuSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import receiptReducer from './receiptSlice';

const rootReducer = combineReducers({
  apiKey: authReducer,
  menu: menuSliceReducer,
  cart: cartReducer,
  tenant: tenantReducer,
  order: orderReducer,
  receipt: receiptReducer,
});

export default rootReducer;