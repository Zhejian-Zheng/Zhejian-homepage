import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
 const explicit = request.nextUrl.searchParams.get("lang");
 const saved = request.cookies.get("site-language")?.value;
 const language = explicit === "zh" || explicit === "en" ? explicit : saved === "zh" ? "zh" : "en";
 const headers = new Headers(request.headers);
 headers.set("x-site-language", language);
 headers.set("x-site-path", request.nextUrl.pathname);
 const response = NextResponse.next({ request: { headers } });
 if (explicit === "zh" || explicit === "en") response.cookies.set("site-language", language, { path: "/", sameSite: "lax", maxAge: 31536000 });
 return response;
}
export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
