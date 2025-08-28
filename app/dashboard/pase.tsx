import { redirect } from "next/navigation";
import { serverClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = await serverClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p>Welcome, {user.email}</p>

      <form action="/auth/sign-out" method="post" className="mt-4">
        <button className="border px-4 py-2 rounded bg-red-500 text-white">
          Sign out
        </button>
      </form>
    </div>
  );
}
