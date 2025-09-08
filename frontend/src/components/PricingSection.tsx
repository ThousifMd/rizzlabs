"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield } from "lucide-react";
import { usePackage, Package } from "@/contexts/PackageContext";
import { trackAddToCart, trackCTAClick } from "@/lib/metaPixel";

const pricingTiers = [
  {
    id: "get-noticed",
    name: "Get Noticed",
    price: 37,
    originalPrice: 99,
    discount: "Save 62%",
    description: "Perfect for getting started",
    features: [
      "5 enhanced photos",
      "3 style variations",
      "Basic bio tips",
      "24-hour delivery"
    ],
    buttonText: "Get Started",
    popular: false,
    mobileOrder: 1
  },
  {
    id: "most-matches",
    name: "Most Matches",
    price: 69,
    originalPrice: 199,
    discount: "Most Popular",
    description: "Most popular choice",
    features: [
      "10 enhanced photos",
      "6 style variations",
      "Bio optimization",
      "Profile strategy guide",
      "12-hour delivery"
    ],
    buttonText: "Get Started",
    popular: true,
    mobileOrder: 2
  },
  {
    id: "date-ready",
    name: "Date Ready",
    price: 97,
    originalPrice: 199,
    discount: "Save 51%",
    description: "For serious results",
    features: [
      "20 enhanced photos",
      "10 style variations",
      "Complete profile makeover",
      "Message templates",
      "Priority 6-hour delivery"
    ],
    buttonText: "Get Started",
    popular: false,
    mobileOrder: 3
  },
  {
    id: "complete-makeover",
    name: "Complete Makeover",
    price: 197,
    originalPrice: 399,
    discount: "Save 50%",
    description: "Ultimate transformation",
    features: [
      "30 enhanced photos",
      "All styles",
      "1-on-1 consultation",
      "Weekly updates for 1 month",
      "2-hour rush delivery"
    ],
    buttonText: "Get Started",
    popular: false,
    mobileOrder: 4
  }
];

export const PricingSection = () => {
  const { selectedPackage, setSelectedPackage } = usePackage();
  const [localSelectedPackage, setLocalSelectedPackage] = React.useState<string | null>(null);

  const handlePackageSelect = (packageId: string) => {
    setLocalSelectedPackage(packageId);
    const packageData = pricingTiers.find(tier => tier.id === packageId);
    if (packageData) {
      trackAddToCart(packageData.name, packageData.price);
    }
  };

  const handleGetStarted = (packageId: string) => {
    const packageData = pricingTiers.find(tier => tier.id === packageId);
    if (packageData) {
      // Track CTA click
      trackCTAClick(`Get Started - ${packageData.name}`, "Pricing Section");
      // Set global selection
      setSelectedPackage(packageData);
      // Store selected package in localStorage for payment page
      localStorage.setItem('selectedPackage', packageId);
      window.location.href = `/checkout`;
    }
  };

  return (
    <section className="py-16 lg:py-24" aria-labelledby="pricing-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Container with Glass Morphism */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2
              id="pricing-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4"
            >
              Pricing
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Choose your transformation level. Most users see 3x more matches with our proven approach.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-12 items-stretch">
            {pricingTiers
              .sort((a, b) => {
                // Sort by mobile order on small screens
                if (typeof window !== 'undefined' && window.innerWidth < 1280) {
                  return a.mobileOrder - b.mobileOrder;
                }
                return 0;
              })
              .map((tier) => (
                <Card
                  key={tier.name}
                  className={`relative group transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8 hover:border-[#FFD700]/30 hover:shadow-[#FFD700]/20 ${localSelectedPackage === tier.id
                    ? "border-2 border-[#FFD700] shadow-lg shadow-[#FFD700]/30"
                    : "border border-white/10 shadow-sm"
                    }`}
                  role="article"
                  aria-label={`${tier.name} pricing plan`}
                  onClick={() => handlePackageSelect(tier.id)}
                >
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFA500] hover:to-[#FF8C00] px-4 py-1.5 font-medium">
                      {tier.discount}
                    </Badge>
                  </div>

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-heading font-bold text-white mb-2">
                      {tier.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300 mb-4">
                      {tier.description}
                    </CardDescription>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl lg:text-5xl font-heading font-bold text-white">
                        ${tier.price}
                      </span>
                      <div className="text-sm text-gray-400">
                        <div className="line-through">Was ${tier.originalPrice}</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4 flex flex-col flex-grow">
                    <ul className="space-y-4 mb-8 flex-grow" role="list">
                      {tier.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3"
                          role="listitem"
                        >
                          <Check
                            className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#FFD700]"
                            aria-hidden="true"
                          />
                          <span className="text-white text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {tier.id === "most-matches" ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = "/onboarding";
                        }}
                        className="relative w-full h-auto min-h-[48px] px-8 py-3 rounded-lg font-semibold text-lg bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md border-2 border-transparent bg-clip-border hover:bg-white/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FFD700]/20 overflow-hidden group mt-auto flex items-center justify-center"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.1)), linear-gradient(135deg, #FFD700, #FFA500, #FFD700)',
                          backgroundOrigin: 'border-box',
                          backgroundClip: 'padding-box, border-box'
                        }}
                        aria-label="Make me a match magnet"
                      >

                        <span className="relative z-20 text-white font-black drop-shadow-lg text-sm whitespace-nowrap">Level Up My Man Game</span>
                      </button>
                    ) : (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (localSelectedPackage === tier.id) {
                            handleGetStarted(tier.id);
                          } else {
                            handlePackageSelect(tier.id);
                          }
                        }}
                        className={`w-full transition-all duration-300 mt-auto ${localSelectedPackage === tier.id
                          ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-black shadow-lg shadow-[#FFD700]/30"
                          : "bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 hover:border-[#FFD700] hover:text-white"
                          }`}
                        size="lg"
                      >
                        {localSelectedPackage === tier.id ? "Get Started" : "Get Selected"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>

        </div>
      </div>
    </section>
  );
};