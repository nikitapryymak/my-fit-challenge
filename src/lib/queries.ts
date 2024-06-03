import { User } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

export const getUserById = async (
  supabase: SupabaseClient,
  userId: string
): Promise<User | null> => {
  const { data } = await supabase.from("users").select("*").eq("id", userId);
  return data ? data[0] : null;
};
