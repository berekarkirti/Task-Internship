import { GoogleGenerativeAI } from "@google/generative-ai"; // GoogleGenerativeAI: Google Gemini API access lib
import { NextResponse } from "next/server"; // Next.js API's response             

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY); // genAI: based on API start use of Generative AI
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // specific model of gemini

export async function POST(req) 
{
  try 
  {
    const { message } = await req.json(); // get message from user 

    if (!message) // if user not send msg show them 400 error 
    {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const result = await model.generateContent(message); // send the msg and get response from AI
    const response = await result.response;
    const text = response.text(); // find text from the response
    return NextResponse.json({ reply: text }); // generated response by AI is sent to the user in JSON format.
  } 

  catch (error) 
  {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}