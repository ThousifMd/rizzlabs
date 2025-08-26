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
    price: 39,
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
    price: 69,
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
    price: 99,
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
    price: 199,
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
    name: "Sarah M.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    quote: "Got 10x more matches in the first week! The AI enhancement made my photos look naturally perfect.",
    rating: 5,
  },
  {
    name: "Mike R.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    quote: "Amazing results! The professional package transformed my dating profile completely.",
    rating: 5,
  },
  {
    name: "Jessica L.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground mb-2">
            Card Number
          </label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-foreground mb-2">
              Expiry Date
            </label>
            <Input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              maxLength={5}
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-foreground mb-2">
              CVV
            </label>
            <Input
              id="cvv"
              type="text"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              maxLength={4}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-foreground mb-2">
            ZIP Code
          </label>
          <Input
            id="zipCode"
            type="text"
            placeholder="12345"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
            maxLength={10}
            required
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 text-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Pay ${selectedPackage.price} Now
          </>
        )}
      </Button>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full py-3 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          disabled={isLoading}
        >
          <div className="flex items-center justify-center">
            <span className="font-bold text-blue-800 mr-2">Pay</span>
            <span className="font-bold text-blue-600">Pal</span>
          </div>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full py-3 text-lg border-2 border-black text-black hover:bg-gray-50"
          disabled={isLoading}
        >
          <div className="flex items-center justify-center">
            <span className="mr-2">🍎</span>
            Pay with Apple Pay
          </div>
        </Button>
      </div>
    </form>
  );
}

function TrustBadges() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <RotateCcw className="w-4 h-4 text-emerald-600" />
          <span>Money Back Guarantee</span>
        </div>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 text-emerald-600">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">2,847 customers served</span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Secure Payment
        </Badge>
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
          <Lock className="w-3 h-3 mr-1" />
          256-bit SSL
        </Badge>
      </div>
    </div>
  );
}

function TestimonialSidebar() {
  return (
    <div className="hidden xl:block w-80 space-y-6 sticky top-8">
      <h3 className="font-heading text-lg font-semibold text-foreground">
        What Our Customers Say
      </h3>

      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start space-x-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{testimonial.quote}</p>
                <p className="text-xs font-medium text-foreground">{testimonial.name}</p>
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

      // Get stored photos from sessionStorage
      const storedPhotos = sessionStorage.getItem('onboardingPhotos');
      const storedScreenshots = sessionStorage.getItem('onboardingScreenshots');

      if (storedPhotos) {
        const photoDataUrls = JSON.parse(storedPhotos);
        dataToSend.originalPhotos = JSON.stringify(photoDataUrls);
      } else {
        dataToSend.originalPhotos = JSON.stringify([]);
      }

      if (storedScreenshots) {
        const screenshotDataUrls = JSON.parse(storedScreenshots);
        dataToSend.screenshotPhotos = JSON.stringify(screenshotDataUrls);
      } else {
        dataToSend.screenshotPhotos = JSON.stringify([]);
      }

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
        sessionStorage.removeItem('onboardingPhotos');
        sessionStorage.removeItem('onboardingScreenshots');

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
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const savings = selectedPackage.originalPrice - selectedPackage.price;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Homepage
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Secure Checkout</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Order Details - Left Column */}
          <div className="xl:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Summary</span>
                  {selectedPackage.popular && (
                    <Badge className="bg-emerald-600">Most Popular</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedPackage.name}</h3>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      {selectedPackage.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Regular Price</span>
                    <span className="line-through text-muted-foreground">
                      ${selectedPackage.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Today's Price</span>
                    <span className="text-emerald-600 font-semibold">
                      ${selectedPackage.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-emerald-600">You Save</span>
                    <span className="text-emerald-600">${savings}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-emerald-600">${selectedPackage.price}</span>
                </div>
              </CardContent>
            </Card>

            {/* Trust Elements */}
            <Card>
              <CardContent className="pt-6">
                <TrustBadges />
              </CardContent>
            </Card>
          </div>

          {/* Payment Form - Center Column */}
          <div className="xl:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
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

          {/* Testimonials - Right Sidebar */}
          <div className="xl:col-span-1">
            <TestimonialSidebar />
          </div>
        </div>
      </div>

      {/* Mobile Fixed Payment Button */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
        <Button
          onClick={() => setShowMobilePayment(true)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 text-lg"
        >
          <Lock className="w-4 h-4 mr-2" />
          Pay ${selectedPackage.price} Now
        </Button>
      </div>

      {/* Mobile Payment Modal */}
      {showMobilePayment && (
        <div className="xl:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-background rounded-t-xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Complete Payment</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobilePayment(false)}
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
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}