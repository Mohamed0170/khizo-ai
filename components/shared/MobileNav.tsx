"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/dashboard" className="flex items-center gap-2 md:py-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="w-8 h-8">
          <defs>
            <linearGradient id="xg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B5CF6"/>
              <stop offset="50%" stopColor="#7C3AED"/>
              <stop offset="100%" stopColor="#6D28D9"/>
            </linearGradient>
          </defs>
          <line x1="8" y1="8" x2="56" y2="56" stroke="url(#xg)" strokeWidth="16" strokeLinecap="round"/>
          <line x1="56" y1="8" x2="8" y2="56" stroke="url(#xg)" strokeWidth="16" strokeLinecap="round"/>
        </svg>
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Image 
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer dark:invert"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64 overflow-hidden dark:bg-slate-950 dark:border-slate-800">
              <>
              <ul className="header-nav_elements">
              {navLinks.map((link) => {
                const isActive = link.route === pathname

                return (
                  <li 
                    className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700 dark:text-slate-300`}
                    key={link.route}
                    >
                    <Link className="sidebar-link cursor-pointer" href={link.route}>
                      <Image 
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              </ul>
              <div className="mt-4 border-t border-purple-100 dark:border-slate-700 pt-4">
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