import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const myProfile = createAsyncThunk("myProfile", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("https://fullstack-chat-app-h4rd.onrender.com/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("response.data--------------", response.data);

    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "failed to fetch profile",
    );
  }
});

const myProfileSlice = createSlice({
  name: "user",
  initialState: {
    profileData: null,
    conversations: [],
    onlineUsers: [],
    loading: false,
    error: null,
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    // my profile
    builder.addCase(myProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(myProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
    });
    builder.addCase(myProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default myProfileSlice.reducer;
export const { setOnlineUsers } = myProfileSlice.actions;
