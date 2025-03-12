import { OrderResponse, OrderState } from "../../utils/interface";
import { submitOrder } from "../../utils/api";
import { RootState } from "../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMenuThunk } from "./menuSlice";

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
      .addCase(fetchMenuThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Något gick fel";
      });
  },
});

export default orderSlice.reducer;
