"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Home()
{
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => 
  {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => 
  {
    scrollToBottom();

  }, [messages, loading]);

  const sendMessage = async () => 
  {
    if (!input.trim()) 
    {
      return;
    }

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try 
    {
      const { data } = await axios.post("/api/chat", { message: input });
      if (data.error) 
      {
        setMessages((prev) => [...prev, { role: "bot", text: "Error: " + data.error }]);
      } 
      else 
      {
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      }
    } 
    catch (error) 
    {
      setMessages((prev) => [...prev, { role: "bot", text: "Error: Something went wrong" }]);
    } 
    finally 
    {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-6">

      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-8">
        Gemini Chatbot
      </h1>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col h-[80vh] sm:h-[85vh] transition-all duration-300">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">

          {messages.length === 0 && !loading && ( <div className="text-center text-gray-500 mt-10"> Start the conversation! Type a message below. </div> )}
          
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-in`} >
              <div className={`max-w-[70%] p-3 rounded-2xl shadow-md transition-transform duration-200 ${ msg.role === "user" ? "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white" : "bg-gray-100 text-gray-800" }`} >
                <span className="font-semibold">{msg.role === "user" ? "You" : "Bot"}: </span>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start text-black ">
              <div className="bg-gray-100 p-3 rounded-2xl shadow-md animate-pulse">
                <span className="font-semibold">Bot: </span>
                <span className="inline-block ">...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center gap-3">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} placeholder="Type your message..." className="flex-1 p-3 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-800" disabled={loading}  />
            <button onClick={sendMessage} className={`px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-full font-semibold hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ${ loading ? "opacity-50 cursor-not-allowed" : "" }`} disabled={loading} >Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}