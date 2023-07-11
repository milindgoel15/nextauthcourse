import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const loginPath =
		path === "/login" || path === "/signup" || path === "/verifyEmail";
	const publicPath = path === "/cart" || path === "/profile";
	const token = request.cookies.get("token")?.value || "";

	if (loginPath && token) {
		console.log("logged in already");
		return NextResponse.redirect(new URL("/profile", request.url));
	}

	if (publicPath && !token) {
		console.log("Please login first to access profile and cart page");

		return NextResponse.redirect(new URL("/login", request.url));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		"/",
		"/cart",
		"/profile",
		"/profile/:path*",
		"/login",
		"/signup",
		"/verifyEmail",
	],
};
