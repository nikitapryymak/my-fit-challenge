"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingButton } from "@/components/loading-button";
import { updateAccount } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import EmailInfo from "./EmailInfo";

type Props = {
  name: string;
  email?: string;
  newEmail?: string;
  googleEmail?: string;
};

const SuccessToast = () => (
  <div className="flex items-center gap-2 text-sm">
    <Check size={20} className="text-green-300" />
    Account updated
  </div>
);

export default function UserInfo(props: Props) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(props.name || "");
  const [email, setEmail] = useState(props.email || "");

  const updateUser = async (data: { name?: string; email?: string }) => {
    setIsLoading(true);
    try {
      await updateAccount(data);
      toast({
        description: <SuccessToast />,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Failed to update account",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="max-w-[500px]">
      <CardContent className="pt-4">
        {searchParams.has("error") && (
          <div className="text-red-500 text-sm mb-3">
            {searchParams.get("error")}
          </div>
        )}
        <h5 className="mb-2">Display Name</h5>
        <Input
          type="text"
          name="name"
          placeholder="Display name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <EmailInfo
          email={email}
          newEmail={props.newEmail}
          setEmail={setEmail}
          googleEmail={props.googleEmail}
        />
        <LoadingButton
          variant="primary"
          size="sm"
          className="w-fit"
          isLoading={isLoading}
          onClick={(e) => {
            e.preventDefault();
            updateUser({ name, email });
          }}
          disabled={
            !name || !email || (name === props.name && email === props.email)
          }
        >
          Update
        </LoadingButton>
      </CardContent>
    </Card>
  );
}
