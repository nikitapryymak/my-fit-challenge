import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { signIn, signInWithGoogle, signUp } from "@/lib/actions";
import FormSubmitButton from "@/components/form-submit-button";
import GoogleSVG from "./google-svg";

type Props = {
  searchParams: { message?: string; error?: string };
};

export default function Login({ searchParams }: Props) {
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
          <FormSubmitButton
            formAction={signIn}
            variant="primary"
            className="mb-2"
            pendingText="Signing In..."
          >
            Sign In
          </FormSubmitButton>
          <FormSubmitButton formAction={signUp} pendingText="Signing Up...">
            Sign Up
          </FormSubmitButton>
        </form>
        <p className="text-center text-muted-foreground my-3">or</p>
        <form>
          <FormSubmitButton
            formAction={signInWithGoogle}
            variant="secondary"
            pendingText="Signing In..."
            className="w-full"
          >
            <GoogleSVG />
            Continue with Google
          </FormSubmitButton>
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
