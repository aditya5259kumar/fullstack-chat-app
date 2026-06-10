import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import convoReducer from "./slices/userConvoSlice";
import getMsgReducer from "./slices/loadMsgSlice";
import searchUserReducer from "./slices/searchUserSlice";
import createConvoReducer from "./slices/createConvoSlice";
import sendMsgReducer from "./slices/sendMessageSlice";
import deleteAccReducer from "./slices/deleteAccount";
import deleteConvoReducer from "./slices/deleteConvo";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    convo: convoReducer,
    getMsg: getMsgReducer,
    searchUser: searchUserReducer,
    createOrFindConvo: createConvoReducer,
    sendMsg: sendMsgReducer,
    deleteAcc: deleteAccReducer,
    deleteConvo: deleteConvoReducer,
  },
});

export default store;
