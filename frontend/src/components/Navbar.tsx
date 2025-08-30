"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Sparkles, User2, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


type NavbarProps = {
  ctaHref: string
  className?: string
}

const HEADER_BASE =
  "fixed inset-x-0 top-0 z-50 bg-transparent backdrop-blur-sm transition-colors duration-300"
const HEADER_SCROLLED =
  "fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/60 transition-colors duration-300"

const NAV_LINK_CLASS =
  "rounded-md px-1.5 py-1 text-sm text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

const MOBILE_MENU_ID = "mobile-primary-navigation"

const navItems = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
]

export default function Navbar({ ctaHref, className }: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  // Handle sign in internally within the client component
  const handleSignIn = () => {
    // Placeholder for sign-in logic
    console.log("Sign in clicked")
  }



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

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={NAV_LINK_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 md:flex">


            <button
              type="button"
              onClick={handleSignIn}
              aria-label="Account"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground/80 ring-1 ring-inset ring-border/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <User2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <MobileMenu
              open={open}
              setOpen={setOpen}
              ctaHref={ctaHref}
              onSignIn={handleSignIn}
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
      className="group inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground/80 ring-1 ring-inset ring-border/60 transition-colors group-hover:text-foreground">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="font-heading text-base tracking-tight text-foreground/90 transition-colors group-hover:text-foreground sm:text-lg">
        Matchlens
      </span>
    </Link>
  )
}

function MobileMenu({
  open,
  setOpen,
  ctaHref,
  onSignIn,
}: {
  open: boolean
  setOpen: (v: boolean) => void
  ctaHref: string
  onSignIn: () => void
}) {


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          aria-controls={MOBILE_MENU_ID}
          aria-expanded={open ? "true" : "false"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[calc(100%-3rem)] max-w-xs bg-card p-0 text-card-foreground sm:w-[22rem]"
        aria-label="Mobile navigation panel"
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <Brand />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="my-2 h-px bg-border/70" />

        <nav id={MOBILE_MENU_ID} aria-label="Mobile Primary" className="px-3 py-2">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-foreground/90 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

        </nav>

        <div className="mt-2 h-px bg-border/70" />

        <div className="flex items-center gap-2 px-3 py-3">
          <button
            type="button"
            onClick={() => {
              onSignIn?.()
              setOpen(false)
            }}
            aria-label="Account"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground/80 ring-1 ring-inset ring-border/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <User2 className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="pb-6" />
      </SheetContent>
    </Sheet>
  )
}