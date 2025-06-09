import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { franc } from "franc";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) 
{
  try 
  {
    const { message, history } = await req.json();

    if (!message) 
    {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const detectedLang = franc(message, { minLength: 3 }) || "und";

    const historyText = history.map((msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`).join("\n");

    const safePrompt = `You are a healthcare assistant. Provide brief, non-diagnostic info on healthcare topics in the language with code "${detectedLang}" (default to English if unclear). Keep responses short (1-2 sentences). Include tips like: cover sneezes, eat healthy, sleep 7-9 hours, manage stress, stay hydrated when relevant. No diagnoses or prescriptions. Redirect non-healthcare queries. Conversation history:\n${historyText}\nCurrent Query: ${message}`;

    const result = await model.generateContent(safePrompt);
    const response = await result.response;
    let text = response.text().replace(/(\*\*|__|\*|_)/g, "");

    return NextResponse.json({ reply: text });
  } 
  catch (error) 
  {
    console.error("Error in healthcare API:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}