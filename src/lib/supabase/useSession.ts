"use client";

import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { createBrowserClient } from "./client";

/**
 * Reads the session data from the browser's cookies. This is not 100% reliable (since cookies can be tampered with), but it's fine for client-side data display.
 * Our middleware will validate each request by calling `supabase.auth.getUser()`, which calls the auth server to guarantee the user is authenticated.
 * Plus, we will have RLS enabled on the database to ensure the user can only access their own data.
 * @returns Session | null
 */
export default function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient();

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    getSession();
  }, []);

  return session;
}
