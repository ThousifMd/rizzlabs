"use client"

import * as React from "react"
import Link from "next/link"
import { Star, Instagram, Twitter, Facebook, Youtube, Linkedin } from "lucide-react"

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
  trustCopy = "GDPR‑compliant • Secure checkout",
}: FooterProps) {
  const currentYear = year ?? new Date().getFullYear()
  const formattedCustomers = new Intl.NumberFormat("en-US").format(customersCount)

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/matchlens", color: "hover:text-pink-400" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/matchlens", color: "hover:text-blue-400" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/matchlens", color: "hover:text-blue-600" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/@matchlens", color: "hover:text-red-500" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/matchlens", color: "hover:text-blue-500" },
  ]

  return (
    <footer
      className={[
        "relative overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="contentinfo"
    >
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md border-t border-white/10"></div>

      <div className={["relative z-10 container", "max-w-4xl", containerClassName].filter(Boolean).join(" ")}>
        {/* Main Footer Content */}
        <div className="py-8">
          {/* Top Row - Brand and Social */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#d4ae36] to-[#c19d2f] text-black font-heading text-sm font-bold"
              >
                M
              </span>
              <div>
                <p className="m-0 text-lg text-white font-semibold">
                  Matchlens AI
                </p>
                <p className="m-0 text-sm text-white/60">
                  Dating photo optimization
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#d4ae36]/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d4ae36]/20`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <IconComponent className={`w-4 h-4 text-white/70 group-hover:text-[#d4ae36] transition-colors duration-300 ${social.color}`} />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Bottom Row - Navigation and Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            {/* Navigation */}
            <nav
              className="flex items-center gap-6"
              aria-label="Legal and contact"
            >
              <Link
                href="/terms"
                aria-label="Read our Terms of Service"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                aria-label="Read our Privacy Policy"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                aria-label="Contact us"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
            </nav>

            {/* Copyright and Rating */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="m-0 text-sm text-white/60">
                © {currentYear} Matchlens. {trustCopy}
              </p>

              <div className="flex items-center gap-2">
                <div className="flex items-center" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-[#d4ae36]"
                      stroke="none"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-white">
                  {formattedCustomers} Happy Customers
                </span>
                <span className="sr-only">Rated {rating} out of 5 stars by {formattedCustomers} customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}