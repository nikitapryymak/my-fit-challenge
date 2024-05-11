"use client";

import { signOut } from "@/lib/actions";
import FormSubmitButton from "@/components/form-submit-button";

type Props = {
  email: string | undefined;
};

export default function LogoutBtn({ email }: Props) {
  return (
    <div className="flex items-center gap-4">
      {email && `Hey, ${email}!`}
      <form>
        <FormSubmitButton formAction={signOut} size="sm" pendingText="Sign Out">
          Sign Out
        </FormSubmitButton>
      </form>
    </div>
  );
}
