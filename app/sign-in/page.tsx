"use client";

import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function onEmail(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setErr(error.message);
    r.push("/dashboard");
  }

  async function onGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });
    if (error) setErr(error.message);
  }

  return (
    <div className="max-w-sm mx-auto space-y-3 p-4">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <form onSubmit={onEmail} className="space-y-2">
        <input
          className="w-full border px-3 py-2 rounded"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <button className="w-full bg-black text-white py-2 rounded">Sign in</button>
      </form>

      <button onClick={onGoogle} className="w-full border py-2 rounded">
        Continue with Google
      </button>

      {err && <p className="text-red-600 text-sm">{err}</p>}
    </div>
  );
}
