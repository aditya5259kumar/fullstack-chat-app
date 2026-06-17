import React from "react";
import { HiMiniChatBubbleLeftEllipsis } from "react-icons/hi2";

const NoChatSelected = () => (
  <div className="h-full flex flex-col items-center justify-center text-center px-8 bg-(--bg)">
    <div className="w-24 h-24 rounded-full bg-(--surface-2) flex items-center justify-center mb-6">
      <HiMiniChatBubbleLeftEllipsis className="text-5xl text-(--primary)" />
    </div>
    <h3 className="text-xl font-semibold text-(--text) mb-2">
      Welcome to LinkUp
    </h3>
    <p className="text-(--text-muted) text-sm max-w-xs">
      Select a conversation from the left to start chatting.
    </p>
  </div>
);

export default NoChatSelected;
