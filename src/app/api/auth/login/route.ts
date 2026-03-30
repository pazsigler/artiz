import { NextResponse } from "next/server";

const ADMIN_USERS: Record<string, string> = {
  "admin@artiz.co.il": "admin123",
  "pazsigler@gmail.com": "admin123",
};

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (ADMIN_USERS[email] && ADMIN_USERS[email] === password) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("artiz-admin-session", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  }

  return NextResponse.json(
    { success: false, error: "אימייל או סיסמה שגויים" },
    { status: 401 }
  );
}
