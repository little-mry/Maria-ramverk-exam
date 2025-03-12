import { OrderResponse, OrderState } from "../../utils/interface";
import { submitOrder } from "../../utils/api";
import { RootState } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState: OrderState = {
    order: [],
    status: 'idle',
    error: 'null',
}

export const submitOrderThunk = createAsyncThunk<OrderResponse {state: RootState}>(
    'order/submitOrder',
    async () => {
        try {
            
        }
    }
)

