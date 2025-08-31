import * as React from "react";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import { TransformationGallery } from "@/components/TransformationGallery";
import { PricingSection } from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const ctaHref = "/onboarding";

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <Navbar ctaHref={ctaHref} />

      <main className="relative">
        {/* Hero section - above the fold */}
        <div className="pt-16">
          <HeroSection
            ctaHref={ctaHref}
            className="mx-auto"
          />
        </div>



        {/* Transformation Gallery */}
        <TransformationGallery />

        {/* Pricing Section */}
        <PricingSection />

        {/* Lazy-loaded content section placeholder */}
        <Suspense fallback={<div className="h-32" />}>
          <section className="container max-w-[1200px] mx-auto py-16">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-muted-foreground">
                Additional Testimonials
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                More social proof and testimonials will be loaded here.
              </p>
            </div>
          </section>
        </Suspense>
      </main>

      <Footer
        customersCount={2847}
        rating={4.9}
        trustCopy="GDPR‑compliant • Secure checkout via Stripe"
      />
    </div>
  );
}