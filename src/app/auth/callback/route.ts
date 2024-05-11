import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { DASHBOARD_PATH } from "@/constants";

export async function GET(request: Request) {
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // redirect to dashboard
  return NextResponse.redirect(`${origin}/${DASHBOARD_PATH}`);
}
