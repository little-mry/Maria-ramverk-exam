import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  ReceiptState } from "../../utils/interface";
import { createReceipt } from "../../utils/api";

const initialState: ReceiptState = {
  id: "",
  orderValue: null,
  timestamp: "",
  items: [],
  status: "idle",
  error: null,
  price: null
};

export const createReceiptThunk = createAsyncThunk(
  "receipt/createReceipt",
  async ({orderId }: { orderId: string }, { rejectWithValue }) => {
    try {
      const receiptData = await createReceipt(orderId);

      return receiptData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReceiptThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createReceiptThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.items = action.payload.items;
        state.timestamp = action.payload.timestamp;
        state.orderValue = action.payload.orderValue;
        state.price = action.payload.price
      })
      .addCase(createReceiptThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Något gick fel";
      });
  },
});

export default receiptSlice.reducer;
