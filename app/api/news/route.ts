import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q");

  const apiUrl = q 
  ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}`
  : `https://newsapi.org/v2/top-headlines?country=us`

  const res = await fetch(apiUrl, {
    headers: {
      "x-api-key": process.env.API_KEY || "",
    },
  });
  
  const data = await res.json();
  return NextResponse.json(data);
}