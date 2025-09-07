"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Sparkles, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { trackCTAClick } from "@/lib/metaPixel"

type NavbarProps = {
  ctaHref: string
  className?: string
}

const HEADER_BASE =
  "fixed inset-x-0 top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10 transition-colors duration-300"
const HEADER_SCROLLED =
  "fixed inset-x-0 top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-[#d4ae36]/30 shadow-lg transition-colors duration-300"

const navItems: Array<{ label: string, href: string }> = []

export default function Navbar({ ctaHref, className }: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      if (typeof window !== "undefined") {
        setScrolled(window.scrollY > 8)
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={scrolled ? HEADER_SCROLLED : HEADER_BASE}>
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-3">
          <Brand />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href={ctaHref}
            className="hidden md:inline-flex items-center px-5 py-2 bg-transparent backdrop-blur-sm border border-[#d4ae36]/40 rounded-lg font-medium hover:border-[#d4ae36]/60 hover:bg-transparent transition-all duration-300"
            onClick={() => trackCTAClick("Join the Top 5%", "Navbar Desktop")}
          >
            <span className="bg-gradient-to-r from-[#d4ae36] via-[#FD5E76] to-[#d4ae36] bg-clip-text text-transparent">
              Join the Top 5%
            </span>
          </Link>

          <div className="flex items-center md:hidden">
            <MobileMenu
              open={open}
              setOpen={setOpen}
              ctaHref={ctaHref}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

function Brand() {
  return (
    <Link
      href="/"
      aria-label="Matchlens home"
      className="group inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4ae36]"
    >
      <div className="flex items-center gap-4 transition-all duration-300 group-hover:scale-110">
        {/* Heart/Lens Icon */}
        <div className="w-8 h-8 flex items-center justify-center relative">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 fill-none stroke-[3] transition-all duration-300 group-hover:scale-125 group-hover:rotate-12"
            style={{
              stroke: 'url(#logoGradient)',
              filter: 'drop-shadow(0 0 8px rgba(212, 174, 54, 0.5))'
            }}
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4ae36" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#FD5E76" />
              </linearGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 8l-4 4-4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Glow effect */}
          <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-[#d4ae36]/20 via-white/10 to-[#FD5E76]/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Text */}
        <span className="font-heading text-2xl font-bold tracking-tight bg-gradient-to-r from-[#d4ae36] via-white to-[#FD5E76] bg-clip-text text-transparent transition-all duration-300 drop-shadow-lg"
          style={{
            textShadow: '0 0 20px rgba(212, 174, 54, 0.3), 0 0 40px rgba(253, 94, 118, 0.2)'
          }}>
          Matchlens AI
        </span>
      </div>
    </Link>
  )
}

function MobileMenu({
  open,
  setOpen,
  ctaHref,
}: {
  open: boolean
  setOpen: (v: boolean) => void
  ctaHref: string
}) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open ? "true" : "false"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4ae36]"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[calc(100%-3rem)] max-w-xs bg-gray-900 p-0 text-white sm:w-[22rem]"
        aria-label="Mobile navigation panel"
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <Brand />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4ae36]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="my-2 h-px bg-gray-700/70" />

        <div className="px-5 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-gray-300 hover:text-white transition-colors text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href={ctaHref}
            className="inline-flex items-center px-6 py-2 bg-transparent border border-[#d4ae36]/40 rounded-full font-semibold hover:border-[#d4ae36]/60 transition-all duration-300 mt-4"
            onClick={() => {
              trackCTAClick("Join the Top 5%", "Navbar Mobile");
              setOpen(false);
            }}
          >
            <span className="bg-gradient-to-r from-[#d4ae36] via-[#FD5E76] to-[#d4ae36] bg-clip-text text-transparent">
              Join the Top 5%
            </span>
          </Link>
        </div>

        <div className="pb-6" />
      </SheetContent>
    </Sheet>
  )
}