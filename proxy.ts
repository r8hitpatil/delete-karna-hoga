import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest){
    const token = request.cookies.get("access_token");

    const protectedRoute = request.nextUrl.pathname.startsWith("/news/");
    // console.log('What does protectedRoute return',protectedRoute);

    if(protectedRoute && !token) {
        return NextResponse.redirect(
            new URL("/auth/login", request.url)
        )
    }
    return NextResponse.next();
}

export const config = {
    matcher : ["/news/:path"],
};