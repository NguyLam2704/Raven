import React, { useState, useRef } from "react";
import Message from "./Message";

const Chat = ({ toggleChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botMessage = { text: "Đây là phản hồi từ bot.", sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInput("");
    adjustTextareaHeight(); // Reset chiều cao sau khi gửi tin nhắn
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset chiều cao
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Điều chỉnh theo nội dung
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-500 text-white py-3 px-4 flex justify-between items-center">
        <span className="text-lg font-semibold">Raven Helper</span>
        <button
          onClick={toggleChat}
          className="text-white text-lg font-bold focus:outline-none"
        >
          ✕
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-100">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      {/* Input box */}
      <div className="flex items-start border-t border-gray-300 p-4">
        <textarea
          ref={textareaRef}
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none resize-none"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={handleInputChange}
          rows={1}
        />
        <button
          onClick={sendMessage}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default Chat;
