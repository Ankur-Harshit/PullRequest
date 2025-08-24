import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { targetUserId } = useParams();
  const user = useSelector((store)=>store.user);
  const userId = user?._id;
  const now = new Date();

  useEffect(()=>{
    if(!user) return;
    const socket = createSocketConnection();
    // as soon as the page loads, the socket connection is made and joinChat Event is emitted
    socket.emit("joinChat", {firstName: user.firstName ,userId, targetUserId}); // handle event in backend

    socket.on("messageRecieved", ({firstName, text, userId, time,})=>{

        setMessages((messages)=>[...messages, {firstName, text, userId, time,}]); // do this to append in state variables
    });

    return ()=>{
        socket.disconnect();
    }
  }, [userId, targetUserId]);

  const sendMessage = ()=>{
    const socket = createSocketConnection();
    socket.emit("sendMessage", 
        {firstName: user.firstName ,userId, targetUserId, text:newMessage, time:now.toLocaleTimeString(),});
    setNewMessage("");
  };

  return (
  <div className="w-full sm:w-2/3 lg:w-1/2 mx-auto bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-2xl shadow-xl m-5 h-[85vh] flex flex-col overflow-hidden">
    
    {/* Header */}
    <h1 className="p-5 border-b border-gray-700 text-xl font-semibold text-gray-200 bg-gray-800 sticky top-0">
      💬 Chat
    </h1>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      {messages.map((msg, index) => {
        const isOwnMessage = msg.userId === userId;

        return (
          <div
            key={index}
            className={`flex flex-col max-w-[75%] ${
              isOwnMessage ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <span className="font-medium text-gray-300">{msg.firstName}</span>
              <time>{msg.time}</time>
            </div>

            {/* Message Bubble */}
            <div
              className={`px-4 py-2 rounded-2xl text-sm shadow-md ${
                isOwnMessage
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-200 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>

            {/* Footer */}
            <div className="text-[10px] text-gray-500 mt-1">
              {isOwnMessage ? "Sent ✓" : "Seen"}
            </div>
          </div>
        );
      })}
    </div>

    {/* Input Area */}
    <div className="p-4 border-t border-gray-700 flex items-center gap-2 bg-gray-800">
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-1 bg-gray-900 border border-gray-600 text-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition shadow-md"
      >
        Send
      </button>
    </div>
  </div>
);


};
export default Chat;
