"use client";

import * as React from "react";

interface HeroSectionProps {
  ctaHref: string;
  className?: string;
}

export default function HeroSection({ ctaHref, className }: HeroSectionProps) {
  const handleCTA = () => {
    localStorage.setItem('selectedPackage', 'professional');
    window.location.href = "/onboarding";
  };

  return (
    <section
      className={[
        "container max-w-[1200px]",
        "py-10 md:py-16",
        className || "",
      ].join(" ")}
      aria-label="Matchlens hero section"
    >
      {/* Hero Content */}
      <div className="text-left mb-12">
        <h1 className="font-heading font-extrabold tracking-tight text-[48px] leading-[1.05] md:text-[72px] md:leading-[1.05] text-white mb-6">
          85% of women swipe<br />
          right on just 5% of men.<br />
          Be in that 5%.
        </h1>

        <p className="text-xl text-white max-w-3xl mb-8">
          Your photos and profile are holding you back — not you. We transform both into a swipe-magnet that gets you noticed instantly.
        </p>

        {/* CTA Button with Supporting Text */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <button
            type="button"
            onClick={handleCTA}
            className="h-auto min-h-[48px] px-8 py-3 rounded-lg font-semibold text-lg bg-transparent backdrop-blur-sm border border-[#d4ae36]/40 text-[#d4ae36] hover:border-[#d4ae36]/60 hover:bg-transparent transition-all duration-200 ease-out hover:-translate-y-0.5"
            aria-label="Make me a match magnet"
          >
            Make Me a Match Magnet →
          </button>

          <div className="flex items-center gap-2 text-sm text-white">
            <span>Private</span>
            <span>•</span>
            <span>Secure</span>
            <span>•</span>
            <span>24h delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}