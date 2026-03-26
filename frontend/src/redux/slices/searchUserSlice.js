import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Get all users
export const allUsers = createAsyncThunk("users/all", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:4000/api/user/users",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data.users;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Error");
  }
});

// ✅ Search users
export const searchUsers = createAsyncThunk(
  "users/search",
  async (query, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:4000/api/user/search?query=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.users;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
    }
  }
);

const searchUserSlice = createSlice({
  name: "searchUser",
  initialState: {
    allUsers: [],
    searchedUsers: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetSearch: (state) => {
      state.searchedUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 All users
      .addCase(allUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Search users
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedUsers = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSearch } = searchUserSlice.actions;
export default searchUserSlice.reducer;