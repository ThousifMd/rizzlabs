"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield } from "lucide-react";
import { usePackage, Package } from "@/contexts/PackageContext";

const pricingTiers = [
  {
    id: "get-noticed",
    name: "Get Noticed",
    price: 37,
    originalPrice: 99,
    discount: "Save 62%",
    description: "Perfect for getting started",
    features: [
      "20 enhanced photos",
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
      "50 enhanced photos",
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
      "100 enhanced photos",
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
      "Unlimited photos",
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

  const handleSelectPackage = (packageId: string) => {
    const packageData = pricingTiers.find(tier => tier.id === packageId);
    if (packageData) {
      setSelectedPackage(packageData);
      // Store selected package in localStorage for payment page
      localStorage.setItem('selectedPackage', packageId);
      window.location.href = `/onboarding`;
    }
  };

  const handlePackageClick = (packageData: Package) => {
    setSelectedPackage(packageData);
  };

  return (
    <section className="py-16 lg:py-24" aria-labelledby="pricing-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            id="pricing-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4"
          >
            Pricing
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Most users see 3x more matches — or we'll re-edit until you do.
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
                className={`relative group transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col h-full bg-gray-900 ${selectedPackage?.id === tier.id
                  ? "border-2 border-yellow-400 shadow-lg"
                  : tier.popular
                    ? "border-2 border-yellow-400 shadow-lg"
                    : "border border-gray-800 shadow-sm"
                  }`}
                role="article"
                aria-label={`${tier.name} pricing plan`}
                onClick={() => handlePackageClick(tier)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-amber-500 text-white hover:bg-amber-400 px-4 py-1.5 font-medium">
                      {tier.discount}
                    </Badge>
                  </div>
                )}
                {!tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gray-700 text-white px-4 py-1.5 font-medium">
                      {tier.discount}
                    </Badge>
                  </div>
                )}
                {selectedPackage?.id === tier.id && (
                  <div className="absolute -top-3 right-3">
                    <Badge className="bg-amber-500 text-white hover:bg-amber-400 px-4 py-1.5 font-medium">
                      Selected
                    </Badge>
                  </div>
                )}

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
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${tier.popular ? "text-amber-500" : "text-amber-500"
                            }`}
                          aria-hidden="true"
                        />
                        <span className="text-white text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSelectPackage(tier.id)}
                    className={`w-full transition-all duration-300 mt-auto ${tier.popular
                      ? "bg-amber-500 hover:bg-amber-400 text-white shadow-lg"
                      : "bg-amber-500 hover:bg-amber-400 text-white"
                      }`}
                    size="lg"
                    aria-label={`Select ${tier.name} plan for $${tier.price}`}
                  >
                    {tier.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-full px-6 py-3 shadow-sm">
            <Shield className="w-5 h-5 text-amber-500" aria-hidden="true" />
            <span className="text-sm font-medium text-white">
              30-day money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};