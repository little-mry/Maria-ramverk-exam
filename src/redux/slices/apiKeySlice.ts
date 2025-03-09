import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchKey } from "../../utils/api";

interface ApiKeyState {
  key: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ApiKeyState = {
  key: "",
  status: "idle",
  error: null,
};

const getApiKey = createAsyncThunk<string, void, { rejectValue: string }>(
  "apiKey/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchKey();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const apiKeySlice = createSlice({
    name: 'apiKey', 
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(getApiKey.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(getApiKey.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.key = action.payload; 
            })
            .addCase(getApiKey.rejected, (state, action) => {
                state.status = 'succeeded';
                state.error = action.payload || 'Något gick fel'
            })
    },
})

export default apiKeySlice.reducer;
