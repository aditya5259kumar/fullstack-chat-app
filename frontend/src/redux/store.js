import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import convoReducer from "./slices/userConvoSlice";
import getMsgReducer from "./slices/loadMsgSlice";
import searchUserReducer from "./slices/searchUserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    convo: convoReducer,
    getMsg: getMsgReducer,
    searchUser: searchUserReducer,
  },
});

export default store;
