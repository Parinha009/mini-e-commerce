"use client";
import { supabase } from '@/utils/supabase/client';

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard", // change later if deployed
      },
    })
    if (error) console.error("Google login error:", error.message)
  }

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "test@email.com", // replace with form input
      password: "123456",      // replace with form input
    })
    if (error) console.error("Email login error:", error.message)
  }

  return (
    <div className="flex flex-col gap-4">
      <button onClick={handleGoogleLogin} className="bg-blue-500 text-white p-2 rounded">
        Sign in with Google
      </button>

      <button onClick={handleEmailLogin} className="bg-gray-500 text-white p-2 rounded">
        Sign in with Email
      </button>
    </div>
  )
}
