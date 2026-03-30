import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  if (!isAdminRoute) return NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is configured, use it for auth
  if (supabaseUrl && supabaseAnonKey) {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { cookie: request.headers.get("cookie") || "" },
      },
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (user.user_metadata?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  // Supabase not configured — use simple cookie-based auth
  const adminSession = request.cookies.get("artiz-admin-session")?.value;
  if (!adminSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
