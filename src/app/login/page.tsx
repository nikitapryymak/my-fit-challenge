import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import { SubmitButton } from "./submit-button";
import { DASHBOARD_PATH } from "@/constants";
import GoogleSVG from "./google-svg";

type Props = {
  searchParams: { message?: string; error?: string };
};

export default function Login({ searchParams }: Props) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return redirect(
      error ? `/login?error=${error.message}` : `/${DASHBOARD_PATH}`
    );
  };

  const signInWithGoogle = async () => {
    "use server";
    const supabase = createServerClient();
    const origin = headers().get("origin");
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`, // exchange code for session
      },
    });

    return redirect(error ? `/login?error=${error.message}` : data.url);
  };

  const signUp = async (formData: FormData) => {
    "use server";
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createServerClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    // if email is confirmed, redirect to protected page
    const path = data.user?.email_confirmed_at
      ? `/${DASHBOARD_PATH}`
      : "/login";
    const queryParams = error
      ? `?error=${error.message}`
      : "?message=Check your email to confirm your account";
    return redirect(path + queryParams);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <ChevronLeft
          size={18}
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        />{" "}
        Back
      </Link>

      <div className="px-12 py-8 bg-background border">
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            variant="primary"
            className="mb-2"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <SubmitButton formAction={signUp} pendingText="Signing Up...">
            Sign Up
          </SubmitButton>
        </form>
        <p className="text-center text-muted-foreground my-3">or</p>
        <form>
          <SubmitButton
            formAction={signInWithGoogle}
            variant="secondary"
            pendingText="Signing In..."
            className="w-full"
          >
            <GoogleSVG />
            Continue with Google
          </SubmitButton>
        </form>
        {(searchParams?.message || searchParams?.error) && (
          <p
            className={`mt-4 p-4 bg-foreground/5 text-foreground text-center rounded-lg border
              ${
                searchParams.error
                  ? "border-red-500 bg-red-500/5"
                  : "border-green-300 bg-green-500/5"
              }`}
          >
            {searchParams.message || searchParams.error}
          </p>
        )}
      </div>
    </div>
  );
}
