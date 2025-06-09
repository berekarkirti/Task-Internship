import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    const session = await getServerSession(authOptions);

    if (!userId || !session || session.user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const chats = await db
      .collection("chats")
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json({ chats });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}