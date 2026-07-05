import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Server-only page-view tracking. No auth: public endpoint, fire-and-forget.
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { path } = await req.json();
    if (supabaseAdmin && typeof path === "string" && path) {
      await supabaseAdmin.rpc("increment_page_view", { p_path: path });
    }
  } catch {
    // Tracking must never break a page — swallow everything.
  }
  return NextResponse.json({ ok: true });
}
