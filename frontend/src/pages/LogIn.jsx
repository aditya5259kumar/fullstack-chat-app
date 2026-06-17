import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import {
  HiMiniChatBubbleLeftEllipsis,
  HiOutlineEnvelope,
  HiMiniLockClosed,
} from "react-icons/hi2";

import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/slices/authSlice";

const LogIn = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const { loading, error: authError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleShowPassword() {
    setPasswordShow(() => !passwordShow);
  }

  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  async function submitHandler(e) {
    e.preventDefault();

    const newError = {};
    const emailRegex = /^[a-zA-Z][^\s@]*@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newError.email = "Email is required!";
    } else if (!emailRegex.test(formData.email)) {
      newError.email = "Invalid email address!";
    }

    if (!formData.password) {
      newError.password = "Password is required!";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    const result = await dispatch(userLogin(formData));

    // console.log("API RESULT----------------:", result);
    // console.log("ERROR PAYLOAD---------------:", result.payload);

    if (result.meta.requestStatus === "fulfilled") {
      // connectSocket(result.payload.user.id);
      navigate("/");
    }
    // console.log("FINAL PAYLOAD----------------------:", result.payload);
  }

  return (
    <div className="bg-(--bg) min-h-screen flex items-center justify-center">
      <div className="container w-full max-w-md md:max-w-md lg:max-w-lg mx-auto flex flex-col px-4">
        <div className="flex items-center gap-2 justify-center mb-6">
          <span className="text-4xl text-(--primary)">
            <HiMiniChatBubbleLeftEllipsis />
          </span>
          <h4 className="text-3xl font-bold text-(--text)">LinkUp</h4>
        </div>

        <div className="px-4 md:px-6 lg:px-8 shadow-(--shadow) bg-(--surface) rounded-md py-6 text-center">
          <h1 className="text-2xl font-semibold mb-2 text-(--text)">Log In</h1>
          <p className="mb-8 text-sm text-(--text-muted)">
            Login to your LinkUp account now.
          </p>

          <form action="" onSubmit={submitHandler}>
            <div className="mb-4">
              <p className="text-start text-sm mb-1 text-(--text)">Email</p>
              <div className="flex items-center border text-sm border-(--border) rounded-md overflow-hidden">
                <span className="bg-(--surface-2) px-3.5 py-3 text-base border-r border-(--border) text-(--text-muted)">
                  <HiOutlineEnvelope />
                </span>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter Your Email"
                  className="text-sm w-full px-2 py-2.5 focus:border-none focus:outline-none bg-transparent text-(--input-text) placeholder-(--placeholder)"
                />
              </div>
              {error.email && (
                <p className="mt-1 ml-1 text-xs text-(--error) text-start">
                  {error.email}
                </p>
              )}
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <p className="text-start text-sm text-(--text)">Password</p>
                {/* <a href="" className="block font-semibold text-(--primary)">
                  Forgot Password
                </a> */}
              </div>
              <div className=" flex w-full items-center border border-(--border) rounded-md">
                <span className="bg-(--surface-2) px-3.5 p-3 text-base border-r border-(--border) text-(--text-muted)">
                  <HiMiniLockClosed />
                </span>
                <div className="flex items-center w-full">
                  <input
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Enter Your Password"
                    className="text-sm w-full pl-2 py-2.5 focus:outline-none bg-transparent text-(--input-text) placeholder-(--placeholder)"
                  />
                  <span
                    className="text-md text-(--text-muted) py-2.5 px-3 cursor-pointer hover:text-(--text)"
                    onClick={handleShowPassword}
                  >
                    {passwordShow ? (
                      <HiOutlineEye className="text-(--text)" />
                    ) : (
                      <HiOutlineEyeOff />
                    )}
                  </span>
                </div>
              </div>
              {error.password && (
                <p className="mt-1 ml-1 text-xs text-(--error) text-start">
                  {error.password}
                </p>
              )}
            </div>

            {authError && (
              <p className="text-sm py-2.5 border border-(--error) rounded-md bg-(--error)/10 text-center text-(--error) mb-4">
                {authError}
              </p>
            )}

            <button
              disabled={loading}
              className={`w-full  mb-4 cursor-pointer text-white py-3 rounded-md text-sm font-medium transition-all ease-in-out ${loading ? "bg-(--chat-user)" : "bg-(--primary)"}`}
            >
              {loading ? (
                <div className="flex justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
        <p className="text-sm mt-6 text-center text-(--text)">
          Don't have an account ?{" "}
          <Link
            to="/signup"
            className="text-(--primary) font-bold hover:text-(--primary-hover)"
          >
            Signin
          </Link>
        </p>
        <p className="text-(--text-muted) mt-2 text-xs text-center">
          © 2026 LinkUp. Created with ❤️ by Aditya Kumar
        </p>
      </div>
    </div>
  );
};

export default LogIn;
