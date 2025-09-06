"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Sparkles, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type NavbarProps = {
  ctaHref: string
  className?: string
}

const HEADER_BASE =
  "fixed inset-x-0 top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10 transition-colors duration-300"
const HEADER_SCROLLED =
  "fixed inset-x-0 top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-[#d4ae36]/30 shadow-lg transition-colors duration-300"

const navItems = []

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
            className="hidden md:inline-flex items-center px-5 py-2 bg-transparent backdrop-blur-sm border border-[#d4ae36]/40 text-[#d4ae36] rounded-lg font-medium hover:border-[#d4ae36]/60 hover:bg-transparent transition-all duration-300"
          >
            Join the Top 5%
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
      className="group inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4ae36]"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#d4ae36] to-[#c19d2f] text-black transition-all duration-300 group-hover:scale-110">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="font-heading text-base tracking-tight text-white transition-colors group-hover:text-gray-300 sm:text-lg">
        Matchlens AI
      </span>
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
            className="inline-flex items-center px-6 py-2 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-400 transition-colors mt-4"
            onClick={() => setOpen(false)}
          >
            Join the Top 5%
          </Link>
        </div>

        <div className="pb-6" />
      </SheetContent>
    </Sheet>
  )
}