import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createConvo = createAsyncThunk(
  "userConversation",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:4000/api/user/find-convo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // console.log("response.data--------------", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "failed to fetch profile",
      );
    }
  },
);

const createConvoSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // user conversation
    builder.addCase(createConvo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createConvo.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(createConvo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default createConvoSlice.reducer;
