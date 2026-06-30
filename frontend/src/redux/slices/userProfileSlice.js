import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userProfile = createAsyncThunk(
  "userProfile",
  async (userId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://fullstack-chat-app-h4rd.onrender.com/api/user/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // console.log("response.data--------------", response.data);

      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "failed to fetch profile",
      );
    }
  },
);

const otherUserProfileSlice = createSlice({
  name: "otherUserProfileSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // my profile
    builder.addCase(userProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(userProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default otherUserProfileSlice.reducer;
