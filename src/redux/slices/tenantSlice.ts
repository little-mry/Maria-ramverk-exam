import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTenant } from "../../utils/api";
import { RootState } from "../store";
import { TenantResponse, TenantState } from "../../utils/interface";

const initialState: TenantState = {
  id: null,
  name: null,
  status: "idle",
  error: null
};

const createNewTenant = createAsyncThunk<TenantResponse, string, {state: RootState}>(
  "tenant/createTenant",
  async (tenantName, { getState, rejectWithValue }) => {
    try {
      const apiKey = getState().apiKey.key;
      if (!apiKey) throw new Error("API-nyckel saknas");
      return await createTenant(apiKey, tenantName); //här ska lil mry in
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
      .addCase(createNewTenant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewTenant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.name = action.payload.name;
      })
      .addCase(createNewTenant.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string ?? "Något gick fel";
      });
  },
});

export default tenantSlice.reducer;
