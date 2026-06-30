import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteAccount = createAsyncThunk(
  "deleteAccountSlice",
  async (password, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        "https://fullstack-chat-app-h4rd.onrender.com/api/user/delete-account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            password,
          },
        },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "failed to delete account",
      );
    }
  },
);

const deleteAccountSlice = createSlice({
  name: "deleteAccountSlice",
  initialState: {
    deleteStatus: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteStatus = action.payload;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deleteAccountSlice.reducer;
