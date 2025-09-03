import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchKey } from "../../utils/api";
import { ApiKeyState } from "../../utils/interface";

const initialState: ApiKeyState = {
  key: null,
  status: "idle",
  error: null,
};

export const fetchApiKey = createAsyncThunk(
  "auth/fetchApiKey",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchKey();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: "apiKey",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiKey.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchApiKey.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.key = action.payload;
      })
      .addCase(fetchApiKey.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Något gick fel";
      });
  },
});

export default authSlice.reducer;
