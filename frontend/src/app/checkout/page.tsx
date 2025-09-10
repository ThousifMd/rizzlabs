"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  CreditCard,
  Lock,
  CheckCircle,
  Star,
  Users,
  RotateCcw,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { usePackage } from "@/contexts/PackageContext";
import SimplePayPalCheckout from "@/components/SimplePayPalCheckout";

// Dodo Payment Configuration
const DODO_PAYMENT_URL = process.env.NEXT_PUBLIC_DODO_PAYMENT_URL || "https://api.dodo.com/payments";

interface Package {
  id: string;
  name: string;
  originalPrice: number;
  price: number;
  features: string[];
  popular?: boolean;
}

const packages: Package[] = [
  {
    id: "starter",
    name: "Starter Package",
    originalPrice: 59,
    price: 1,
    features: [
      "20 enhanced photos",
      "3 style variations",
      "Basic bio tips",
      "24-hour delivery",
    ],
  },
  {
    id: "professional",
    name: "Professional Package",
    originalPrice: 99,
    price: 1,
    features: [
      "50 enhanced photos",
      "6 style variations",
      "Bio optimization",
      "Profile strategy guide",
      "12-hour delivery",
    ],
    popular: true,
  },
  {
    id: "elite",
    name: "Elite Package",
    originalPrice: 149,
    price: 1,
    features: [
      "100 enhanced photos",
      "10 style variations",
      "Complete profile makeover",
      "Message templates",
      "Priority 6-hour delivery",
    ],
  },
  {
    id: "vip",
    name: "VIP Package",
    originalPrice: 249,
    price: 1,
    features: [
      "Unlimited photos",
      "All styles",
      "1-on-1 consultation",
      "Weekly updates for 1 month",
      "2-hour rush delivery",
    ],
  },
];

const testimonials = [
  {
    name: "Alex M.",
    image: "/images/s7.jpg",
    quote: "Got 10x more matches in the first week! The AI enhancement made my photos look naturally perfect.",
    rating: 5,
  },
  {
    name: "Mike R.",
    image: "/images/s8.jpg",
    quote: "Amazing results! The professional package transformed my dating profile completely.",
    rating: 5,
  },
  {
    name: "David L.",
    image: "/images/s9.jpg",
    quote: "Worth every penny. The enhanced photos looked so natural, nobody could tell they were AI-optimized.",
    rating: 5,
  },
];

interface PaymentFormProps {
  selectedPackage: Package;
  onPaymentSuccess: () => void;
  showNotification: (type: 'success' | 'error' | 'info', message: string) => void;
}

function PaymentForm({ selectedPackage, onPaymentSuccess, showNotification }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !zipCode || !email) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create payment data for Dodo
      const paymentData = {
        amount: selectedPackage.price * 100, // Convert to cents
        currency: 'usd',
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        cardNumber: cardNumber.replace(/\s/g, ''),
        expiryDate,
        cvv,
        zipCode,
        email,
        metadata: {
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          originalPrice: selectedPackage.originalPrice,
          price: selectedPackage.price
        }
      };

      // Call Dodo payment API
      const response = await fetch('/api/dodo/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();

      if (result.success) {
        // Payment successful
        onPaymentSuccess();
      } else {
        setError(result.error || "Payment failed. Please try again.");
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError("Payment failed. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <SimplePayPalCheckout
        selectedPackage={selectedPackage}
        showNotification={showNotification}
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center space-x-6 text-sm text-white/70">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-[#d4ae36]" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <RotateCcw className="w-4 h-4 text-[#d4ae36]" />
          <span>Money Back Guarantee</span>
        </div>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 text-[#d4ae36]">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">11,847 customers served</span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Badge variant="secondary" className="bg-[#d4ae36]/20 text-[#d4ae36] border-[#d4ae36]/30">
          <CheckCircle className="w-3 h-3 mr-1" />
          Secure Payment
        </Badge>
        <Badge variant="secondary" className="bg-[#d4ae36]/20 text-[#d4ae36] border-[#d4ae36]/30">
          <Lock className="w-3 h-3 mr-1" />
          256-bit SSL
        </Badge>
      </div>
    </div>
  );
}

function TestimonialSidebar() {
  return (
    <div className="block space-y-6 lg:sticky lg:top-8">
      <h3 className="font-heading text-lg font-semibold text-white">
        What Our Customers Say
      </h3>

      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/8 hover:border-white/20 transition-all duration-300 ease-out">
            <div className="flex items-start space-x-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#d4ae36] text-[#d4ae36]" />
                  ))}
                </div>
                <p className="text-sm text-white/70 mb-2">{testimonial.quote}</p>
                <p className="text-xs font-medium text-white">{testimonial.name}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedPackage: contextPackage, setSelectedPackage } = usePackage();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showMobilePayment, setShowMobilePayment] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000); // Auto-hide after 4 seconds
  };

  // Use package from context or fallback to localStorage (client-side only)
  const [selectedPackage, setSelectedPackageState] = useState<Package | null>(null);

  useEffect(() => {
    if (contextPackage) {
      setSelectedPackageState(contextPackage);
    } else {
      // Fallback to localStorage (client-side only)
      if (typeof window !== 'undefined') {
        const packageId = localStorage.getItem('selectedPackage') || "professional";
        const pkg = packages.find(p => p.id === packageId) || packages[1];
        setSelectedPackageState(pkg);
      } else {
        // Default to professional package during SSR
        setSelectedPackageState(packages[1]);
      }
    }
  }, [contextPackage]);

  const handlePaymentSuccess = async () => {
    try {
      // Get stored form data from localStorage
      const storedFormData = localStorage.getItem('onboardingFormData');

      if (!storedFormData) {
        console.error('No form data found');
        router.push('/onboarding/success?submissionId=payment-success');
        return;
      }

      const formData = JSON.parse(storedFormData);

      // Create JSON data to send to server
      const dataToSend: any = {
        name: formData.name,
        gender: formData.gender || 'not_specified',
        age: formData.age,
        datingGoal: formData.datingGoal,
        currentMatches: formData.currentMatches,
        bodyType: formData.bodyType,
        stylePreference: formData.stylePreference,
        ethnicity: formData.ethnicity,
        interests: JSON.stringify(formData.interests),
        currentBio: formData.currentBio,
        email: formData.email,
        phone: formData.phone,
        weeklyTips: formData.weeklyTips.toString()
      };

      // Get stored photos from global variable (to avoid storage quota issues)
      const photos = (window as any).onboardingPhotos || [];
      const screenshots = (window as any).onboardingScreenshots || [];

      // Convert files to base64 for sending to backend
      const convertFilesToBase64 = async (files: File[]) => {
        const promises = files.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        });
        return Promise.all(promises);
      };

      const photoDataUrls = await convertFilesToBase64(photos);
      const screenshotDataUrls = await convertFilesToBase64(screenshots);

      dataToSend.originalPhotos = JSON.stringify(photoDataUrls);
      dataToSend.screenshotPhotos = JSON.stringify(screenshotDataUrls);

      // Submit to backend
      const response = await fetch('http://localhost:5001/api/onboarding/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();

      if (result.success) {
        // Clear stored data
        localStorage.removeItem('onboardingFormData');
        if (typeof window !== 'undefined') {
          delete (window as any).onboardingPhotos;
          delete (window as any).onboardingScreenshots;
        }

        // Redirect to success page
        router.push(`/onboarding/success?submissionId=${result.submissionId}`);
      } else {
        console.error('Form submission failed:', result.error);
        router.push('/onboarding/success?submissionId=payment-success');
      }
    } catch (error) {
      console.error('Error submitting form after payment:', error);
      router.push('/onboarding/success?submissionId=payment-success');
    }
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4ae36]" />
      </div>
    );
  }

  const savings = selectedPackage.originalPrice - selectedPackage.price;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Glass morphism background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0E0E0F] to-black"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4ae36]/5 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#d4ae36]/3 via-transparent to-transparent"></div>

      {/* Simple Animated Line - Below Browser Address Bar */}
      {notification && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 overflow-hidden">
          <div className={`h-full animate-line-progress-fast ${notification.type === 'success'
            ? 'bg-gradient-to-r from-green-400 to-green-500'
            : 'bg-gradient-to-r from-red-400 to-red-500'
            }`}></div>
        </div>
      )}

      {/* Payment Status Text - Shows during line animation */}
      {notification && (
        <div className="fixed top-3 right-3 md:top-2 md:right-4 z-50">
          <div className={`text-sm md:text-sm font-semibold animate-fade-in-out px-3 py-1 rounded-lg backdrop-blur-sm ${notification.type === 'success'
            ? 'text-green-300 bg-green-500/10 border border-green-500/20'
            : 'text-red-300 bg-red-500/10 border border-red-500/20'
            }`}>
            {notification.type === 'success' ? 'Payment Success' : 'Payment Failed'}
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">

        {/* First Impression Header */}
        <div className="mb-6 md:mb-8">
          <div className="relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-[#d4ae36]/30 rounded-xl p-4 md:p-8 text-center shadow-2xl">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4ae36]/20 via-[#FD5E76]/20 to-[#d4ae36]/20 animate-pulse"></div>


            {/* Quote text */}
            <div className="relative z-10">
              <p className="text-lg md:text-2xl text-white italic mb-3 md:mb-4 font-bold leading-relaxed">
                You never get a second chance to make a first impression
              </p>
              <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-[#d4ae36] to-[#FD5E76] mx-auto mb-3 md:mb-4 rounded-full"></div>
              <p className="text-base md:text-lg text-[#d4ae36] font-semibold">
                We make sure your first impression counts.
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-2 right-2 w-2 h-2 md:w-3 md:h-3 bg-[#d4ae36] rounded-full opacity-60"></div>
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#FD5E76] rounded-full opacity-60"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Order Details - Left Column */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6 order-1 lg:order-1">
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/8 hover:border-white/20 transition-all duration-300 ease-out">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span>Order Summary</span>
                  {selectedPackage.popular && (
                    <Badge className="bg-[#d4ae36] text-black">Most Popular</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{selectedPackage.name}</h3>
                    <ul className="text-sm text-white/70 mt-2 space-y-1">
                      {selectedPackage.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-[#d4ae36] mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Regular Price</span>
                    <span className="line-through text-white/70">
                      ${selectedPackage.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Today's Price</span>
                    <span className="text-[#d4ae36] font-semibold">
                      ${selectedPackage.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-[#d4ae36]">You Save</span>
                    <span className="text-[#d4ae36]">${savings}</span>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-[#d4ae36]">${selectedPackage.price}</span>
                </div>
              </CardContent>
            </Card>

            {/* Trust Elements */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/8 hover:border-white/20 transition-all duration-300 ease-out">
              <CardContent className="pt-6">
                <TrustBadges />
              </CardContent>
            </Card>
          </div>

          {/* Payment Form - Center Column */}
          <div className="lg:col-span-2 order-2 lg:order-2">
            <Card className="sticky top-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/8 hover:border-white/20 transition-all duration-300 ease-out">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <CreditCard className="w-5 h-5 mr-2 text-[#d4ae36]" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentForm
                  selectedPackage={selectedPackage}
                  onPaymentSuccess={handlePaymentSuccess}
                  showNotification={showNotification}
                />
              </CardContent>
            </Card>
          </div>

          {/* Testimonials - Right Column */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6 order-3 lg:order-3">
            <TestimonialSidebar />
          </div>
        </div>
      </div>

      {/* Mobile Fixed Payment Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-xl border-t border-white/20 p-4 z-50">
        <button
          type="button"
          onClick={() => setShowMobilePayment(true)}
          className="relative w-full h-auto min-h-[60px] px-6 py-4 rounded-xl font-semibold text-lg bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FFD700]/20 overflow-hidden group touch-manipulation"
        >
          {/* Glass morphism background with flowing colors */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            {/* Gold wave from left */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-full bg-gradient-to-r from-[#d4ae36]/30 via-[#d4ae36]/20 to-transparent opacity-80"
                style={{
                  animation: 'flowingWaveLeft 3s ease-in-out infinite'
                }}>
              </div>
            </div>

            {/* Pink wave from right */}
            <div className="absolute top-0 right-0 w-full h-full">
              <div className="w-full h-full bg-gradient-to-l from-[#FD5E76]/30 via-[#FD5E76]/20 to-transparent opacity-80"
                style={{
                  animation: 'flowingWaveRight 3s ease-in-out infinite'
                }}>
              </div>
            </div>

            {/* Center collision effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4ae36] to-[#FD5E76] rounded-full opacity-60"
                style={{
                  animation: 'sparkleBurst 3s ease-in-out infinite'
                }}>
              </div>
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#d4ae36] rounded-full opacity-70"
                style={{
                  animation: 'sparkle1 3s ease-in-out infinite'
                }}>
              </div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#FD5E76] rounded-full opacity-70"
                style={{
                  animation: 'sparkle2 3s ease-in-out infinite'
                }}>
              </div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#d4ae36] rounded-full opacity-70"
                style={{
                  animation: 'sparkle3 3s ease-in-out infinite'
                }}>
              </div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#FD5E76] rounded-full opacity-70"
                style={{
                  animation: 'sparkle4 3s ease-in-out infinite'
                }}>
              </div>
            </div>
          </div>

          <span className="relative z-20 text-white font-bold drop-shadow-lg flex items-center justify-center">
            <Lock className="w-4 h-4 mr-2" />
            Pay ${selectedPackage.price} Now
          </span>
        </button>
      </div>

      {/* Mobile Payment Modal */}
      {showMobilePayment && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-50 flex items-end">
          <div className="w-full bg-black/30 backdrop-blur-xl border-t border-white/20 rounded-t-xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Complete Payment</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobilePayment(false)}
                className="text-white hover:text-white"
              >
                ✕
              </Button>
            </div>
            <PaymentForm
              selectedPackage={selectedPackage}
              onPaymentSuccess={handlePaymentSuccess}
              showNotification={showNotification}
            />
          </div>
        </div>
      )}

      {/* Mobile Padding for Fixed Button */}
      <div className="lg:hidden h-24" />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4ae36]" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}