// import axios from "axios";
// import { useState } from "react";

// function AIChat() {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");

//   const sendMessage = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/v1/aireceptionist/ask-ai",
//         { message }
//       );

//       setResponse(res.data.reply);

//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>AI Receptionist</h2>

//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Ask something..."
//       />

//       <button onClick={sendMessage}>
//         Send
//       </button>

//       <p><strong>AI:</strong> {response}</p>
//     </div>
//   );
// }

// export default AIChat;




// import axios from "axios";
// import { useState, useRef, useEffect } from "react";

// function AIChat() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     const userMessage = message;
//     setChat((prev) => [...prev, { role: "user", text: userMessage }]);
//     setMessage("");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/v1/aireceptionist/ask-ai",
//         // { message: userMessage }
//          { chat: [...chat, { role: "user", text: userMessage }] }
//       );

//       setChat((prev) => [
//         ...prev,
//         { role: "ai", text: res.data.reply || "No response received." }
//       ]);

//     } catch (error) {
//       setChat((prev) => [
//         ...prev,
//         { role: "ai", text: "Error fetching response." }
//       ]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#343541] flex flex-col">
      
//       {/* Header */}
//       <div className="text-white text-center py-4 border-b border-gray-600">
//         <h1 className="text-xl font-semibold">AI Receptionist</h1>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-6">
//         {chat.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               msg.role === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`max-w-xl px-4 py-3 rounded-lg text-sm ${
//                 msg.role === "user"
//                   ? "bg-[#10a37f] text-white"
//                   : "bg-[#444654] text-white"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}

//         {loading && (
//           <div className="text-gray-400 text-sm">AI is typing...</div>
//         )}

//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Input */}
//       <div className="border-t border-gray-600 p-4 flex gap-3 bg-[#40414f]">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Send a message..."
//           className="flex-1 bg-[#343541] text-white px-4 py-2 rounded-md focus:outline-none"
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-[#10a37f] hover:bg-[#0e8f6d] text-white px-6 py-2 rounded-md"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AIChat;

// import axios from "axios";
// import { useState, useRef, useEffect } from "react";

// function AIChat() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     const userMessage = message;

//     const updatedChat = [...chat, { role: "user", text: userMessage }];

//     setChat(updatedChat);
//     setMessage("");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/v1/aireceptionist/ask-ai",
//         { chat: updatedChat }
//       );

//       setChat(prev => [
//         ...prev,
//         { role: "ai", text: res.data.reply || "No response received." }
//       ]);

//     } catch (error) {
//       setChat(prev => [
//         ...prev,
//         { role: "ai", text: "Error fetching response." }
//       ]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#343541] flex flex-col">

//       {/* Header */}
//       <div className="text-white text-center py-4 border-b border-gray-600">
//         <h1 className="text-xl font-semibold">AI Receptionist</h1>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-6">
//         {chat.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               msg.role === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`max-w-xl px-4 py-3 rounded-lg text-sm ${
//                 msg.role === "user"
//                   ? "bg-[#10a37f] text-white"
//                   : "bg-[#444654] text-white"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}

//         {loading && (
//           <div className="text-gray-400 text-sm">AI is typing...</div>
//         )}

//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Input */}
//       <div className="border-t border-gray-600 p-4 flex gap-3 bg-[#40414f]">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Send a message..."
//           className="flex-1 bg-[#343541] text-white px-4 py-2 rounded-md focus:outline-none"
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-[#10a37f] hover:bg-[#0e8f6d] text-white px-6 py-2 rounded-md"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AIChat;