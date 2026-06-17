import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const userConversation = createAsyncThunk(
  "userConversation",
  async (search = "", thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:4000/api/user/conversations?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "failed to fetch conversations"
      );
    }
  }
);

const convoSlice = createSlice({
  name: "user",
  initialState: { inboxData: [], loading: false, error: null },
  reducers: {
    updateConvoLastMessage: (state, action) => {
      const { conversation_id, message } = action.payload;
      const convo = state.inboxData.find(
        (c) => String(c.conversation_id) === String(conversation_id)
      );
      if (convo) {
        convo.last_message_preview = message.content || null;
        convo.last_message_time = message.created_at;
        convo.last_message_sender_id = message.sender_id;
        convo.last_message_file_type = message.file_type || null;
        convo.last_message_file_name = message.file_name || null;
        convo.last_message_status = message.status;
        // Only increment unread if the message isn't from me
        const token = localStorage.getItem("token");
        const userId = token ? jwtDecode(token).id : null;
        if (String(message.sender_id) !== String(userId)) {
          convo.unread_count = (convo.unread_count || 0) + 1;
        }
      }
    },
  },
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
export const { updateConvoLastMessage } = convoSlice.actions;
