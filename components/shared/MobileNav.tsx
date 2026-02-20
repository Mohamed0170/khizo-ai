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
        <Logo className="w-8 h-8 md:w-9 md:h-9" />
        <span className="hidden sm:inline font-bold text-xl md:text-2xl tracking-tight text-indigo-600 dark:text-indigo-400">Khizo AI</span>
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