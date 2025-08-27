"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, CreditCard } from "lucide-react";

interface Package {
    id: string;
    name: string;
    originalPrice: number;
    price: number;
    features: string[];
    popular?: boolean;
}

interface Props {
    selectedPackage: Package;
    onPaymentSuccess?: () => void;
    onPaymentError?: (error: string) => void;
}

export default function CardPaymentForm({ selectedPackage, onPaymentSuccess, onPaymentError }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        zipCode: "",
        name: ""
    });
    const router = useRouter();

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
        if (!formData.email || !formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.zipCode || !formData.name) {
            if (onPaymentError) {
                onPaymentError("All fields are required");
            }
            return;
        }

        setIsLoading(true);

        try {
            console.log("Processing payment for package:", selectedPackage.name, "Amount:", selectedPackage.price);

            // Create PayPal order (without payment source - will use PayPal Checkout)
            const orderResponse = await fetch('/api/paypal/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: selectedPackage.price.toString(),
                    currency: 'USD',
                    reference_id: `order_${Date.now()}`,
                    packageId: selectedPackage.id,
                    packageName: selectedPackage.name,
                }),
            });

            const orderData = await orderResponse.json();

            if (!orderResponse.ok) {
                throw new Error(`Order creation failed: ${JSON.stringify(orderData)}`);
            }

            console.log("PayPal order created:", orderData.id);

            // For PayPal Checkout, we need to redirect to PayPal for payment
            // Then PayPal will redirect back to our success page
            if (orderData.links) {
                const approveLink = orderData.links.find((link: any) => link.rel === 'approve');
                if (approveLink) {
                    window.location.href = approveLink.href;
                    return;
                }
            }

            // Fallback: capture immediately if no redirect link
            const captureResponse = await fetch(`/api/paypal/capture/${orderData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const captureData = await captureResponse.json();

            if (!captureResponse.ok) {
                throw new Error(`Payment capture failed: ${JSON.stringify(captureData)}`);
            }

            console.log("Payment captured successfully:", captureData.id);

            // Payment successful
            if (onPaymentSuccess) {
                onPaymentSuccess();
            }

            // Redirect to success page with real PayPal data
            router.push(`/onboarding/success?package=${selectedPackage.id}&paymentId=${captureData.id}&amount=${selectedPackage.price}`);

        } catch (error) {
            console.error("Payment error:", error);
            let errorMsg = "Payment failed. Please try again.";

            if (error instanceof Error) {
                errorMsg = error.message;
            } else if (typeof error === 'object' && error !== null) {
                const paypalError = error as any;
                if (paypalError.details && paypalError.details[0]) {
                    errorMsg = paypalError.details[0].description || paypalError.message || errorMsg;
                } else if (paypalError.message) {
                    errorMsg = paypalError.message;
                }
            }

            if (onPaymentError) {
                onPaymentError(errorMsg);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                </label>
                <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
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
                        value={formData.expiryDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: formatExpiryDate(e.target.value) }))}
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
                        value={formData.cvv}
                        onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
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
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value.replace(/\D/g, '') }))}
                    maxLength={10}
                    required
                />
            </div>

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

            <div className="text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Secured by PayPal</span>
                </div>
            </div>
        </form>
    );
}
