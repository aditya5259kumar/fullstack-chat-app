import React from "react";
import { HiMiniChatBubbleLeftEllipsis } from "react-icons/hi2";

const NoChatSelected = () => (
  <div className="h-full flex flex-col items-center justify-center text-center px-8 bg-gray-50">
    <div className="w-24 h-24 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-6">
      <HiMiniChatBubbleLeftEllipsis className="text-5xl text-[#25D366]" />
    </div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Welcome to LinkUp
    </h3>
    <p className="text-gray-400 text-sm max-w-xs">
      Select a conversation from the left to start chatting. Your messages are
      end-to-end encrypted.
    </p>
  </div>
);

export default NoChatSelected;
