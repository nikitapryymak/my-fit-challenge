"use client";

import { TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import GoogleSVG from "@/app/login/google-svg";

type Props = {
  email: string;
  newEmail?: string;
  setEmail: Function;
  googleEmail?: string;
};

const VerifyNewEmail = ({
  email,
  newEmail,
}: {
  email: string;
  newEmail: string;
}) => (
  <div className="flex text-sm p-2 mb-4 border border-orange-300 bg-warning">
    <TriangleAlert size={22} className="text-orange-300 mr-2" />
    <span>
      Please click the verification links sent to
      <span className="font-semibold"> {email} </span>
      and
      <span className="font-semibold"> {newEmail}</span>
    </span>
  </div>
);

const EmailInput = ({ email, setEmail }: Pick<Props, "email" | "setEmail">) => {
  return (
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
};

const GoogleEmail = ({ email }: { email: string }) => {
  return (
    <div className="flex items-center gap-2 p-2 px-4 border rounded-full w-fit">
      <GoogleSVG width="1rem" height="1rem" />
      {email}
    </div>
  );
};

const EmailInfo = ({ email, newEmail, setEmail, googleEmail }: Props) => {
  return (
    <div className="mb-4">
      <h5 className="mb-3">Email Address</h5>
      {newEmail && <VerifyNewEmail email={email} newEmail={newEmail} />}
      {email && <EmailInput email={email} setEmail={setEmail} />}
      {googleEmail && <GoogleEmail email={googleEmail} />}
    </div>
  );
};

export default EmailInfo;
