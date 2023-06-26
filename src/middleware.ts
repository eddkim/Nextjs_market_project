import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";
// export const config = { matcher: ["/admin/:path*","/user"] } // :path* 경로 이하 전부 권한

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  // console.log('sesseion',session)
  const pathname = req.nextUrl.pathname;
  // console.log('req/url',req)

  //로그인 된 유저만 접근 가능

  if (pathname.startsWith("/user") && !session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  //어드민 유저만 접근 가능
  if (pathname.startsWith("/admin") && session?.role !== "Admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  //로그인 된 유저는 로그인, 회원가입 페이지 접근 X
  if (pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
