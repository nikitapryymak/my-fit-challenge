import { createServerClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions";
import FormSubmitButton from "@/components/form-submit-button";

export default async function LogoutBtn() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex items-center gap-4">
      Hey, {user?.email}!
      <form>
        <FormSubmitButton formAction={signOut} size="sm" pendingText="Sign Out">
          Sign Out
        </FormSubmitButton>
      </form>
    </div>
  );
}
