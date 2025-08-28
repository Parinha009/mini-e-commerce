import { NextResponse } from "next/server";
import { serverClient } from "@/utils/supabase/server";

export async function POST() {
  const supabase = await serverClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/sign-in", "http://localhost:3000"));
}
