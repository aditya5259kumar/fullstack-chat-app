import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ----------signUp----------
export const userSignUp = createAsyncThunk(
  "signUp",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        userData,
      );

      console.log("response.data=========", response.data);

      const token = response.data.token;

      console.log("token=========", token);

      localStorage.setItem("token", token);

      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to signup",
      );
    }
  },
);

// ----------logIn----------
export const userLogin = createAsyncThunk(
  "userLogin",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        userData,
      );

      console.log("response.data=========", response.data);

      const token = response.data.token;

      console.log("token=========", token);

      localStorage.setItem("token", token);

      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "falied to login",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    // ----------logout----------
    userLogout: (state) => {
      ((state.token = null), localStorage.removeItem("token"));
    },
  },
  extraReducers: (builder) => {
    // ----------signUp----------
    builder.addCase(userSignUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(userSignUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ----------login----------
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { userLogout } = authSlice.actions;
