import { createServerClient } from "@/lib/supabase/server";
import LogoutBtn from "./logout-btn";

export default async function Dashboard() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex-1 w-full flex flex-col gap-10 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
            <LogoutBtn />
          </div>
        </nav>
      </div>
      <p className="">Protected page</p>
      {/* <p>{user?.id}</p> */}
    </div>
  );
}
