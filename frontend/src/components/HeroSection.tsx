"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { usePackage } from "@/contexts/PackageContext";

type Milliseconds = number;

interface HeroSectionProps {
  expiry?: number | string | Date;
  ctaHref: string;
  className?: string;
}

function toMs(expiry?: number | string | Date): Milliseconds {
  if (!expiry) return Date.now() + 24 * 60 * 60 * 1000;
  if (typeof expiry === "number") return expiry;
  const d = new Date(expiry);
  return d.getTime();
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatHMS(ms: Milliseconds) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

export default function HeroSection({ expiry, ctaHref, className }: HeroSectionProps) {
  const expiryMs = useMemo(() => toMs(expiry), [expiry]);
  const { selectedPackage } = usePackage();

  // Countdown state
  const [now, setNow] = useState<number>(() => Date.now());
  const [announced, setAnnounced] = useState<string>("");
  const expired = now >= expiryMs;
  const remaining = Math.max(0, expiryMs - now);

  // Throttle ARIA announcements: minutes when >=60s; seconds when <60s
  const lastAnnouncedRef = useRef<{ min?: number; sec?: number }>({});

  useEffect(() => {
    let raf: number | null = null;
    const tick = () => {
      setNow(Date.now());
      raf = window.setTimeout(() => requestAnimationFrame(tick), 1000);
    };
    tick();
    return () => {
      if (raf) clearTimeout(raf);
    };
  }, []);

  useEffect(() => {
    if (remaining <= 0) {
      if (!lastAnnouncedRef.current.sec && !lastAnnouncedRef.current.min) {
        toast.warning("Sale ended");
      }
      setAnnounced("Sale ended");
      lastAnnouncedRef.current = {};
      return;
    }
    const totalSecs = Math.floor(remaining / 1000);
    if (totalSecs >= 60) {
      const mins = Math.floor(totalSecs / 60);
      if (mins !== lastAnnouncedRef.current.min) {
        setAnnounced(`${mins} minute${mins === 1 ? "" : "s"} remaining`);
        lastAnnouncedRef.current.min = mins;
      }
    } else {
      const secs = totalSecs;
      if (secs !== lastAnnouncedRef.current.sec) {
        setAnnounced(`${secs} second${secs === 1 ? "" : "s"} remaining`);
        lastAnnouncedRef.current.sec = secs;
      }
    }
  }, [remaining]);

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

  // Slider behavior without continuous React re-renders
  const posRef = useRef<number>(50);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    // initialize CSS var
    if (sliderRef.current) {
      sliderRef.current.style.setProperty("--pos", `${posRef.current}%`);
    }
  }, []);

  const updatePosFromClientX = (clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = clamp(((clientX - rect.left) / rect.width) * 100);
    posRef.current = pct;
    el.style.setProperty("--pos", `${pct}%`);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      setAriaSliderPos(Math.round(pct));
    });
  };

  const startDrag = (clientX: number) => {
    updatePosFromClientX(clientX);
    const onMove = (e: MouseEvent) => updatePosFromClientX(e.clientX);
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const startTouch = (touch: Touch) => {
    updatePosFromClientX(touch.clientX);
    const onMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) updatePosFromClientX(e.touches[0].clientX);
    };
    const onEnd = () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    window.addEventListener("touchcancel", onEnd);
  };

  const onSliderKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = clamp(posRef.current + (e.key === "ArrowRight" ? step : -step));
      posRef.current = next;
      sliderRef.current?.style.setProperty("--pos", `${next}%`);
      setAriaSliderPos(Math.round(next));
      setShouldLoadHiRes(true);
    }
    if (e.key === "Home") {
      posRef.current = 0;
      sliderRef.current?.style.setProperty("--pos", `0%`);
      setAriaSliderPos(0);
    }
    if (e.key === "End") {
      posRef.current = 100;
      sliderRef.current?.style.setProperty("--pos", `100%`);
      setAriaSliderPos(100);
    }
  };

  const handleCTA = () => {
    if (expired) return;
    localStorage.setItem('selectedPackage', 'professional');
    window.location.href = "/onboarding";
  };

  // Placeholder and high-res image URLs (WebP)
  const beforeLow =
    "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=24&q=10&auto=format&fit=crop&fm=webp";
  const afterLow =
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=24&q=10&auto=format&fit=crop&fm=webp";

  const beforeHi =
    "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=1200&q=80&auto=format&fit=crop&fm=webp";
  const afterHi =
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=80&auto=format&fit=crop&fm=webp";

  const beforeSrc = shouldLoadHiRes ? beforeHi : beforeLow;
  const afterSrc = shouldLoadHiRes ? afterHi : afterLow;

  return (
    <section
      className={[
        "container max-w-[1200px]",
        "py-10 md:py-16",
        className || "",
      ].join(" ")}
      aria-label="RizzLab hero section"
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
                disabled={expired}
                className={[
                  "h-auto min-h-[44px] px-6 md:px-7 py-4",
                  "rounded-full font-semibold text-white",
                  expired ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-[#10B981] hover:bg-[#0FAE78]",
                  "shadow-[0_6px_16px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_20px_rgba(16,185,129,0.35)]",
                  "transition-all duration-200 ease-out hover:-translate-y-0.5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "w-full sm:w-auto",
                ].join(" ")}
                aria-label={expired ? "Sale ended" : selectedPackage ? `Get ${selectedPackage.name} package` : "Get your photos now"}
              >
                {expired
                  ? "Join Waitlist"
                  : selectedPackage
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

            {/* Countdown */}
            <div className="mt-6">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-3 py-2">
                <span className="text-sm text-foreground">50% off ends in</span>
                <span
                  className={[
                    "text-sm md:text-base font-semibold tracking-wide",
                    expired ? "text-muted-foreground" : "text-[#10B981]",
                  ].join(" ")}
                >
                  {expired ? "Sale ended" : formatHMS(remaining)}
                </span>
              </div>
              <div
                aria-live="polite"
                role="status"
                className="sr-only"
              >
                {announced}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Results may vary. Guarantee applies to eligible orders.
              </p>
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
                  "shadow-sm",
                  "aspect-[4/5] md:aspect-[4/3]",
                ].join(" ")}
                style={{ ["--pos" as any]: "50%" }}
                aria-label="Before and after image comparison of a RizzLab photo edit"
              >
                {/* Base (Before) */}
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

                {/* After overlay clipped to --pos */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: "var(--pos)" as any }}
                  aria-hidden="true"
                >
                  <img
                    src={afterSrc}
                    alt=""
                    width={1200}
                    height={900}
                    decoding="async"
                    loading={shouldLoadHiRes ? "eager" : "lazy"}
                    className="absolute inset-0 size-full object-cover select-none"
                    draggable={false}
                  />
                </div>

                {/* Soft edge gradient mask */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10" />

                {/* Top label */}
                <div className="absolute left-3 top-3">
                  <Badge variant="secondary" className="bg-secondary/90 backdrop-blur text-secondary-foreground border border-border">
                    Before / After — Placeholder
                  </Badge>
                </div>

                {/* Divider line */}
                <div
                  className="absolute top-0 h-full w-px bg-white/80 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
                  style={{ left: "var(--pos)" as any }}
                  aria-hidden="true"
                />

                {/* Handle */}
                <button
                  type="button"
                  className={[
                    "absolute top-1/2 -translate-y-1/2",
                    "translate-x-[-50%]",
                    "grid place-items-center",
                    "h-12 w-12 rounded-full",
                    "bg-white text-foreground shadow-md ring-1 ring-border",
                    "hover:shadow-lg hover:scale-[1.02]",
                    "transition-all duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]",
                  ].join(" ")}
                  style={{ left: "var(--pos)" as any }}
                  aria-label="Drag to reveal before and after"
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={ariaSliderPos}
                  onKeyDown={onSliderKeyDown}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setShouldLoadHiRes(true);
                    startDrag(e.clientX);
                  }}
                  onTouchStart={(e) => {
                    setShouldLoadHiRes(true);
                    if (e.touches && e.touches[0]) startTouch(e.touches[0]);
                  }}
                >
                  <GripVertical className="size-5" aria-hidden="true" />
                </button>

                {/* Drag microcopy */}
                <div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/85 px-3 py-1 text-xs text-foreground shadow-sm ring-1 ring-border opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  Drag to reveal
                </div>

                {/* Click/drag anywhere support */}
                <div
                  className="absolute inset-0 cursor-ew-resize"
                  onMouseDown={(e) => {
                    setShouldLoadHiRes(true);
                    startDrag(e.clientX);
                  }}
                  onTouchStart={(e) => {
                    setShouldLoadHiRes(true);
                    if (e.touches && e.touches[0]) startTouch(e.touches[0]);
                  }}
                />
              </div>
              <p className="mt-3 text-center text-xs italic text-muted-foreground">
                Real RizzLab edit — sample result
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}