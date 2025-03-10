import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMenu } from "../../utils/api";
import { RootState } from "../store";
import { IMenuItem, MenuState } from "../../utils/interface";

const initialState: MenuState = {
  menu: [],
  status: "idle",
  error: null,
};

const fetchMenuThunk = createAsyncThunk<IMenuItem[], string, {state: RootState}>(
    "menu/fetchMenu",
    async (_, { getState, rejectWithValue}) => {
        try {
            const apiKey = getState().apiKey.key;
            if (!apiKey) throw new Error("API-nyckel saknas");
            return await fetchMenu(apiKey)
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
)