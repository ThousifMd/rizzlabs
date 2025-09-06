"use client";

import * as React from "react";

interface HeroSectionProps {
  ctaHref: string;
  className?: string;
}

export default function HeroSection({ ctaHref, className }: HeroSectionProps) {
  const handleCTA = () => {
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
        <h1 className="font-heading font-extrabold tracking-tight text-[36px] leading-[1.05] md:text-[56px] md:leading-[1.05] text-white mb-6">
          Do you know that <span className="text-[#d4ae36] text-[42px] md:text-[68px]">85%</span> of women swipe<br />
          right on only <span className="text-[#d4ae36] text-[42px] md:text-[68px]">5%</span> of men?
        </h1>

        <p className="text-xl text-white max-w-3xl mb-8">
          Your photos and profile are holding you back — not you. We transform both into a swipe-magnet that gets you noticed instantly.
        </p>

        {/* CTA Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleCTA}
            className="relative h-auto min-h-[48px] px-8 py-3 rounded-lg font-semibold text-lg bg-white/5 backdrop-blur-md border border-[#d4ae36]/40 text-[#d4ae36] hover:border-[#d4ae36]/60 hover:bg-white/10 transition-all duration-300 ease-out hover:-translate-y-0.5 overflow-hidden group"
            aria-label="Make me a match magnet"
          >
            {/* Flowing wave collision animation */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              {/* Left flowing wave */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-[#e6c547]/50 to-transparent opacity-0"
                  style={{
                    animation: 'flowingWaveLeft 2s ease-in-out infinite'
                  }}>
                </div>
              </div>

              {/* Right flowing wave */}
              <div className="absolute top-0 right-0 w-full h-full">
                <div className="w-full h-full bg-gradient-to-l from-transparent via-[#e6c547]/50 to-transparent opacity-0"
                  style={{
                    animation: 'flowingWaveRight 2s ease-in-out infinite'
                  }}>
                </div>
              </div>

              {/* Collision sparkles */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2">
                <div className="absolute inset-0 bg-[#e6c547] rounded-full opacity-0"
                  style={{
                    animation: 'sparkleBurst 2s ease-in-out infinite'
                  }}>
                </div>
                <div className="absolute top-0 left-0 w-1 h-1 bg-[#e6c547] rounded-full opacity-0"
                  style={{
                    animation: 'sparkle1 2s ease-in-out infinite'
                  }}>
                </div>
                <div className="absolute top-0 right-0 w-1 h-1 bg-[#e6c547] rounded-full opacity-0"
                  style={{
                    animation: 'sparkle2 2s ease-in-out infinite'
                  }}>
                </div>
                <div className="absolute bottom-0 left-0 w-1 h-1 bg-[#e6c547] rounded-full opacity-0"
                  style={{
                    animation: 'sparkle3 2s ease-in-out infinite'
                  }}>
                </div>
                <div className="absolute bottom-0 right-0 w-1 h-1 bg-[#e6c547] rounded-full opacity-0"
                  style={{
                    animation: 'sparkle4 2s ease-in-out infinite'
                  }}>
                </div>
                <div className="absolute top-1/2 left-0 w-0.5 h-0.5 bg-[#e6c547] rounded-full opacity-0"
                  style={{
                    animation: 'sparkle5 2s ease-in-out infinite'
                  }}>
                </div>
                <div className="absolute top-1/2 right-0 w-0.5 h-0.5 bg-[#e6c547] rounded-full opacity-0"
                  style={{
                    animation: 'sparkle6 2s ease-in-out infinite'
                  }}>
                </div>
                <div className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-[#e6c547] rounded-full opacity-0"
                  style={{
                    animation: 'sparkle7 2s ease-in-out infinite'
                  }}>
                </div>
                <div className="absolute bottom-0 left-1/2 w-0.5 h-0.5 bg-[#e6c547] rounded-full opacity-0"
                  style={{
                    animation: 'sparkle8 2s ease-in-out infinite'
                  }}>
                </div>
              </div>
            </div>

            <span className="relative z-10">Make Me a Match Magnet →</span>
          </button>
        </div>

        {/* Supporting Text */}
        <div className="flex items-center gap-2 text-sm text-white">
          <span>Private</span>
          <span>•</span>
          <span>Secure</span>
          <span>•</span>
          <span>24h delivery</span>
        </div>
      </div>
    </section>
  );
}