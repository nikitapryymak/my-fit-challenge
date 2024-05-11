import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user
    ? response
    : NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/d/:path*"],
};
