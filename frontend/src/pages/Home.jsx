import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

const Navbar = lazy(() => import("../components/navbar/Navbar"));
const AllChats = lazy(() => import("./AllChats"));
const UserChats = lazy(() => import("./UserChats"));

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
    <div className="flex h-screen overflow-hidden bg-(--bg) min-w-0">
      <div
        className={`${isMobileChatOpen ? "hidden md:block" : "block"} shrink-0`}
      >
        <Suspense
          fallback={
            <div className="flex items-center h-screen justify-center">
              <div className="w-5 h-5 border-2 border-(--primary) border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Navbar />
        </Suspense>
      </div>

      <div
        className={`${isMobileChatOpen ? "hidden md:flex" : "flex flex-1"} flex-col min-w-0`}
      >
        <Suspense
          fallback={
            <div className="flex justify-center h-screen items-center">
              <div className="w-5 h-5 border-2 border-(--primary) border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <AllChats activeChatId={chatId} isMobileView={!isMobileChatOpen} />
        </Suspense>
      </div>

      <div
        className={`flex-1 min-w-0 ${isMobileChatOpen ? "flex" : "hidden md:flex"} flex-col`}
      >
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <div className="w-5 h-5 border-2 border-(--primary) border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <UserChats chat={activeChat} onBack={handleBack} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
