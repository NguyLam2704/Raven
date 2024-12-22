import React, { useState, useRef , useEffect} from "react";
import Message from "./Message";
import Logo from "../assets/qua_moi.png"
const Chat = ({ toggleChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hàm để tự động cuộn xuống cuối danh sách tin nhắn
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      console.log("Cuộn xuống cuối!");
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom(); // Gọi hàm mỗi khi danh sách tin nhắn thay đổi
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;
  
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true); // Hiển thị trạng thái loading
  
    try {
      const response = await fetch("https://us-central1-magnetic-blade-436316-f5.cloudfunctions.net/function-1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
  
      const data = await response.json();
      const botMessage = { text: data.response || "Xin lỗi, tôi không hiểu.", sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = { text: "Có lỗi xảy ra, vui lòng thử lại sau.", sender: "bot" };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
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
      <div className="bg-[#eeeeee] text-black py-3 px-4 flex justify-between items-center">
        <img
            src={Logo} // Thay đổi URL logo của bạn
            alt="Logo"
            className="h-8 w-8 mr-2"
        />
        <span className="text-lg font-semibold">Raven</span>
        <button
          onClick={toggleChat}
          className="text-black text-lg font-bold focus:outline-none"
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
          className="ml-4 bg-[#1e0342] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default Chat;
