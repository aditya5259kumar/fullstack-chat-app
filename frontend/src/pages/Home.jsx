// import React, { useEffect } from "react";
// import { userLogout } from "../redux/slices/authSlice";
// import { myProfile } from "../redux/slices/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import AllChats from "./AllChats";
import UserChats from "./UserChats";
import BottomNavbar from "../components/BottomNavbar";

const Home = () => {
  // const { data, loading } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // console.log("data---------------------", data);

  // function logOutHandler() {
  //   dispatch(userLogout());
  //   navigate("/login");
  // }

  // useEffect(() => {
  //   dispatch(myProfile());
  // }, []);

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <div className="flex">
      {/* <h1 className="py-10 text-center text-6xl font-semibold">
        welcome to home page
      </h1>
      <div className="text-center mb-8">
        <p className="text-2xl font-semibold ">Name: {data?.name}</p>
        <p className="text-xl font-semibold text-gray-600">
          Username: @{data?.username}
        </p>
        <p className="text-xl font-semibold text-gray-600">
          email: {data?.email}
        </p>
      </div>
      <button
        onClick={logOutHandler}
        className="bg-black text-white px-6 py-3 rounded-md mx-auto"
      >
        Logout
      </button> */}

      <Navbar />
      <AllChats />
      <UserChats />
      {/* <BottomNavbar /> */}
    </div>
  );
};

export default Home;
