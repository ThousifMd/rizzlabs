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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    quote: "Got 10x more matches in the first week! The AI enhancement made my photos look naturally perfect.",
    rating: 5,
  },
  {
    name: "Mike R.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    quote: "Amazing results! The professional package transformed my dating profile completely.",
    rating: 5,
  },
  {
    name: "David L.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    quote: "Worth every penny. The enhanced photos looked so natural, nobody could tell they were AI-optimized.",
    rating: 5,
  },
];

interface PaymentFormProps {
  selectedPackage: Package;
  onPaymentSuccess: () => void;
}

function PaymentForm({ selectedPackage, onPaymentSuccess }: PaymentFormProps) {
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
          <span className="text-sm font-medium">2,847 customers served</span>
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
    <div className="hidden xl:block space-y-6 sticky top-8">
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


      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Order Details - Left Column */}
          <div className="xl:col-span-1 space-y-6">
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
          <div className="xl:col-span-2">
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
                />
              </CardContent>
            </Card>
          </div>

          {/* Testimonials - Right Column */}
          <div className="xl:col-span-1 space-y-6">
            <TestimonialSidebar />
          </div>
        </div>
      </div>

      {/* Mobile Fixed Payment Button */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md border-t border-white/10 p-4 z-50">
        <Button
          onClick={() => setShowMobilePayment(true)}
          className="w-full bg-[#d4ae36] hover:bg-[#c19d2f] text-black font-semibold py-4 text-lg rounded-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#d4ae36]/30"
        >
          <Lock className="w-4 h-4 mr-2" />
          Pay ${selectedPackage.price} Now
        </Button>
      </div>

      {/* Mobile Payment Modal */}
      {showMobilePayment && (
        <div className="xl:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-t-xl p-6 max-h-[80vh] overflow-y-auto">
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
            />
          </div>
        </div>
      )}

      {/* Mobile Padding for Fixed Button */}
      <div className="xl:hidden h-20" />
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