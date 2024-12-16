import ReactMarkdown from "react-markdown";
const Message = ({ text, sender }) => {
    const isUser = sender === "user";
  
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} items-start`}>
        <div
          className={`p-3 max-w-[75%] break-words rounded-lg ${
            isUser
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-300 text-black rounded-bl-none"
          }`}
          style={{ textAlign: "justify" }}
        >
          {/* Hiển thị nội dung Markdown bằng ReactMarkdown */}
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    );
  };
  
  export default Message;
  