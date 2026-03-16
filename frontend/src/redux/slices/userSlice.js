import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const myProfile = createAsyncThunk("myProfile", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:4000/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response.data--------------", response.data);

    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "failed to fetch profile",
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(myProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(myProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(myProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
