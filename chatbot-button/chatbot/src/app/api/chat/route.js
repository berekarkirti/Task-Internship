// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";
// import { connectToDatabase } from "../../lib/mongodb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// export async function POST(req) {
//   try {
//     const { message, userId } = await req.json();
//     const session = await getServerSession(authOptions);

//     if (!message) {
//       return NextResponse.json({ error: "Message is required" }, { status: 400 });
//     }

//     let prompt = message;

//     // Check if user is authenticated and matches the provided userId
//     if (session && session.user.id === userId) {
//       const { db } = await connectToDatabase();
//       const purchases = await db
//         .collection("purchases")
//         .find({ userId })
//         .toArray();

//       if (purchases.length > 0) {
//         const purchaseList = purchases
//           .map((p) => `${p.productName} (Purchased on ${new Date(p.purchaseDate).toLocaleDateString()})`)
//           .join(", ");
//         prompt = `The user has previously purchased: ${purchaseList}. Provide a response to the following message tailored to their purchase history: "${message}"`;
//       } else {
//         prompt = `The user has no purchase history. Provide a generic response to: "${message}"`;
//       }
//     } else {
//       prompt = `The user is not logged in. Provide a generic response to: "${message}"`;
//     }

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     return NextResponse.json({ reply: text });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";
// import { connectToDatabase } from "../../lib/mongodb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Simulated product catalog (replace with MongoDB products collection if available)
// const productCatalog = [
//   { id: 1, name: "Laptop", category: "Electronics", price: 999.99, onSale: false },
//   { id: 2, name: "Headphones", category: "Electronics", price: 99.99, onSale: true },
//   { id: 3, name: "Smartphone", category: "Electronics", price: 699.99, onSale: false },
//   { id: 4, name: "T-Shirt", category: "Clothing", price: 19.99, onSale: true },
// ];

// export async function POST(req) {
//   try {
//     const { message, userId } = await req.json();
//     if (!message) {
//       return NextResponse.json({ error: "Message is required" }, { status: 400 });
//     }

//     const session = await getServerSession(authOptions);
//     if (userId && (!session || session.user.id !== userId)) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     let db;
//     try {
//       const connection = await connectToDatabase();
//       db = connection.db;
//     } catch (dbError) {
//       console.error("MongoDB connection error:", dbError);
//       return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
//     }

//     // Save user message
//     if (userId) {
//       await db.collection("chats").insertOne({
//         userId,
//         role: "user",
//         text: message,
//         timestamp: new Date(),
//       });
//     }

//     const lowerMessage = message.toLowerCase().trim();
//     let reply = "";

//     if (lowerMessage.includes("order") || lowerMessage.includes("track") || lowerMessage.includes("status")) {
//       const purchases = userId
//         ? await db.collection("purchases").find({ userId }).toArray()
//         : [];
//       reply = purchases.length > 0
//         ? `Your recent orders include: ${purchases.map((p) => `${p.productName} (Purchased on ${new Date(p.purchaseDate).toLocaleDateString()})`).join(", ")}. Need more details?`
//         : "No orders found. Ready to shop? Ask about our products!";
//     } else if (
//       lowerMessage.includes("product") ||
//       lowerMessage.includes("laptop") ||
//       lowerMessage.includes("headphones") ||
//       lowerMessage.includes("sale")
//     ) {
//       const matchedProducts = productCatalog.filter((p) =>
//         lowerMessage.includes(p.name.toLowerCase()) ||
//         lowerMessage.includes(p.category.toLowerCase()) ||
//         (lowerMessage.includes("sale") && p.onSale)
//       );
//       reply = matchedProducts.length > 0
//         ? "Here’s what I found:\n" + matchedProducts.map((p) => `${p.name} (${p.category}) - $${p.price}${p.onSale ? " (On Sale!)" : ""}`).join("\n")
//         : "No products match that query. Try 'laptops', 'sales', or 'electronics'!";
//     } else if (
//       lowerMessage.includes("return") ||
//       lowerMessage.includes("refund") ||
//       lowerMessage.includes("support")
//     ) {
//       reply = "For returns or support, email us at support@myapp.com or visit our Help page. Anything else I can assist with?";
//     } else {
//       let chatHistory = userId
//         ? await db.collection("chats").find({ userId }).sort({ timestamp: -1 }).limit(10).toArray()
//         : [];
//       const historyText = chatHistory.length > 0
//         ? "Previous conversation:\n" + chatHistory.map((chat) => `${chat.role === "user" ? "User" : "Assistant"}: ${chat.text}`).join("\n")
//         : "No previous conversation.";

//       const prompt = `
//         You are a friendly e-commerce chatbot. Assist with shopping, answer product questions, or provide support without referencing past purchases unless asked about orders. Use this chat history to inform your response, but don't mention it explicitly:

//         ${historyText}

//         Current user message: "${message}"

//         Respond in a helpful, conversational tone, relevant to e-commerce. Suggest related items naturally if the user asked about products before.
//       `;

//       try {
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         reply = response.text().replace(/[*_#]+/g, "");
//       } catch (geminiError) {
//         console.error("Gemini API error:", geminiError);
//         reply = "Sorry, I couldn’t process that request. Try asking about products or orders!";
//       }
//     }

//     // Save bot response
//     if (userId) {
//       await db.collection("chats").insertOne({
//         userId,
//         role: "bot",
//         text: reply,
//         timestamp: new Date(),
//       });
//     }

//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const productCatalog = [
//   { id: 1, name: "Laptop", category: "Electronics", price: 999.99, onSale: false },
//   { id: 2, name: "Headphones", category: "Electronics", price: 99.99, onSale: true },
//   { id: 3, name: "Smartphone", category: "Electronics", price: 699.99, onSale: false },
//   { id: 4, name: "T-Shirt", category: "Clothing", price: 19.99, onSale: true },
// ];

export async function POST(req) {
  try {
    const { message, userId } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (userId && (!session || session.user.id !== userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let db;
    try {
      const connection = await connectToDatabase();
      db = connection.db;
    } catch (dbError) {
      console.error("MongoDB error:", dbError);
      return NextResponse.json({ error: "Database issue" }, { status: 500 });
    }

    // Save user message
    if (userId) {
      await db.collection("chats").insertOne({
        userId,
        role: "user",
        text: message,
        timestamp: new Date(),
      });
    }

    const lowerMessage = message.toLowerCase().trim();
    let reply = "";

    // E-commerce intents
    if (lowerMessage.includes("order") || lowerMessage.includes("track") || lowerMessage.includes("status")) {
      const purchases = userId
        ? await db.collection("purchases").find({ userId }).toArray()
        : [];
      reply = purchases.length > 0
        ? `Your orders: ${purchases.map((p) => `${p.productName} (${new Date(p.purchaseDate).toLocaleDateString()})`).join(", ")}. More details?`
        : "No orders yet. Wanna shop?";
    } else if (lowerMessage.includes("electronics")) {
      const matchedProducts = productCatalog.filter((p) => p.category.toLowerCase() === "electronics");
      reply = matchedProducts.length > 0
        ? "Electronics available:\n" + matchedProducts.map((p) => `${p.name} - $${p.price}${p.onSale ? " (Sale!)" : ""}`).join("\n")
        : "No electronics right now. Try clothing?";
    } else if (lowerMessage.includes("sale")) {
      const matchedProducts = productCatalog.filter((p) => p.onSale);
      reply = matchedProducts.length > 0
        ? "On sale:\n" + matchedProducts.map((p) => `${p.name} (${p.category}) - $${p.price}`).join("\n")
        : "No sales now. Other deals?";
    } else if (lowerMessage.includes("return")) {
      reply = "To return an item, email support@myapp.com with order details. Need help?";
    } else if (lowerMessage.includes("refund")) {
      reply = "For refunds, contact support@myapp.com with your order ID. Want guidance?";
    } else if (
      lowerMessage.includes("khana") ||
      lowerMessage.includes("eat") ||
      lowerMessage.includes("khaya")
    ) {
      reply = "Nahi bhai, main nahi khata, main AI hu! Tu bol, kya chal raha hai?";
    } else if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      reply = "Yo, what’s up? Ready to dive into shopping, coding, or something else?";
    } else if (lowerMessage.includes("aaram")) {
      reply = "Aaram se, bhai! Chilling or got something on your mind?";
    } else if (lowerMessage.includes("joke")) {
      if (message.includes("Why did the laptop go to therapy?")) {
        reply = "Haha, love it! Too many ‘byte’-sized problems? Here’s one: Why did the smartphone skip class? It was too *cell-f*conscious!";
      } else {
        reply = "Why did the computer crash? Too much *byte*! Got a joke to share?";
      }
    } else {
      let chatHistory = userId
        ? await db.collection("chats").find({ userId }).sort({ timestamp: -1 }).limit(5).toArray()
        : [];
      const historyText = chatHistory.length > 0
        ? "Past chats:\n" + chatHistory.map((chat) => `${chat.role === "user" ? "User" : "Bot"}: ${chat.text}`).join("\n")
        : "No past chats.";

      const prompt = `
        You’re All-In-One Buddy, a versatile chatbot like ChatGPT or Grok. Answer ANY question accurately and naturally, including coding (e.g., write code with examples), recipes (e.g., step-by-step cooking), study topics (e.g., explain concepts clearly), product info (e.g., e-commerce details), or casual chats (e.g., jokes, fun replies). Focus ONLY on the current question. Use past chats ONLY to clarify vague references (e.g., "it" or "that")—don’t bring up unrelated topics. For e-commerce, use the product catalog if relevant. For casual queries, be witty like a friend. Don’t mention past purchases unless asked about orders. If unclear, ask for clarification.

        Product catalog:
        ${JSON.stringify(productCatalog, null, 2)}

        Past chats (for clarity only):
        ${historyText}

        Current question: "${message}"

        Respond directly with a conversational, accurate answer. For code, use markdown code blocks. For recipes, list steps. For studies, explain clearly. For products, reference catalog if relevant.
      `;

      try {
        if (!process.env.GEMINI_API_KEY) {
          throw new Error("Missing GEMINI_API_KEY");
        }
        const result = await model.generateContent(prompt);
        const response = await result.response;
        reply = response.text().replace(/[*_#]+/g, "");
      } catch (geminiError) {
        console.error("Gemini error:", geminiError);
        reply = "Hmm, got a hiccup there. Wanna try another question—maybe about code, food, or deals?";
      }
    }

    // Save bot response
    if (userId) {
      await db.collection("chats").insertOne({
        userId,
        role: "bot",
        text: reply,
        timestamp: new Date(),
      });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something broke—try again!" }, { status: 500 });
  }
}