import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { retrieve } from "@/lib/auth"

export async function middleware(request: NextRequest) {
    const user = await retrieve("user");

    const protectedRoutes = ["/dashboard", "/logout"];
    const publicRoutes = ["/login", "/register"];

    if (protectedRoutes.includes(request.nextUrl.pathname) && !user)
        return NextResponse.redirect(new URL("/", request.url))

    if (publicRoutes.includes(request.nextUrl.pathname) && user)
        return NextResponse.redirect(new URL("/", request.url))

    return NextResponse.next()
};

export const config = {
    matcher: ["/login", "/register", "/dashboard", "/logout"]
};
