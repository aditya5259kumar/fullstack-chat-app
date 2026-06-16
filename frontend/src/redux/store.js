import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import ProfileReducer from "./slices/myProfileSlice";
import convoReducer from "./slices/userConvoSlice";
import getMsgReducer from "./slices/loadMsgSlice";
import searchUserReducer from "./slices/searchUserSlice";
import createConvoReducer from "./slices/createConvoSlice";
import sendMsgReducer from "./slices/sendMessageSlice";
import deleteAccReducer from "./slices/deleteAccount";
import deleteConvoReducer from "./slices/deleteConvo";
import msgStatusReducer from "./slices/msgStatusSlice";
import updateProfileReducer from "./slices/updateProfile";
import otherUserProfileReducer from "./slices/userProfileSlice";
import themeReducer from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: ProfileReducer,
    convo: convoReducer,
    getMsg: getMsgReducer,
    searchUser: searchUserReducer,
    createOrFindConvo: createConvoReducer,
    sendMsg: sendMsgReducer,
    deleteAcc: deleteAccReducer,
    deleteConvo: deleteConvoReducer,
    msgStatus: msgStatusReducer,
    updateProfile: updateProfileReducer,
    otherUserProfile: otherUserProfileReducer,
    theme: themeReducer,
  },
});

export default store;
