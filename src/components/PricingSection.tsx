"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield } from "lucide-react";

const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    price: 39,
    originalPrice: 59,
    description: "Perfect for getting started",
    features: [
      "20 enhanced photos",
      "3 style variations", 
      "Basic bio tips",
      "24-hour delivery"
    ],
    buttonText: "Get Started",
    popular: false,
    mobileOrder: 2
  },
  {
    id: "professional",
    name: "Professional",
    price: 69,
    originalPrice: 99,
    description: "Most popular choice",
    features: [
      "50 enhanced photos",
      "6 style variations",
      "Bio optimization",
      "Profile strategy guide",
      "12-hour delivery"
    ],
    buttonText: "Choose Professional",
    popular: true,
    mobileOrder: 1
  },
  {
    id: "elite",
    name: "Elite",
    price: 99,
    originalPrice: 149,
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
    id: "vip",
    name: "VIP",
    price: 199,
    originalPrice: 249,
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
  const handleSelectPackage = (packageId: string) => {
    window.location.href = `/checkout?package=${packageId}`;
  };

  return (
    <section className="py-16 lg:py-24 bg-background" aria-labelledby="pricing-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 
            id="pricing-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
          >
            Choose Your Transformation Package
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Get professional photos that get you more matches
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
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
              className={`relative group transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                tier.popular
                  ? "border-2 border-emerald-500 shadow-lg"
                  : "border border-border shadow-sm"
              }`}
              role="article"
              aria-label={`${tier.name} pricing plan`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 px-4 py-1.5 font-medium">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-heading font-bold text-foreground mb-2">
                  {tier.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  {tier.description}
                </CardDescription>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
                    ${tier.price}
                  </span>
                  <div className="text-sm text-muted-foreground">
                    <div className="line-through">${tier.originalPrice}</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <ul className="space-y-4 mb-8" role="list">
                  {tier.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                      role="listitem"
                    >
                      <Check
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          tier.popular ? "text-emerald-500" : "text-primary"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="text-foreground text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPackage(tier.id)}
                  className={`w-full transition-all duration-300 ${
                    tier.popular
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
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
          <div className="flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 shadow-sm">
            <Shield className="w-5 h-5 text-emerald-500" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">
              30-day money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};