// 1) import types and helpers
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "../lib/db";
import { compare } from "bcryptjs";


// 2) the main config object we will reuse everywhere
export const authOptions: NextAuthOptions = {
  // 3) how we store the session: JWT cookie (simple, no DB needed)
  session: { strategy: "jwt" },

  // 4) which login methods we support — start with email+password
  providers: [
    Credentials({
      name: "Credentials",
      // 5) fields your login form will send
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // 6) the core check: given email+password, return the user or null
      async authorize(credentials) {
        // 6a) sanity checks
        if (!credentials?.email || !credentials.password) return null;

        // 6b) load user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        // 6c) compare plain password with stored hash
        const ok = await compare(credentials.password, user.password);
        if (!ok) return null;

        // 6d) return a minimal user object for the session/JWT
        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? null,
          role: user.role, // we’ll need this to guard admin actions
        };
      },
    }),
  ],

  // 7) pages (optional): where your custom login UI lives
  pages: { signIn: "/login" },

  // 8) callbacks: add custom fields into JWT and session
  callbacks: {
    async jwt({ token, user }) {
      // 8a) runs at login; copy user data into JWT
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // 8b) runs on each request; expose id/role to the frontend
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  // 9) secret key used to sign the session/JWT
  secret: process.env.NEXTAUTH_SECRET,
};
