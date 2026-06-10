import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const msgStatus = createAsyncThunk(
  "msgStatusSlice",
  async (convoId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:4000/api/user/seen/${convoId}`,
        {},
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

const msgStatusSlice = createSlice({
  name: "msgStatusSlice",
  initialState: {
    messageStatus: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(msgStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(msgStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.messageStatus = action.payload;
      })
      .addCase(msgStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default msgStatusSlice.reducer;
