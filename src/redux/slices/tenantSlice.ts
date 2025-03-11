import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTenant } from "../../utils/api";
import { RootState } from "../store";
import { TenantResponse, TenantState } from "../../utils/interface";

const initialState: TenantState = {
  id: localStorage.getItem("tenantId") || null,
  name: localStorage.getItem("tenantName") || null,
  status: "idle",
  error: null
};

export const createNewTenant = createAsyncThunk<TenantResponse, string, {state: RootState}>(
  "tenant/createTenant",
  async (tenantName, { getState, rejectWithValue }) => {
    try {
      const apiKey = getState().apiKey.key;
      if (!apiKey) throw new Error("API-nyckel saknas");

      const storedTenantId = localStorage.getItem("tenantId");
      const storedTenantName = localStorage.getItem("tenantName");

      if (storedTenantId && storedTenantName) {
        return { id: storedTenantId, name: storedTenantName };
      }

      const newTenant = await createTenant(apiKey, tenantName);

      localStorage.setItem("tenantId", newTenant.id);
      localStorage.setItem("tenantName", newTenant.name);

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
