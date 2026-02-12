"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { syncCredits } from "@/lib/actions/transaction.action";

/**
 * Client component that automatically syncs credits after a successful payment redirect.
 */
const CreditSync = ({ buyerId }: { buyerId: string }) => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const hasSynced = useRef(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const success = searchParams.get("success");
    if (!success || hasSynced.current || !buyerId) return;

    hasSynced.current = true;
    setIsSyncing(true);

    toast({
      title: "Payment received!",
      description: "Adding your credits...",
      duration: 5000,
      className: "success-toast",
    });

    const doSync = async (attempt = 1): Promise<void> => {
      try {
        const result = await syncCredits(buyerId);

        if (result.creditsAdded && result.creditsAdded > 0) {
          setIsSyncing(false);
          toast({
            title: "Credits Added! ✓",
            description: `${result.creditsAdded} credits have been added to your account`,
            duration: 3000,
            className: "success-toast",
          });
          const url = new URL(window.location.href);
          url.searchParams.delete("success");
          window.location.href = url.toString();
        } else if (attempt < 3) {
          await new Promise(r => setTimeout(r, 1500));
          return doSync(attempt + 1);
        } else {
          setIsSyncing(false);
          const url = new URL(window.location.href);
          url.searchParams.delete("success");
          window.location.href = url.toString();
        }
      } catch {
        if (attempt < 3) {
          await new Promise(r => setTimeout(r, 1500));
          return doSync(attempt + 1);
        }
        setIsSyncing(false);
      }
    };

    doSync(1);
  }, [searchParams, buyerId, toast]);

  if (!isSyncing) return null;

  // Show a small loading indicator while syncing
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-purple-600 px-5 py-3 text-white shadow-lg">
      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Adding credits...
    </div>
  );
};

export default CreditSync;
