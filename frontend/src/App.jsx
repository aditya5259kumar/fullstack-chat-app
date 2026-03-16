import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { Route, Routes, Navigate } from "react-router";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  console.log("token-------------", token);

  return (
    <>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />

        <Route
          path="/login"
          element={!token ? <LogIn /> : <Navigate to="/" />}
        />

        <Route
          path="/signup"
          element={!token ? <SignUp /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
