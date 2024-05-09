import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const supabase = createServerClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <Button size="sm">Logout</Button>
      </form>
    </div>
  ) : (
    <Button size="sm" asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}
