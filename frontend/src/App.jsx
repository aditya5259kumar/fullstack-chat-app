import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import OtherUserProfile from "./pages/OtherUserProfile";
import { Route, Routes, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import FindUser from "./pages/FindUser";
import socket, { connectSocket } from "./socket/initSocket";
import { useEffect } from "react";
import { setOnlineUsers } from "./redux/slices/myProfileSlice";

const App = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      connectSocket();

      // Listen for online users list from server
      socket.on("get_online_users", (users) => {
        // console.log("Online users received:", users); // Add this log!
        dispatch(setOnlineUsers(users));
      });
    }

    return () => {
      socket.off("get_online_users");
      socket.off("connect");
    };
  }, [token, dispatch]);

  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route
        path="/chat/:chatId"
        element={token ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={!token ? <LogIn /> : <Navigate to="/" />} />
      <Route
        path="/signup"
        element={!token ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/profile"
        element={token ? <Profile /> : <Navigate to="/login" />}
      />

      <Route
        path="/user/:userId"
        element={token ? <OtherUserProfile /> : <Navigate to="/login" />}
      />

      <Route
        path="/settings"
        element={token ? <Settings /> : <Navigate to="/login" />}
      />
      <Route
        path="/find"
        element={token ? <FindUser /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
