"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CreditCard, CheckCircle, User, Mail } from "lucide-react";

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

export default function SimulatedPaymentButton({ selectedPackage, onPaymentSuccess, onPaymentError }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });
    const router = useRouter();

    const handleStartPayment = () => {
        setShowForm(true);
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.firstName || !formData.lastName || !formData.email) {
            if (onPaymentError) {
                onPaymentError("Please fill in all required fields.");
            }
            return;
        }

        setIsLoading(true);

        try {
            // Simulate payment processing
            console.log("Processing payment for:", formData.firstName, formData.lastName);
            console.log("Package:", selectedPackage.name, "Amount:", selectedPackage.price);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate payment ID
            const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            console.log("Payment successful:", paymentId);

            setIsSuccess(true);

            // Payment successful
            if (onPaymentSuccess) {
                onPaymentSuccess();
            }

            // Redirect to success page after a brief delay
            setTimeout(() => {
                router.push(`/onboarding/success?package=${selectedPackage.id}&paymentId=${paymentId}&amount=${selectedPackage.price}&name=${formData.firstName} ${formData.lastName}&email=${formData.email}`);
            }, 1000);

        } catch (error) {
            console.error("Payment error:", error);
            if (onPaymentError) {
                onPaymentError("Payment failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">Payment Successful!</span>
                </div>
            </div>
        );
    }

    if (showForm) {
        return (
            <form onSubmit={handlePayment} className="w-full space-y-4">
                <div className="space-y-3">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1">
                            First Name *
                        </label>
                        <Input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1">
                            Last Name *
                        </label>
                        <Input
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                            Email Address *
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                            Phone Number
                        </label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 text-lg"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing Payment...
                        </>
                    ) : (
                        <>
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pay ${selectedPackage.price} Now
                        </>
                    )}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="w-full"
                >
                    Back
                </Button>
            </form>
        );
    }

    return (
        <div className="w-full space-y-4">
            <Button
                onClick={handleStartPayment}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 text-lg"
            >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay ${selectedPackage.price} Now
            </Button>

            <div className="text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Secured Payment</span>
                </div>
            </div>
        </div>
    );
}
