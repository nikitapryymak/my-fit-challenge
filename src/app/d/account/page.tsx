import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import UserInfo from "./UserInfo";
import { getUserById } from "@/lib/queries";

export default async function Account() {
  const supabase = createServerClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  if (!authUser) {
    return redirect("/login");
  }

  const user = await getUserById(supabase, authUser.id);
  if (!user) {
    return redirect("/login");
  }

  const email = authUser.identities?.find(
    (identity) => identity.provider === "email"
  )?.identity_data?.email;

  const googleEmail = authUser.identities?.find(
    (identity) => identity.provider === "google"
  )?.identity_data?.email;

  return (
    <div>
      <h2 className="mb-8">Account</h2>
      <UserInfo
        name={user.name}
        email={email}
        newEmail={authUser.new_email}
        googleEmail={googleEmail}
      />
    </div>
  );
}
