"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

const hashQuery = (query) => {
  return query
    .toLowerCase()
    .trim()
    .split("")
    .reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0)
    .toString();
};

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "What is a B-2 visa?",
    "What documents do I need for a US tourist visa?",
    "How much is the B-2 visa fee?",
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => 
  {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const detectLanguage = (text) => 
  {
    return /[\u0A80-\u0AFF]/.test(text) ? "Gujarati" : "English";
  };


  const isRelatedToContext = (currentQuery, recentMessages) => 
  {
    const queryLower = currentQuery.toLowerCase();

    const visaKeywords = [
      "visa",
      "student",
      "tourist",
      "documents",
      "apply",
      "eligibility",
      "process",
      "disney",
    ];

    const contextText = recentMessages.map((msg) => msg.content.toLowerCase()).join(" ");

    return visaKeywords.some((keyword) => queryLower.includes(keyword) && contextText.includes(keyword));
  };


  const refineResponse = (response, language) => 
  {

    const lines = response 
    .split("\n") 
    .filter((line) => line.startsWith("- ")) 
    .map((line) => 
    {
        
        let text = line.replace("- ", "").trim();
       
        text = text
          .replace(/sufficient/g, "enough")
          .replace(/demonstrate/g, "show")
          .replace(/applicable/g, "needed")
          .replace(/Designated Learning Institution \(DLI\)/g, "Canadian school")
          .replace(/tuition, living expenses, and return travel/g, "study and living costs");
        
        return `- ${text.slice(0, 50)}`;
      })
      .slice(0, 3);

    const intro =language === "Gujarati" ? "આ ડોક્યુમેન્ટ્સ જરૂરી છે:" : "These documents are required:";
    return `${intro}\n${lines.join("\n")}`;
  };


  const getSuggestedQuestions = (query, responseText) => 
  {
    const queryLower = query.toLowerCase();

    if (queryLower.includes("disney") || queryLower.includes("tourist")) 
    {
      return [ "How do I apply for a B-2 visa?", "What documents are needed for a Disney trip?", "How long does B-2 visa processing take?",];
    } 
    else if (queryLower.includes("eligible") || queryLower.includes("eligibility")) 
    {
      return [ "What are ties to India?", "Can I get a sponsor for funds?", "What happens in the visa interview?", ];
    } 
    else if (responseText.includes("try again")) 
    {
      return [ "Can you explain B-2 visa requirements?", "How to book a visa interview?", "What is the DS-160 form?", ];
    }
    return [ "What is a B-2 visa?", "What documents do I need for a US tourist visa?", "How much is the B-2 visa fee?", ];
  };

  const handleSendMessage = async (e, suggestedQuestion = null) => 
  {
    e.preventDefault();

    const query = suggestedQuestion || input.trim();

    if (!query) 
    {
      return;
    }

    const userMessage = { sender: "user", text: query };
    setMessages([...messages, userMessage]);

    if (!suggestedQuestion) 
    {
      setInput("");
    }
    setIsLoading(true);

    try 
    {
      const inputLanguage = detectLanguage(query);

      const queryHash = hashQuery(query);
      const cachedData = JSON.parse(localStorage.getItem("chatbotCache") || "{}");
      const cachedEntry = cachedData[queryHash];

      if (cachedEntry && cachedEntry.query.toLowerCase() === query.toLowerCase()) 
      {
        const refinedResponse = refineResponse(cachedEntry.response, inputLanguage);
        setMessages([...messages, userMessage, { sender: "bot", text: refinedResponse }]);
        setSuggestedQuestions(getSuggestedQuestions(query, refinedResponse));
        setIsLoading(false);
        return;
      }


      const recentMessages = messages.slice(-6).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const includeContext = isRelatedToContext(query, recentMessages);

      const prompt = `
        You are a visa application assistant for Indian users.
        Respond only in ${inputLanguage}, keeping answers concise (max 3-4 sentences).
        Provide answers as bullet points (- ) on new lines, focusing only on the specific query.
        Avoid irrelevant or generic information.
        If the query is about a Disney trip, focus on US B-2 tourist visa details.
        ${
          includeContext
            ? `Use the following conversation history for context:\n${recentMessages
                .map((msg) => `${msg.role}: ${msg.content}`)
                .join("\n")}`
            : ""
        }
        User query: ${query}
      `;

      const response = await axios.post("/api/gemini", { message: prompt });
      const botResponse = response.data.reply;

      cachedData[queryHash] = { query, response: botResponse, language: inputLanguage };
      localStorage.setItem("chatbotCache", JSON.stringify(cachedData));

      setMessages([...messages, userMessage, { sender: "bot", text: botResponse }]);
      setSuggestedQuestions(getSuggestedQuestions(query, botResponse));
    } 
    catch (error) 
    {
      console.error("Chatbot Error:", error.response?.data || error.message);
      const errorMessage = detectLanguage(query) === "Gujarati" ? "કંઈક ખોટું થયું, કૃપા કરીને ફરી પ્રયાસ કરો." : "Sorry, something went wrong. Please try again.";
      setMessages([...messages, userMessage, { sender: "bot", text: errorMessage }]);
      setSuggestedQuestions(getSuggestedQuestions(query, errorMessage));
    } 
    finally 
    {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 sm:w-[420px] max-w-[90vw] h-[560px] bg-white rounded-2xl shadow-2xl flex flex-col animate-slide-up overflow-hidden">

      <div className="bg-gradient-to-r from-teal-500 to-purple-700 text-white px-5 py-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h2 className="text-lg font-semibold tracking-tight">Visa Expert</h2>
        </div>
      </div>

      <div className="flex-1 p-5 bg-gray-50 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-gray-100">
        
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${ msg.sender === "user" ? "justify-end" : "justify-start" } animate-fade-in`} >
            <div className={`max-w-[75%] p-3 rounded-xl text-sm font-medium leading-relaxed shadow-sm transition-all duration-200 ${ msg.sender === "user" ? "bg-teal-500 text-white" : "bg-white text-gray-800 border border-gray-200" }`}>
              {msg.text.split("\n").map((line, i) => (
                <div key={i} className={line.startsWith("- ") ? "mt-1" : ""}>{line}</div>
              ))}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] p-3 rounded-xl bg-white text-gray-600 text-sm shadow-sm border border-gray-200">
              <span className="inline-flex items-center space-x-1">
                <span className="animate-pulse"> {detectLanguage(input) === "Typing"}</span>
                <span className="animate-pulse delay-100">.</span>
                <span className="animate-pulse delay-200">.</span>
                <span className="animate-pulse delay-300">.</span>
              </span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="px-5 py-2 bg-white border-t border-gray-200">
        <div className="flex flex-wrap gap-2 mb-2">
          {suggestedQuestions.map((q, index) => (
            <button key={index} onClick={(e) => handleSendMessage(e, q)} className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full hover:bg-teal-200 transition-all duration-200" disabled={isLoading} >{q}</button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage(e)} placeholder="Write your doubt ..." className="flex-1 px-4 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-200 placeholder-gray-600" disabled={isLoading} />
          <button onClick={handleSendMessage} className="p-2.5 bg-teal-500 text-white rounded-full hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200" disabled={isLoading} aria-label="Send message" >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" ></path>
            </svg>
          </button>
        </div>
      </div>
      
    </div>
  );
}