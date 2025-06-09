import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) 
{
  try 
  {
    const { message } = await req.json();

    if (!message)
    {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const result = await model.generateContent(message);
    const response = await result.response;
    let text = response.text();

    text = text
      .replace(/(\*\*|__|\*|_)/g, "") // Remove bold/italic markdown
      .replace(/^\s*[-*]\s/gm, "- ") // Standardize bullet points
      .replace(/\n\s*\n/g, "\n") // Remove excessive newlines
      .trim(); // Remove leading/trailing whitespace

    return NextResponse.json({ reply: text });
  } 
  catch (error) 
  {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

}