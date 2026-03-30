import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  if (files.length === 0) {
    return NextResponse.json({ error: "לא נבחרו קבצים" }, { status: 400 });
  }

  const urls: string[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `products/${randomUUID()}.${ext}`;

    const blob = await put(filename, file, {
      access: "public",
    });

    urls.push(blob.url);
  }

  return NextResponse.json({ urls });
}
