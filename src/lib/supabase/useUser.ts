"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createBrowserClient } from "./client";

/**
 * Makes a request to the Supabase auth server, so it guarantees the user is authenticated.
 * @returns User | null
 */
export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, []);

  return user;
}
