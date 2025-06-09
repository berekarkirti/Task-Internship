"use client";

import { useState } from "react";
import Chatbot from "../components/chatbot";

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-teal-600 mb-4 tracking-tight">
        Visa Services
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Your trusted partner for visa applications. Chat with our assistant!
      </p>

      {/* Floating Chat Icon */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 p-4 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
        aria-label={isChatbotOpen ? "Close chatbot" : "Open chatbot"}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isChatbotOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          )}
        </svg>
      </button>

      {/* Chatbot (Conditionally Rendered) */}
      {isChatbotOpen && <Chatbot />}
    </div>
  );
}