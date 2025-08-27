"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

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

export default function SimplePayPalButton({ selectedPackage, onPaymentSuccess, onPaymentError }: Props) {
    const router = useRouter();

    return (
        <div className="w-full">
            <PayPalButtons
                style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: selectedPackage.name,
                                amount: {
                                    currency_code: "USD",
                                    value: selectedPackage.price.toString(),
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    if (!actions.order) {
                        console.error("PayPal actions.order is undefined");
                        return Promise.reject(new Error("PayPal order actions not available"));
                    }

                    return actions.order.capture().then((details) => {
                        console.log("Payment completed:", details);

                        // Payment successful
                        if (onPaymentSuccess) {
                            onPaymentSuccess();
                        }

                        // Redirect to success page
                        router.push(`/onboarding/success?package=${selectedPackage.id}&paymentId=${details.id}&amount=${selectedPackage.price}`);
                    });
                }}
                onError={(err) => {
                    console.error("PayPal error:", err);
                    if (onPaymentError) {
                        onPaymentError("PayPal payment failed. Please try again.");
                    }
                }}
            />
        </div>
    );
}
