import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createTenant } from "../../utils/api";
import { RootState } from "../store";
import { TenantState } from "../../utils/interface";

/* const initialState: TenantState = {
  name: "",
  id: "",
  status: "idle",
  error: null,
}; */

const createNewTenant = createAsyncThunk(
  "tenant/createTenant",
  async (tenantName: string, { getState, rejectWithValue }) => {
    try {
      const apiKey = (getState() as RootState).auth.key;
      if (!apiKey) throw new Error("API-nyckel saknas");

      return await createTenant(apiKey, tenantName);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTenant.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTenant.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        state.id = action.payload;
      })
      .addCase(getTenant.rejected, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload || "Något gick fel";
      });
  },
});

export default tenantSlice.reducer;
