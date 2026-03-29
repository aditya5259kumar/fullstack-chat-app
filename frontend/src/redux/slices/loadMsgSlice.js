import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMessages = createAsyncThunk(
  "getMessages",
  async (convo_id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:4000/api/user/messages/${convo_id}`,
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
      state.msg.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // user conversation
    builder.addCase(getMessages.pending, (state) => {
      state.loading = true;
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
export const { addMessage } = loadMsgSlice.actions;
