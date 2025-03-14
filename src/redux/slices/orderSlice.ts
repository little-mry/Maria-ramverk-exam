import { OrderResponse, OrderState } from "../../utils/interface";
import { fetchOrderInfo, submitOrder } from "../../utils/api";
import { RootState } from "../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: OrderState = {
  order: [],
  status: "idle",
  error: null,
};

export const submitOrderThunk = createAsyncThunk<
  OrderResponse[],
  number[],
  { state: RootState }
>("order/submitOrder", async (orderItems, { rejectWithValue }) => {
  try {
    const result = await submitOrder(orderItems);
    return Array.isArray(result) ? result : [result];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchOrderInfoThunk = createAsyncThunk<
  OrderResponse[],
  void,
  { state: RootState; rejectValue: string }
>("order/fetchOrderInfo", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchOrderInfo();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = [];
    },
  },
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
      })
      .addCase(fetchOrderInfoThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderInfoThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(fetchOrderInfoThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Något gick fel";
      });
  },
});

export default orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
