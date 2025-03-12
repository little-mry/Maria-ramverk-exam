import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
    activeOrder: boolean;
}

const initialState: OrderState = {
    activeOrder: true
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        startOrder: (state) => { state.activeOrder = true},
        completeOrder: (state) => { state.activeOrder = false}
    }
})

export const { startOrder, completeOrder } = orderSlice.actions;
export default orderSlice.reducer