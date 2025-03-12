import { OrderResponse, OrderState } from "../../utils/interface";
import { fetchOrderInfo, submitOrder } from "../../utils/api";
import { RootState } from "../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState: OrderState = {
  order: [],
  status: "idle",
  error: "null",
};

export const submitOrderThunk = createAsyncThunk<
  OrderResponse[],
  number[],
  { state: RootState }
>("order/submitOrder", async (orderItems, { rejectWithValue }) => {
  try {
    return await submitOrder(orderItems);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchOrderInfoThunk = createAsyncThunk<
OrderResponse, 
void, 
{ state: RootState }
>('order/fetchOrderInfo', async (_, {rejectWithValue }) => {
  try {
    return await fetchOrderInfo();
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrderThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitOrderThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(submitOrderThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Något gick fel";
      });
  },
});

export default orderSlice.reducer;
