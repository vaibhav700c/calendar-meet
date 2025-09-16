import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    
    const client = await clientPromise;
    const db = client.db("baldmann");
    const collection = db.collection("applications");
    
    let searchFilter = {};
    
    if (query && query.trim() !== "") {
      searchFilter = {
        $or: [
          { startupname: { $regex: query, $options: "i" } },
          { fullname: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { stage: { $regex: query, $options: "i" } },
          { audience: { $regex: query, $options: "i" } },
        ],
      };
    }
    
    const startups = await collection.find(searchFilter).toArray();
    
    // Convert MongoDB ObjectId to string and format dates
    const formattedStartups = startups.map((startup) => ({
      ...startup,
      _id: startup._id.toString(),
      created_at: startup.created_at ? 
        new Date(startup.created_at.$date?.$numberLong || startup.created_at).toISOString() : 
        null,
      updated_at: startup.updated_at ? 
        new Date(startup.updated_at.$date?.$numberLong || startup.updated_at).toISOString() : 
        null,
    }));
    
    return NextResponse.json({ 
      success: true, 
      data: formattedStartups 
    });
    
  } catch (error) {
    console.error("Error fetching startup data:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}