"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "./supabase/server";
import { DASHBOARD_PATH } from "@/constants";

export const signInWithGoogle = async () => {
  const supabase = createServerClient();
  const origin = headers().get("origin");
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`, // exchange code for session
    },
  });

  // redirects to google consent screen
  return redirect(error ? `/login?error=${error.message}` : data.url);
};

export const signIn = async (formData: FormData) => {
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

export const signUp = async (formData: FormData) => {
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
  const path = data.user?.email_confirmed_at ? `/${DASHBOARD_PATH}` : "/login";
  const queryParams = error
    ? `?error=${error.message}`
    : "?message=Check your email to confirm your account";
  return redirect(path + queryParams);
};

export const signOut = async () => {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export const updateAccount = async ({
  email,
  name,
}: {
  email?: string;
  name?: string;
}) => {
  const origin = headers().get("origin");
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }

  if (email && email !== user.email) {
    const { error } = await supabase.auth.updateUser(
      {
        email,
      },
      {
        emailRedirectTo: `${origin}/${DASHBOARD_PATH}/account`,
      }
    );
    if (error) {
      return redirect(`/${DASHBOARD_PATH}/account?error=${error.message}`);
    }
  }

  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("id", user.id);

  if (error) {
    throw new Error("Failed to update account");
  }

  return redirect(`/${DASHBOARD_PATH}/account`);
};
