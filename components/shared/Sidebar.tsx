"use client"

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import ThemeToggle from './ThemeToggle'

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        {/* Logo */}
        <Link href="/dashboard" className="sidebar-logo">
          <svg 
            className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="khizo-grad-sb" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4F46E5" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            <g fill="url(#khizo-grad-sb)">
              <rect x="12" y="-4" width="8" height="40" rx="2" transform="rotate(45 16 16)" />
              <rect x="12" y="-4" width="8" height="40" rx="2" transform="rotate(-45 16 16)" />
            </g>
          </svg>
          <span className="font-bold text-xl md:text-2xl tracking-tight text-indigo-600 dark:text-indigo-400">Khizo AI</span>
        </Link>

        <nav className="sidebar-nav">
          <div className="sidebar-scroll-container">
            <SignedIn>
              {/* Main nav links */}
              <ul className="sidebar-nav_elements">
                {navLinks.slice(0, 6).map((link) => {
                  const isActive = link.route === pathname

                  return (
                    <li key={link.route} className={`sidebar-nav_element group ${
                      isActive ? 'sidebar-nav_active' : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      <Link className="sidebar-link" href={link.route}>
                        <Image 
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive ? 'brightness-200' : 'dark:invert'}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Bottom nav links */}
              <ul className="sidebar-nav_elements">
                {navLinks.slice(6).map((link) => {
                  const isActive = link.route === pathname

                  return (
                    <li key={link.route} className={`sidebar-nav_element group ${
                      isActive ? 'sidebar-nav_active' : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      <Link className="sidebar-link" href={link.route}>
                        <Image 
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive ? 'brightness-200' : 'dark:invert'}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  )
                })}

                <li className="flex-center cursor-pointer gap-2 p-4">
                  <UserButton afterSignOutUrl='/' showName />
                </li>
                <li>
                  <ThemeToggle />
                </li>
              </ul>
            </SignedIn>

            <SignedOut>
              <Button asChild className="button bg-purple-gradient bg-cover">
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar