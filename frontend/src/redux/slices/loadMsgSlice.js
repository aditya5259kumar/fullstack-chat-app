import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMessages = createAsyncThunk(
  "getMessages",
  async (convo_id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://fullstack-chat-app-h4rd.onrender.com/api/user/messages/${convo_id}`,
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

const loadMsgSlice = createSlice({
  name: "user",
  initialState: {
    msg: [],
    other_user: null,
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      const incoming = action.payload;
      const alreadyExists = state.msg.some((m) => m.id === incoming.id);
      if (!alreadyExists) {
        state.msg.push(incoming);
      }
    },
    markAllSeen: (state) => {
      state.msg = state.msg.map((m) =>
        m.status === "sent" ? { ...m, status: "seen" } : m,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.loading = true;
      state.msg = [];
      state.other_user = null;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.msg = action.payload.data;
      state.other_user = action.payload.other_user;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default loadMsgSlice.reducer;
export const { addMessage, markAllSeen } = loadMsgSlice.actions;
