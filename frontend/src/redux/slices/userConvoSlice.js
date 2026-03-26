import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userConversation = createAsyncThunk(
  "userConversation",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/api/user/conversations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // console.log("response.data--------------", response.data);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "failed to fetch profile",
      );
    }
  },
);

const convoSlice = createSlice({
  name: "user",
  initialState: {
    inboxData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // user conversation
    builder.addCase(userConversation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userConversation.fulfilled, (state, action) => {
      state.loading = false;
      state.inboxData = action.payload;
    });
    builder.addCase(userConversation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default convoSlice.reducer;
