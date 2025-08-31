"use client";

import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, GripVertical } from "lucide-react";

import { usePackage } from "@/contexts/PackageContext";

type Milliseconds = number;

interface HeroSectionProps {
  ctaHref: string;
  className?: string;
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}



export default function HeroSection({ ctaHref, className }: HeroSectionProps) {
  const { selectedPackage } = usePackage();



  // Slider progressive image loading
  const [shouldLoadHiRes, setShouldLoadHiRes] = useState(false);
  const [ariaSliderPos, setAriaSliderPos] = useState<number>(50);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadHiRes(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    const idle = (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(() => setShouldLoadHiRes(true))
      : setTimeout(() => setShouldLoadHiRes(true), 1200);
    return () => {
      io.disconnect();
      typeof idle === "number" ? clearTimeout(idle) : (window as any).cancelIdleCallback?.(idle);
    };
  }, []);





  const onSliderKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = clamp(ariaSliderPos + (e.key === "ArrowRight" ? step : -step));
      setAriaSliderPos(next);
      setShouldLoadHiRes(true);
    }
    if (e.key === "Home") {
      setAriaSliderPos(0);
    }
    if (e.key === "End") {
      setAriaSliderPos(100);
    }
  };

  const handleCTA = () => {
    localStorage.setItem('selectedPackage', 'professional');
    window.location.href = "/onboarding";
  };

  // Slider event handlers
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = useCallback((clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setAriaSliderPos(percentage); // Remove Math.round for smoother movement
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    handleSliderMove(e.clientX);
  }, [handleSliderMove]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    handleSliderMove(e.touches[0].clientX);
  }, [handleSliderMove]);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (!isDragging) {
      handleSliderMove(e.clientX);
    }
  }, [handleSliderMove, isDragging]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        handleSliderMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        handleSliderMove(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
      document.addEventListener('touchcancel', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('touchcancel', handleEnd);
    };
  }, [isDragging, handleSliderMove]);

  // Before/After transformation images
  // Before: Image 3.1 - Casual look
  // After: Image 3.3 - Professional transformation
  const beforeLow = "/images/3.1.png";
  const afterLow = "/images/3.3.png";

  const beforeHi = "/images/3.1.png";
  const afterHi = "/images/3.3.png";

  const beforeSrc = shouldLoadHiRes ? beforeHi : beforeLow;
  const afterSrc = shouldLoadHiRes ? afterHi : afterLow;

  return (
    <section
      className={[
        "container max-w-[1200px]",
        "py-10 md:py-16",
        className || "",
      ].join(" ")}
      aria-label="Matchlens hero section"
    >
      <div className="relative rounded-2xl bg-card shadow-sm ring-1 ring-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 p-6 sm:p-8 md:p-12">
          {/* Left column */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <Badge
                variant="secondary"
                className="rounded-full bg-secondary text-secondary-foreground border border-border"
              >
                AI + Human Edits
              </Badge>
            </div>

            <h1 className="font-heading font-extrabold tracking-tight text-[48px] leading-[1.05] md:text-[72px] md:leading-[1.05]">
              From 2 Matches to 50+ in 7 Days
            </h1>

            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              AI-powered photos that get you 3x more matches on dating apps - guaranteed
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <em>3x more matches or your money back</em>
            </p>

            {/* CTA row */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Button
                type="button"
                onClick={handleCTA}
                className={[
                  "h-auto min-h-[44px] px-6 md:px-7 py-4",
                  "rounded-full font-semibold text-white",
                  "bg-[#10B981] hover:bg-[#0FAE78]",
                  "shadow-[0_6px_16px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_20px_rgba(16,185,129,0.35)]",
                  "transition-all duration-200 ease-out hover:-translate-y-0.5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "w-full sm:w-auto",
                ].join(" ")}
                aria-label={selectedPackage ? `Get ${selectedPackage.name} package` : "Get your photos now"}
              >
                {selectedPackage
                  ? `Get ${selectedPackage.name} Package →`
                  : "Get Your Photos Now →"
                }
              </Button>

              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-1.5"
                  aria-label="Rated 5 out of 5 stars by 2,847 customers"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden="true" className="size-4 text-[#10B981] fill-[#10B981]" />
                  ))}
                </div>
                <span className="text-sm font-semibold">2,847 Happy Customers</span>
              </div>
            </div>



            {/* Dynamic Pricing Display */}
            {selectedPackage && (
              <div className="mt-4 p-4 rounded-lg border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-800">
                      Selected: {selectedPackage.name}
                    </p>
                    <p className="text-xs text-emerald-600">
                      {selectedPackage.features[0]} • {selectedPackage.features[1]}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-800">
                      ${selectedPackage.price}
                    </p>
                    <p className="text-xs text-emerald-600 line-through">
                      ${selectedPackage.originalPrice}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column: Before/After placeholder slider */}
          <div className="flex items-center">
            <div className="w-full">
              <div
                ref={sliderRef}
                className={[
                  "relative group",
                  "rounded-xl border border-border bg-card overflow-hidden",
                  "shadow-sm cursor-grab active:cursor-grabbing",
                  "aspect-[4/5] md:aspect-[4/3]",
                ].join(" ")}
                style={{ ["--pos" as any]: "50%" }}
                aria-label="Before and after image comparison of a Matchlens photo edit"
                onClick={handleContainerClick}
              >
                {/* Before Image */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(0 ${100 - ariaSliderPos}% 0 0)`
                  }}
                >
                  <img
                    src={beforeSrc}
                    alt="Before edit example portrait"
                    width={1200}
                    height={900}
                    decoding="async"
                    loading={shouldLoadHiRes ? "eager" : "lazy"}
                    className="absolute inset-0 size-full object-cover select-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* After Image */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(0 0 0 ${ariaSliderPos}%)`
                  }}
                >
                  <img
                    src={afterSrc}
                    alt="After edit example portrait"
                    width={1200}
                    height={900}
                    decoding="async"
                    loading={shouldLoadHiRes ? "eager" : "lazy"}
                    className="absolute inset-0 size-full object-cover select-none"
                    style={{ objectPosition: 'center 30%' }}
                    draggable={false}
                  />
                </div>

                {/* Soft edge gradient mask */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10" />



                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-3 bg-white shadow-lg cursor-grab active:cursor-grabbing z-30 transition-all duration-200 ease-out"
                  style={{ left: `${ariaSliderPos}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={ariaSliderPos}
                  aria-label="Drag to reveal before and after"
                  tabIndex={0}
                  onKeyDown={onSliderKeyDown}
                >
                  {/* Handle Circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-[#10B981] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95">
                    <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full" />
                  </div>
                </div>

                {/* Before/After Labels */}
                <div className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                  Before
                </div>
                <div className="absolute bottom-4 right-4 text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                  After
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}