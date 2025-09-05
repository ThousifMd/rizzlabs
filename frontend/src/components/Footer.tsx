"use client"

import * as React from "react"
import Link from "next/link"
import { Star } from "lucide-react"

export interface FooterProps {
  className?: string
  containerClassName?: string
  year?: number
  customersCount?: number
  rating?: number
  trustCopy?: string
}

export default function Footer({
  className,
  containerClassName,
  year,
  customersCount = 2847,
  rating = 4.9,
  trustCopy = "GDPR‑compliant • Secure checkout via Stripe",
}: FooterProps) {
  const currentYear = year ?? new Date().getFullYear()
  const formattedCustomers = new Intl.NumberFormat("en-US").format(customersCount)

  return (
    <footer
      className={[
        "bg-secondary border-t border-border",
        "text-muted-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="contentinfo"
    >
      <div className={["container", "max-w-6xl", containerClassName].filter(Boolean).join(" ")}>
        {/* Row 1 */}
        <div className="flex flex-col items-center gap-3 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-accent text-accent-foreground font-heading text-xs"
            >
              M
            </span>
            <p className="m-0 text-sm text-foreground">
              <span className="font-medium">Matchlens</span>
              <span className="mx-1.5 text-muted-foreground">—</span>
              <span className="text-muted-foreground">AI + human dating photo concierge</span>
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
            aria-label="Legal and contact"
          >
            <Link
              href="/terms"
              aria-label="Read our Terms of Service"
              className="rounded-md px-2 py-1 text-sm transition-colors hover:text-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EDC967] focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
            >
              Terms
            </Link>
            <span className="select-none text-muted-foreground">•</span>
            <Link
              href="/privacy"
              aria-label="Read our Privacy Policy"
              className="rounded-md px-2 py-1 text-sm transition-colors hover:text-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EDC967] focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
            >
              Privacy
            </Link>
            <span className="select-none text-muted-foreground">•</span>
            <Link
              href="/contact"
              aria-label="Contact us"
              className="rounded-md px-2 py-1 text-sm transition-colors hover:text-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EDC967] focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col items-center gap-3 pb-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="m-0 text-xs sm:text-sm">
            <span className="text-muted-foreground">© {currentYear} Matchlens.</span>{" "}
            <span className="text-muted-foreground">{trustCopy}</span>
          </p>

          <div className="inline-flex items-center gap-2">
            <div className="flex items-center" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-accent"
                  stroke="none"
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-foreground sm:text-sm">
              {formattedCustomers} Happy Customers
            </span>
            <span className="sr-only">Rated {rating} out of 5 stars by {formattedCustomers} customers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}