"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { LoadingButton } from "@/components/loading-button";

type Props = ComponentProps<typeof LoadingButton> & {
  pendingText?: string;
};

export function SubmitButton({ children, type, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <LoadingButton
      {...props}
      type="submit"
      isLoading={isPending}
      aria-disabled={pending}
    >
      {isPending ? pendingText : children}
    </LoadingButton>
  );
}
