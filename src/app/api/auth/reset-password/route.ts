import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const { email } = await request.json();

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { success: false, error: "שירות האיפוס אינו מוגדר" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://artiz.co.il"}/login`,
  });

  if (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה בשליחת הבקשה" },
      { status: 500 }
    );
  }

  // Always return success to prevent email enumeration
  return NextResponse.json({ success: true });
}
