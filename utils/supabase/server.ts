import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function serverClient() {
  const store = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return store.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // next/headers cookies are readonly in some contexts; ignore if it throws
            // @ts-ignore
            store.set(name, value, options);
          } catch {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            // @ts-ignore
            store.set(name, "", { ...options, maxAge: 0 });
          } catch {}
        },
      },
    }
  );
}
