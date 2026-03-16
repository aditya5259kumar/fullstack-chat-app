import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import { userSignUp } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
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
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
    const emailRegex = /^[a-zA-Z][^\s@]*@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!#$%^&*_+=<>]).{8,}$/;

    if (!formData.name) {
      newError.name = "name is required!";
    }

    if (!formData.username) {
      newError.username = "username is required!";
    } else if (!usernameRegex.test(formData.username)) {
      newError.username =
        "username must start with a letter and be 3–20 characters long. Only letters, numbers and '_' allowed.";
    }

    if (!formData.email) {
      newError.email = "email is required!";
    } else if (!emailRegex.test(formData.email)) {
      newError.email = "invalid email address!";
    }

    if (!formData.password) {
      newError.password = "password is required!";
    }
    //  else if (!passwordRegex.test(formData.password)) {
    //   newError.password =
    //     "password must contain a lowercase letter, uppercase letter, number, special character";
    // }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    console.log("formData--------------", formData);
    const result = await dispatch(userSignUp(formData));

    console.log("API RESULT:", result);
    console.log("ERROR PAYLOAD:", result.payload);

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  }

  return (
    <div className="">
      <div className="container px-8 md:px-20 py-4 mx-auto my-20">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="rounded-t-xl md:rounded-l-2xl md:rounded-none py-10 flex items-center justify-center flex-col bg-linear-to-r from-gray-900 to-gray-600 text-white">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="py-6 px-10 text-center text-sm">
              To keep connected with us please login with your personal info
            </p>
            <Link to="/login">
              <button className="bg-white text-black border border-white hover:bg-transparent hover:text-white px-7 py-4 rounded-lg text-sm font-medium transition-all ease-in-out">
                Log In
              </button>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-b-xl md:rounded-r-2xl md:rounded-none py-10 shadow-2xl text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>

            <form action="" onSubmit={submitHandler}>
              <div className="px-10 md:px-8 lg:px-20 mt-8">
                {error.name && (
                  <p className="mb-1.5 ml-1 text-xs text-red-700 text-start">
                    {error.name}
                  </p>
                )}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleOnChange}
                  placeholder="Enter Your Full Name"
                  className=" bg-white border text-sm border-gray-300 w-full px-6 py-4 focus:border-gray-600 focus:outline-none rounded-lg mb-6 "
                />
                {error.username && (
                  <p className="mb-1.5 ml-1 text-xs text-red-700 text-start">
                    {error.username}
                  </p>
                )}
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleOnChange}
                  placeholder="Enter Your username"
                  className=" bg-white border text-sm border-gray-300 w-full px-6 py-4 focus:border-gray-600 focus:outline-none rounded-lg mb-6 "
                />
                {error.email && (
                  <p className="mb-1.5 ml-1 text-xs text-red-700 text-start">
                    {error.email}
                  </p>
                )}
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter Your Email"
                  className=" bg-white border text-sm border-gray-300 w-full px-6 py-4 focus:border-gray-600 focus:outline-none rounded-lg mb-6 "
                />
                {error.password && (
                  <p className="mb-1.5 ml-1 text-xs text-red-700 text-start">
                    {error.password}
                  </p>
                )}
                <div className=" bg-white flex w-full items-center justify-center border border-gray-300 focus-within:border-gray-600 rounded-lg mb-6">
                  <input
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Enter Your Password"
                    className="text-sm w-full pl-6 py-4 focus:outline-none "
                  />
                  <span
                    className="text-xl text-gray-500 mx-5"
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

              {authError && (
                <p className="text-sm text-center text-red-700 mb-4">
                  {authError}
                </p>
              )}
              <button className="mb-4 bg-gray-700 border border-gray-700 hover:bg-transparent text-white hover:text-black px-7 py-4 rounded-lg text-sm font-medium transition-all ease-in-out">
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
