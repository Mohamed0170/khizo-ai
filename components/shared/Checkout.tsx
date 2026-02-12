"use client";

import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { checkoutCredits, syncCredits } from "@/lib/actions/transaction.action";

import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "Verifying your credits...",
        duration: 5000,
        className: "success-toast",
      });

      // Automatically sync credits after successful payment redirect
      const doSync = async () => {
        if (isSyncing) return;
        setIsSyncing(true);
        try {
          console.log("Syncing credits for buyer:", buyerId);
          const result = await syncCredits(buyerId);
          console.log("Sync result:", result);

          if (result.creditsAdded && result.creditsAdded > 0) {
            toast({
              title: "Credits Added!",
              description: `${result.creditsAdded} credits have been added to your account`,
              duration: 5000,
              className: "success-toast",
            });
            // Reload the page to reflect updated credits
            setTimeout(() => window.location.reload(), 2000);
          }
        } catch (err) {
          console.error("Error syncing credits:", err);
        } finally {
          setIsSyncing(false);
        }
      };

      // Wait a moment for webhook to process first, then sync as fallback
      setTimeout(doSync, 3000);
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, [toast, buyerId]);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-gradient bg-cover"
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;