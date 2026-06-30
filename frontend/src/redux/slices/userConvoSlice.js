import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userConversation = createAsyncThunk(
  "userConversation",
  async (search = "", thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://fullstack-chat-app-h4rd.onrender.com/api/user/conversations?search=${search}`,
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
    // Patch one conversation's preview/time/status locally — no refetch.
    updateConvoLastMessage: (state, action) => {
      const { conversation_id, message } = action.payload;
      const convo = state.inboxData.find(
        (c) => String(c.conversation_id) === String(conversation_id)
      );
      if (!convo) return;

      if (message.content !== undefined) {
        convo.last_message_preview = message.content;
      }
      if (message.created_at !== undefined) {
        convo.last_message_time = message.created_at;
      }
      if (message.sender_id !== undefined) {
        convo.last_message_sender_id = message.sender_id;
      }
      if (message.file_type !== undefined) {
        convo.last_message_file_type = message.file_type;
      }
      if (message.file_name !== undefined) {
        convo.last_message_file_name = message.file_name;
      }
      if (message.status !== undefined) {
        convo.last_message_status = message.status;
      }

      // Move this convo to top of list
      state.inboxData = [
        convo,
        ...state.inboxData.filter(
          (c) => String(c.conversation_id) !== String(conversation_id)
        ),
      ];
    },
    // Reset unread badge to 0 for a conversation (call when opening it)
    resetUnreadCount: (state, action) => {
      const conversationId = action.payload;
      const convo = state.inboxData.find(
        (c) => String(c.conversation_id) === String(conversationId)
      );
      if (convo) convo.unread_count = 0;
    },
    // Bump unread badge by 1 (call when a message arrives for a closed conversation)
    incrementUnreadCount: (state, action) => {
      const conversationId = action.payload;
      const convo = state.inboxData.find(
        (c) => String(c.conversation_id) === String(conversationId)
      );
      if (convo) convo.unread_count = (convo.unread_count || 0) + 1;
    },
  },
  extraReducers: (builder) => {
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
export const {
  updateConvoLastMessage,
  resetUnreadCount,
  incrementUnreadCount,
} = convoSlice.actions;