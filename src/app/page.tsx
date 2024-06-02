import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center gap-6 p-3 text-sm">
          <Link href="/d">About</Link>
          <Link href="/d">Pricing</Link>
          <Button asChild>
            <Link href="/d">Go to Dashboard</Link>
          </Button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        Landing page
      </div>
    </div>
  );
}
