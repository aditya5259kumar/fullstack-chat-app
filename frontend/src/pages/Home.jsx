import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import AllChats from "./AllChats";
import UserChats from "./UserChats";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

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

  // theme toggle
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 min-w-0">
      <div
        className={`${isMobileChatOpen ? "hidden md:block" : "block"} shrink-0`}
      >
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* Chat List - hidden on mobile when chat open */}
      <div
        className={`${isMobileChatOpen ? "hidden md:flex" : "flex flex-1"} flex-col min-w-0 ring-5 ring-gray-50 border border-gray-50`}
      >
        <AllChats
          activeChatId={activeChat?.conversation_id}
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
