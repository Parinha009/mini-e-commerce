"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Email/password signup
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setError(error.message);
    router.push('/dashboard'); // or wherever you want to redirect
  }

  // Google signup
  async function handleGoogle() {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/auth/callback' }
    });
    if (error) setError(error.message);
  }

  return (
    // Main container with centered content
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      
      {/* Outer border container */}
      <div className="p-6 border-[1px] border-[#15F02E] rounded-[40px]">
        
        {/* The main card for the form */}
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          
          {/* Header */}
          <div className="text-center">
            <Image src="/logo.svg" alt="FitFuel Logo" width={60} height={60} className="mx-auto" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Try Fitfuel for Free!
            </h2>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span>Signup / Login with Google</span>
            </button>
            {/* Facebook can be added similarly if enabled in Supabase */}
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="h-px bg-gray-300 flex-grow"></div>
            <p className="mx-4 text-sm text-gray-500">Or Log in using email</p>
            <div className="h-px bg-gray-300 flex-grow"></div>
          </div>
          
          {/* Email/Password Form */}
          <form className="space-y-6" onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password (8+ characters)"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-brand-dark text-white font-bold p-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              Signup
            </button>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </form>
          
          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Or <Link href="/login" className="font-medium text-brand-green hover:underline">Signup using email</Link>
          </p>

        </div>
      </div>
    </div>
  )
}
