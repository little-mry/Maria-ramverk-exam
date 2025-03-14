import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMenu } from "../../utils/api";
import { RootState } from "../store";
import { IMenuItem, MenuState } from "../../utils/interface";

const initialState: MenuState = {
  menu: [],
  status: "idle",
  error: null,
};

export const fetchMenuThunk = createAsyncThunk<
  IMenuItem[],
  void,
  { state: RootState }
>("menu/fetchMenu", async (_, { rejectWithValue }) => {
  try {
    return await fetchMenu();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenuThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menu = action.payload;
      })
      .addCase(fetchMenuThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Något gick fel";
      });
  },
});

export default menuSlice.reducer