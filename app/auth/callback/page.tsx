"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function Callback() {
  const r = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(() => r.replace("/dashboard"));
  }, [r]);
  return <p className="p-4">Signing you in…</p>;
}
