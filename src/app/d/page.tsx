import { createServerClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <p className="">Protected page</p>
    </div>
  );
}
