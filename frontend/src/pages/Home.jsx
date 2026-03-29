// // import React, { useState,useEffect } from "react";
// // import { userLogout } from "../redux/slices/authSlice";
// // import { myProfile } from "../redux/slices/userSlice";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router";
// import Navbar from "../components/Navbar";
// import AllChats from "./AllChats";
// import UserChats from "./UserChats";

// const Home = () => {
//   // const { data, loading } = useSelector((state) => state.user);
//   // const dispatch = useDispatch();
//   // const navigate = useNavigate();

//   // console.log("data---------------------", data);

//   // function logOutHandler() {
//   //   dispatch(userLogout());
//   //   navigate("/login");
//   // }

//   // useEffect(() => {
//   //   dispatch(myProfile());
//   // }, []);

//   // if (loading) {
//   //   return <h1>Loading...</h1>;
//   // }

//   // const [chatWindow, setChatWindow] = useState(true)

//   return (
//     <div className="flex">
//       {/* <h1 className="py-10 text-center text-6xl font-semibold">
//         welcome to home page
//       </h1>
//       <div className="text-center mb-8">
//         <p className="text-2xl font-semibold ">Name: {data?.name}</p>
//         <p className="text-xl font-semibold text-gray-600">
//           Username: @{data?.username}
//         </p>
//         <p className="text-xl font-semibold text-gray-600">
//           email: {data?.email}
//         </p>
//       </div>
//       <button
//         onClick={logOutHandler}
//         className="bg-black text-white px-6 py-3 rounded-md mx-auto"
//       >
//         Logout
//       </button> */}

//       <Navbar />
//       <AllChats />
//       <UserChats />
//     </div>
//   );
// };

// export default Home;

// -------------------------------------------------------------------------------

// import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import AllChats from "./AllChats";
import UserChats from "./UserChats";
import { useParams, useNavigate } from "react-router";

const Home = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const { inboxData } = useSelector((state) => state.convo);

  // Find the active chat based on URL parama

  const activeChat =
  Array.isArray(inboxData) && chatId
    ? inboxData.find((c) => c?.conversation_id === parseInt(chatId))
    : null;

  // On mobile: show chat list if no chat selected, show chat if selected
  const isMobileChatOpen = !!activeChat;

  function handleBack() {
    navigate("/");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 min-w-0">
      {/* Sidebar Navbar - always visible on desktop, hidden on mobile when chat open */}
      <div
        className={`${isMobileChatOpen ? "hidden md:block" : "block"} shrink-0`}
      >
        <Navbar />
      </div>

      {/* Chat List - hidden on mobile when chat open */}
      <div
        className={`${isMobileChatOpen ? "hidden md:flex" : "flex flex-1"} flex-col min-w-0 ring-5 ring-gray-50 border border-gray-50`}
      >
        <AllChats
          activeChatId={activeChat?.conversation_id}
          // onSelectChat={() => {}}
          isMobileView={!isMobileChatOpen}
        />
      </div>

      {/* Chat Window */}
      <div
        className={`flex-1 min-w-0 ${isMobileChatOpen ? "flex" : "hidden md:flex"} flex-col`}
      >
        <UserChats chat={activeChat} onBack={handleBack} />
      </div>
    </div>
  );
};

export default Home;
