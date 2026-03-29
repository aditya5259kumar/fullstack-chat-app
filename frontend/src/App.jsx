// import Home from "./pages/Home";
// import SignUp from "./pages/SignUp";
// import LogIn from "./pages/LogIn";
// import { Route, Routes, Navigate } from "react-router";
// import { useSelector } from "react-redux";

// const App = () => {
//   const { token } = useSelector((state) => state.auth);

//   console.log("token-------------", token);

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />

//         <Route
//           path="/login"
//           element={!token ? <LogIn /> : <Navigate to="/" />}
//         />

//         <Route
//           path="/signup"
//           element={!token ? <SignUp /> : <Navigate to="/" />}
//         />
//       </Routes>
//     </>
//   );
// };

// export default App;

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { Route, Routes, Navigate } from "react-router";
import { useSelector } from "react-redux";
import FindUser from "./pages/FindUser";
import socket, { connectSocket } from "./socket/initSocket";
import { useEffect } from "react";

const App = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      connectSocket();

      // Once connected, tell the server which user this socket belongs to
      if (user?.id) {
        socket.emit("register_user", user.id);
      }
    }
  }, [token, user?.id]);

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
