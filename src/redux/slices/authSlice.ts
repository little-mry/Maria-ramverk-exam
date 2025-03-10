import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchKey } from "../../utils/api";
import { ApiKeyState } from "../../utils/interface";

const initialState: ApiKeyState = {
  key: "",
  status: "idle",
  error: null,
};

const fetchApiKey = createAsyncThunk<string, void, { rejectValue: string }>(
  "auth/fetchApiKey",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchKey();
      return data.key;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiKey.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchApiKey.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.key = action.payload;
        }
      )
      .addCase(fetchApiKey.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Något gick fel";
      });
  },
});

export default authSlice.reducer;
