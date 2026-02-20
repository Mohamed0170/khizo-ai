import { SignedIn, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";

export const metadata: Metadata = {
  title: "Buy Credits - Khizo AI Pricing Plans",
  description:
    "Purchase credits to unlock AI image transformations. Choose from Free, Pro, and Premium plans for image restoration, object removal, and more.",
};

const planMeta: Record<string, { description: string; featured: boolean; ctaFree: string }> = {
  Free: { description: "Perfect for getting started", featured: false, ctaFree: "Free Consumable" },
  "Pro Package": { description: "Best for creators & professionals", featured: true, ctaFree: "" },
  "Premium Package": { description: "For teams & power users", featured: false, ctaFree: "" },
};

const Credits = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      {/* Header */}
      <div className="mb-10 md:mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Buy{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
            Credits
          </span>
        </h2>
        <p className="text-gray-500 dark:text-slate-400 text-base mt-2">
          Choose a credit package that suits your needs!
        </p>
      </div>

      <section>
        <ul className="credits-list">
          {plans.map((plan) => {
            const meta = planMeta[plan.name] || { description: "", featured: false, ctaFree: "" };

            return (
              <li
                key={plan.name}
                className={`credits-card ${
                  meta.featured ? 'credits-card-featured md:-mt-3 md:mb-3' : ''
                }`}
              >
                {/* Featured badge */}
                {meta.featured && (
                  <div className="credits-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    Most Popular
                  </div>
                )}

                {/* Glow border for featured */}
                {meta.featured && (
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-indigo-500 via-violet-500 to-indigo-500 opacity-100 dark:opacity-70 -z-10" />
                )}

                <div className={`relative h-full rounded-2xl p-6 lg:p-8 flex flex-col ${
                  meta.featured
                    ? 'bg-white dark:bg-slate-900 shadow-2xl shadow-indigo-200/50 dark:shadow-indigo-900/30'
                    : 'bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl'
                } transition-all duration-300`}>

                  {/* Plan header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      {meta.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                      {plan.credits.toLocaleString()} credits
                    </p>
                  </div>

                  {/* Inclusions */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.inclusions.map((inclusion) => (
                      <li key={plan.name + inclusion.label} className="flex items-start gap-3">
                        {inclusion.isIncluded ? (
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400"><path d="M20 6 9 17l-5-5"/></svg>
                          </div>
                        ) : (
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-slate-600"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                          </div>
                        )}
                        <span className={`text-sm ${
                          inclusion.isIncluded
                            ? 'text-gray-700 dark:text-slate-300'
                            : 'text-gray-400 dark:text-slate-600'
                        }`}>
                          {inclusion.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {plan.name === "Free" ? (
                    <Button variant="outline" className="credits-btn-free">
                      {meta.ctaFree}
                    </Button>
                  ) : (
                    <SignedIn>
                      <Checkout
                        plan={plan.name}
                        amount={plan.price}
                        credits={plan.credits}
                        buyerId={user._id}
                      />
                    </SignedIn>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Credits;