"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
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

export default function RealPayPalCheckout({ selectedPackage, onPaymentSuccess, onPaymentError }: Props) {
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

    const createOrder = async (data: any, actions: any) => {
        try {
            console.log("Creating PayPal order for:", selectedPackage.name, "Amount:", selectedPackage.price);

            const response = await fetch('/api/paypal/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: selectedPackage.price,
                    currency: 'USD',
                    reference_id: `PKG_${selectedPackage.id}_${Date.now()}`,
                    packageId: selectedPackage.id,
                    packageName: selectedPackage.name,
                    customerInfo: formData
                }),
            });

            const orderData = await response.json();

            if (!response.ok) {
                throw new Error(orderData.error || 'Failed to create order');
            }

            console.log("PayPal order created:", orderData.orderId);
            return orderData.orderId;

        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    };

    const onApprove = async (data: any, actions: any) => {
        try {
            setIsLoading(true);
            console.log("Payment approved, capturing order:", data.orderID);

            const response = await fetch(`/api/paypal/capture/${data.orderID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const captureData = await response.json();

            if (!response.ok) {
                throw new Error(captureData.error || 'Payment capture failed');
            }

            console.log("Payment captured successfully:", captureData);
            setIsSuccess(true);

            if (onPaymentSuccess) {
                onPaymentSuccess();
            }

            // Redirect to success page
            setTimeout(() => {
                router.push(`/onboarding/success?package=${selectedPackage.id}&paymentId=${data.orderID}&amount=${selectedPackage.price}&name=${formData.firstName} ${formData.lastName}&email=${formData.email}`);
            }, 1000);

        } catch (error) {
            console.error("Payment capture error:", error);
            if (onPaymentError) {
                onPaymentError("Payment failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onError = (err: any) => {
        console.error("PayPal error:", err);
        if (onPaymentError) {
            onPaymentError("PayPal payment failed. Please try again.");
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
            <div className="w-full space-y-4">
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

                {formData.firstName && formData.lastName && formData.email ? (
                    <div className="space-y-4">
                        <div className="text-center text-sm text-muted-foreground">
                            <div className="flex items-center justify-center space-x-2">
                                <CreditCard className="w-4 h-4" />
                                <span>PayPal Secure Payment</span>
                            </div>
                        </div>

                        <PayPalScriptProvider
                            options={{
                                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                                currency: "USD",
                                intent: "capture"
                            }}
                        >
                            <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                                style={{ layout: "vertical" }}
                                disabled={isLoading}
                            />
                        </PayPalScriptProvider>
                    </div>
                ) : (
                    <div className="text-center text-sm text-muted-foreground">
                        Please fill in all required fields to proceed with payment
                    </div>
                )}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="w-full"
                >
                    Back
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            <Button
                onClick={handleStartPayment}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 text-lg"
            >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay ${selectedPackage.price} with PayPal
            </Button>

            <div className="text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Secure PayPal Payment</span>
                </div>
            </div>
        </div>
    );
}
