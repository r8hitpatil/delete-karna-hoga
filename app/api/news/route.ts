import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q")?.trim() || "";
        const sort = searchParams.get("sort")?.toLowerCase() === "asc" ? "asc" : "desc";

        const news = await prisma.news.findMany({
            where: q
                ? {
                    OR: [
                        { title: { contains: q, mode: "insensitive" } },
                        { description: { contains: q, mode: "insensitive" } },
                    ],
                }
                : undefined,
            orderBy: {
                publishedAt: sort,
            },
        });

        return NextResponse.json({ success: true, data: news });
    } catch (error) {
        console.error("Error fetching news in GET /api/news:", error);
        return NextResponse.json(
            { success: false, data: [], message: "Internal server error" },
            { status: 500 }
        );
    }
}
