import AuthButton from "@/components/AuthButton";
import { createServerClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = createServerClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // console.log("ProtectedPage user", user);

  return (
    <div className="flex-1 w-full flex flex-col gap-10 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>
      <p className="">Protected page</p>
      {/* <p>{user?.id}</p> */}
    </div>
  );
}
