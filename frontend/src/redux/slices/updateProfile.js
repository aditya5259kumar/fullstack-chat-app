import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "http://localhost:4000/api/user/update-profile",
        formData,
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

const updateProfileSlice = createSlice({
  name: "updateProfileSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // user conversation
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default updateProfileSlice.reducer;
