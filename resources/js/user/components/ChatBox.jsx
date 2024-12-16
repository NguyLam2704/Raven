import React, { useState } from "react";
import Chat from "./Chat"; // Component chứa giao diện chatbot chính

const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false); // Trạng thái toggle popup

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Mở hoặc đóng popup
  };

  return (
    <div>
      {/* Nút mở/tắt Chatbot */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 z-50"
      >
        💬
      </button>

      {/* Popup Chatbot */}
      {isChatOpen && (
        <div
          className="fixed bottom-16 right-4 w-80 h-96 bg-white rounded-lg shadow-lg z-50"
          style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }}
        >
          <Chat toggleChat={toggleChat} />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
