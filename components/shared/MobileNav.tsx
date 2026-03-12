"use client"

import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"

const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Auto-close when navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <Link href="/dashboard" className="flex items-center gap-2 md:py-2 group">
        <Logo className="w-8 h-8 md:w-9 md:h-9 transition-transform duration-500 group-hover:rotate-180" />
      </Link>

      <nav className="flex gap-2 items-center">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <div className="p-1.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-300 active:scale-90">
                <Image 
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={28}
                  height={28}
                  className="cursor-pointer dark:invert"
                />
              </div>
            </SheetTrigger>
            <SheetContent hideClose className="sheet-content sm:w-72 overflow-hidden border-l border-indigo-100/20 dark:border-slate-800 bg-white/[0.92] dark:bg-slate-900/[0.92] backdrop-blur-xl backdrop-saturate-[180%]" suppressHydrationWarning>
              <>
              <div className="px-2 pt-2 pb-4 mb-2 border-b border-indigo-100/30 dark:border-slate-800">
                <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Khizo AI</span>
              </div>
              <ul className="header-nav_elements">
              {navLinks.map((link, index) => {
                const isActive = link.route === pathname

                return (
                  <li 
                    className={`${isActive ? 'gradient-text' : ''} p-18 flex whitespace-nowrap text-dark-700 dark:text-slate-300 animate-slideInLeft rounded-xl transition-all duration-300 hover:bg-indigo-50/60 dark:hover:bg-slate-800/60`}
                    key={link.route}
                    style={{ animationDelay: `${index * 0.04}s` }}
                    >
                    <Link className="sidebar-link cursor-pointer" href={link.route} onClick={() => setOpen(false)}>
                      <Image 
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`transition-transform duration-300 ${isActive ? '' : ''}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              </ul>
              <div className="mt-4 border-t border-indigo-100/30 dark:border-slate-700 pt-4">
                <ThemeToggle />
              </div>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
      </nav>
    </header>
  )
}

export default MobileNav