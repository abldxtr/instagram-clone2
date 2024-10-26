import { fetchPosts } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await fetchPosts();
  return NextResponse.json({ data });
}
