// "use client";

// import { useState, useEffect, useRef } from "react";
// import { LuBotMessageSquare } from "react-icons/lu";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";

// export default function Homepage() {
//   const { data: session, status } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const messagesEndRef = useRef(null);
//   const router = useRouter();

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     if (isChatOpen) {
//       scrollToBottom();
//     }
//   }, [messages, loading, isChatOpen]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           message: input,
//           userId: session?.user?.id || null,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessages((prev) => [
//           ...prev,
//           { role: "bot", text: data.reply },
//         ]);
//       } else {
//         setMessages((prev) => [
//           ...prev,
//           { role: "bot", text: `Error: ${data.error}` },
//         ]);
//       }
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", text: "Error: Failed to connect to the server." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleChat = () => {
//     setIsChatOpen((prev) => !prev);
//   };

//   const handleLogout = async () => {
//     await signOut({ redirect: false });
//     router.push("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex flex-col items-center justify-center p-4 sm:p-6 relative">
//       {/* Navigation */}
//       <div className="absolute top-4 right-4 flex gap-4">
//         {status === "authenticated" ? (
//           <button
//             onClick={handleLogout}
//             className="text-indigo-600 hover:text-indigo-800 font-semibold"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link
//               href="/login"
//               className="text-indigo-600 hover:text-indigo-800 font-semibold"
//             >
//               Login
//             </Link>
//             <Link
//               href="/register"
//               className="text-indigo-600 hover:text-indigo-800 font-semibold"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>

//       {/* Homepage Content */}
//       <div className="text-center">
//         <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-4">
//           Welcome to My App
//         </h1>
//         <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
//           Explore the power of AI with our interactive chatbot. Click the chat
//           icon to start chatting!
//         </p>
//       </div>

//       {/* Chatbot Window */}
//       {isChatOpen && (
//         <div className="fixed bottom-20 right-6 w-80 sm:w-[400px] h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-pop-up">
//           <div className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-t-2xl">
//             <h2 className="text-lg font-semibold">Gemini Chatbot</h2>
//             <button
//               onClick={toggleChat}
//               className="text-white hover:text-gray-200 focus:outline-none"
//             >
//               ✕
//             </button>
//           </div>
//           <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
//             {messages.length === 0 && !loading && (
//               <div className="text-center text-gray-500 mt-6 text-sm">
//                 Start the conversation! Type a message below.
//               </div>
//             )}

//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   msg.role === "user" ? "justify-end" : "justify-start"
//                 } animate-slide-in`}
//               >
//                 <div
//                   className={`max-w-[70%] p-2 rounded-xl shadow-md ${
//                     msg.role === "user"
//                       ? "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   <span className="font-semibold text-sm">
//                     {msg.role === "user" ? "You" : "Bot"}:{" "}
//                   </span>
//                   <span className="text-sm">{msg.text}</span>
//                 </div>
//               </div>
//             ))}

//             {loading && (
//               <div className="flex justify-start">
//                 <div className="bg-gray-100 p-2 rounded-xl shadow-md animate-pulse">
//                   <span className="font-semibold text-sm">Bot: </span>
//                   <span className="inline-block text-sm">...</span>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-2xl">
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder="Type your message..."
//                 className="flex-1 p-2 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 text-gray-800"
//                 disabled={loading}
//               />
//               <button
//                 onClick={sendMessage}
//                 className={`p-2 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-full hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
//                   loading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 disabled={loading}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <button
//         onClick={toggleChat}
//         className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-3 rounded-full shadow-lg hover:from-indigo-700 hover:to-indigo-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-50"
//       >
//         <LuBotMessageSquare style={{ height: "30px", width: "30px" }} />
//       </button>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { LuBotMessageSquare } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Homepage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState([{
    role: "bot",
    text: "Hey! I'm your all-in-one buddy. Ask about products, coding, recipes, studies, or anything else!",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isChatOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          userId: session?.user?.id || null,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "Something’s off—try again?" },
        ]);
      }
    } catch (error) {
      console.error("Send message error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Oops, hit a glitch! What’s next?" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex flex-col items-center justify-center p-4 sm:p-6 relative">
      <div className="absolute top-4 right-4 flex gap-4">
        {status === "authenticated" ? (
          <button
            onClick={handleLogout}
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Register
            </Link>
          </>
        )}
      </div>

      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-4">
          Welcome to My E-Commerce App
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
          Your AI buddy’s here for shopping, coding, recipes, studies, or anything you want! Hit the chat icon to dive in!
        </p>
      </div>

      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-80 sm:w-[400px] h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-pop-up">
          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-t-2xl">
            <h2 className="text-lg font-semibold">All-In-One Buddy</h2>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } animate-slide-in`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-xl shadow-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <span className="font-semibold text-sm">
                    {msg.role === "user" ? "You" : "Buddy"}:{" "}
                  </span>
                  <span className="text-sm">{msg.text}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-2 rounded-xl shadow-md animate-pulse">
                  <span className="font-semibold text-sm">Buddy: </span>
                  <span className="inline-block text-sm">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask anything—deals, code, recipes, studies!"
                className="flex-1 p-2 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 text-gray-800"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                className={`p-2 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-full hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:from-indigo-700 hover:to-pink-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-50"
      >
        <LuBotMessageSquare style={{ height: "30px", width: "30px" }} />
      </button>
    </div>
  );
}