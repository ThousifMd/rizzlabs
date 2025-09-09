"use client";

import * as React from "react";
import { trackCTAClick } from "@/lib/metaPixel";

interface HeroSectionProps {
  ctaHref: string;
  className?: string;
}

export default function HeroSection({ ctaHref, className }: HeroSectionProps) {
  const handleCTA = () => {
    trackCTAClick("Make Me A Match Magnet", "Hero Section");
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
          Do you know that <span className="text-[#FFD700] text-[42px] md:text-[68px]">85%</span> of women swipe<br />
          right on only <span className="text-[#FFD700] text-[42px] md:text-[68px]">5%</span> of men?
        </h1>

        <p className="text-xl text-white max-w-3xl mb-8">
          Your photos and profile are holding you back - not you. we create ai photos of you that look ultra realistic and optimized profile bio to transform into a swipe magnet that gets you noticed instantly .
        </p>

        {/* CTA Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleCTA}
            className="relative h-auto min-h-[48px] px-8 py-3 rounded-lg font-semibold text-lg bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FFD700]/20 overflow-hidden group"
            aria-label="Make me a match magnet"
          >
            {/* Glass morphism background with flowing colors */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              {/* Gold wave from left */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full h-full bg-gradient-to-r from-[#FFD700]/60 via-[#FFD700]/40 to-transparent opacity-90"
                  style={{
                    animation: 'flowingWaveLeft 3s ease-in-out infinite'
                  }}>
                </div>
              </div>

              {/* Pink wave from right */}
              <div className="absolute top-0 right-0 w-full h-full">
                <div className="w-full h-full bg-gradient-to-l from-[#FF69B4]/60 via-[#FF69B4]/40 to-transparent opacity-90"
                  style={{
                    animation: 'flowingWaveRight 3s ease-in-out infinite'
                  }}>
                </div>
              </div>

            </div>

            <span className="relative z-20 text-white font-bold drop-shadow-lg">Make me a match magnet</span>
          </button>
        </div>

        {/* First Impression Text */}
        <div className="mb-6">
          <p className="text-lg text-white/80 italic mb-2">
            "You never get a second chance to make a first impression"
          </p>
          <p className="text-base text-white/70">
            We make sure your first impression counts.
          </p>
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