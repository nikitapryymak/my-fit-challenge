import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoadingButton({
  children,
  isLoading,
  ...props
}: React.ComponentProps<typeof Button> & { isLoading?: boolean }) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
