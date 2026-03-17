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

    console.log("API RESULT:", result);
    console.log("ERROR PAYLOAD:", result.payload);

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  }

  return (
    <div className="bg-(--wa-bg-chat) min-h-screen flex items-center justify-center">
      <div className="container w-full max-w-md md:max-w-md lg:max-w-lg mx-auto flex flex-col px-4">
        <div className="flex items-center gap-2 justify-center mb-8">
          <span className="text-4xl text-(--wa-green-secondary)">
            <HiMiniChatBubbleLeftEllipsis />
          </span>
          <h4 className="text-3xl font-bold">LinkUp</h4>
        </div>

        <div className="px-6 md:px-8 lg:px-10 shadow-sm bg-white rounded-md py-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Log In</h1>
          <p className="mb-8 text-gray-500">
            Login to your LinkUp account now.
          </p>

          <form action="" onSubmit={submitHandler}>
            <div className="mb-4">
              <p className="text-start mb-1 ">Email</p>
              <div className="flex items-center border text-sm border-gray-200 rounded-md overflow-hidden">
                <span className="bg-gray-100 px-3.5 py-3 text-base border-r border-gray-200">
                  <HiOutlineEnvelope />
                </span>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter Your Email"
                  className="text-sm w-full px-4 py-2.5 focus:border-none focus:outline-none "
                />
              </div>
              {error.email && (
                <p className="mt-1 ml-1 text-xs text-red-700 text-start">
                  {error.email}
                </p>
              )}
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <p className="text-start">Password</p>
                <a
                  href=""
                  className="block font-semibold text-(--wa-green-secondary)"
                >
                  Forgot Password
                </a>
              </div>
              <div className=" flex w-full items-center border border-gray-200 rounded-md">
                <span className="bg-gray-100 px-3.5 p-3 text-base border-r border-gray-200">
                  <HiMiniLockClosed />
                </span>
                <div className="flex items-center w-full">
                  <input
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Enter Your Password"
                    className="text-sm w-full pl-4 py-2.5 focus:outline-none "
                  />
                  <span
                    className="text-md text-gray-500 py-2.5 px-3"
                    onClick={handleShowPassword}
                  >
                    {passwordShow ? (
                      <HiOutlineEye className="text-black" />
                    ) : (
                      <HiOutlineEyeOff />
                    )}
                  </span>
                </div>
              </div>
              {error.password && (
                <p className="mt-1 ml-1 text-xs text-red-700 text-start">
                  {error.password}
                </p>
              )}
            </div>

            {authError && (
              <p className="text-sm py-3 border border-red-700 rounded-md bg-red-100 text-center text-red-700 mb-4">
                {authError}
              </p>
            )}

            <button className="w-full mb-4 bg-(--wa-green-secondary) border-(--wa-green-dark) hover:bg-(--wa-green-dark) text-white py-4 rounded-md text-sm font-medium transition-all ease-in-out">
              {loading ? "Loading..." : "Log In"}
            </button>
          </form>
        </div>
        <p className="mt-8 text-center">
          Don't have an account ?{" "}
          <Link to="/signup" className="text-(--wa-green-secondary) font-bold">
            Signin
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
