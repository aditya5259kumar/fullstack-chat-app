import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import AllChats from "./AllChats";
import UserChats from "./UserChats";
import { useParams, useNavigate } from "react-router";

const Home = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const { inboxData } = useSelector((state) => state.convo);

  const activeChat =
    Array.isArray(inboxData) && chatId
      ? inboxData.find((c) => String(c?.conversation_id) === String(chatId))
      : null;

  const isMobileChatOpen = !!chatId; // base this on the URL, not on inbox data being loaded yet

  function handleBack() {
    navigate("/");
  }

  return (
    // <div className="flex h-screen overflow-hidden bg-gray-50 min-w-0">
    //   <div
    //     className={`${isMobileChatOpen ? "hidden md:block" : "block"} shrink-0`}
    //   >
    //     <Navbar/>
    //   </div>

    //   {/* Chat List - hidden on mobile when chat open */}
    //   <div
    //     className={`${isMobileChatOpen ? "hidden md:flex" : "flex flex-1"} flex-col min-w-0 ring-5 ring-gray-50 border border-gray-50`}
    //   >
    //     <AllChats
    //       activeChatId={activeChat?.conversation_id}
    //       isMobileView={!isMobileChatOpen}
    //     />
    //   </div>

    //   {/* Chat Window */}
    //   <div
    //     className={`flex-1 min-w-0 ${isMobileChatOpen ? "flex" : "hidden md:flex"} flex-col`}
    //   >
    //     <UserChats chat={activeChat} onBack={handleBack} />
    //   </div>
    // </div>

    <div className="flex h-screen overflow-hidden bg-(--bg) min-w-0">
      <div className={`${isMobileChatOpen ? "hidden md:block" : "block"} shrink-0`}>
        <Navbar />
      </div>

      <div className={`${isMobileChatOpen ? "hidden md:flex" : "flex flex-1"} flex-col min-w-0`}>
        <AllChats activeChatId={chatId} isMobileView={!isMobileChatOpen} />
      </div>

      <div className={`flex-1 min-w-0 ${isMobileChatOpen ? "flex" : "hidden md:flex"} flex-col`}>
        <UserChats chat={activeChat} onBack={handleBack} />
      </div>
    </div>
  );
};

export default Home;
