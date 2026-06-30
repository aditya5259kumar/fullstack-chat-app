import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteConvo = createAsyncThunk(
  "deleteConvoSlice",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `https://fullstack-chat-app-h4rd.onrender.com/api/user/delete-conversation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "failed to delete conversation",
      );
    }
  },
);

const deleteConvoSlice = createSlice({
  name: "deleteAccountSlice",
  initialState: {
    deleteStatus: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteConvo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConvo.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteStatus = action.payload;
      })
      .addCase(deleteConvo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deleteConvoSlice.reducer;
