import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMsg = createAsyncThunk(
  "sendMessage/send",
  async ({ conversation_id, content }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:4000/api/user/send-message",
        {
          conversation_id,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "failed to send message",
      );
    }
  },
);

const sendMessageSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // user conversation
    builder.addCase(sendMsg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendMsg.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    });
    builder.addCase(sendMsg.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default sendMessageSlice.reducer;
