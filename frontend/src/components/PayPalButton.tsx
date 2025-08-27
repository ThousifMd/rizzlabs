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

export default function PayPalButton({ selectedPackage, onPaymentSuccess, onPaymentError }: Props) {
    const router = useRouter();

    return (
        <div className="w-full">
            <PayPalButtons
                style={{ layout: "vertical" }}
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
                                custom_id: selectedPackage.id,
                            },
                        ],
                        application_context: {
                            shipping_preference: "NO_SHIPPING",
                        },
                    });
                }}
                onApprove={async (data, actions) => {
                    try {
                        console.log("PayPal order approved:", data.orderID);
                        console.log("Order details:", data);

                        // Add a small delay to ensure order is ready
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        // Capture the payment
                        const captureResponse = await fetch(`/api/paypal/capture/${data.orderID}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });

                        console.log("Capture response status:", captureResponse.status);
                        console.log("Capture response headers:", Object.fromEntries(captureResponse.headers.entries()));

                        const captureData = await captureResponse.json();
                        console.log("Capture response data:", captureData);

                        if (!captureResponse.ok) {
                            console.error("Capture failed with status:", captureResponse.status);
                            console.error("Capture failed with data:", captureData);

                            let errorMessage = "Payment capture failed. ";
                            if (captureData.error) {
                                errorMessage += captureData.error.message || "Unknown error";
                            } else if (captureData.details && captureData.details[0]) {
                                errorMessage += captureData.details[0].description || "Unknown error";
                            } else {
                                errorMessage += "Please try again.";
                            }

                            throw new Error(errorMessage);
                        }

                        console.log("Payment captured successfully:", captureData.id);

                        // Payment successful
                        if (onPaymentSuccess) {
                            onPaymentSuccess();
                        }

                        // Redirect to success page
                        router.push(`/onboarding/success?package=${selectedPackage.id}&paymentId=${captureData.id}&amount=${selectedPackage.price}`);

                    } catch (error) {
                        console.error("Payment capture error:", error);
                        let errorMessage = "Payment failed. Please try again.";

                        if (error instanceof Error) {
                            if (error.message.includes("INSTRUMENT_DECLINED")) {
                                errorMessage = "Payment method was declined. Please try a different card or PayPal account.";
                            } else if (error.message.includes("UNPROCESSABLE_ENTITY")) {
                                errorMessage = "Payment could not be processed. Please check your payment method.";
                            } else if (error.message.includes("Payment capture failed")) {
                                errorMessage = error.message;
                            }
                        }

                        if (onPaymentError) {
                            onPaymentError(errorMessage);
                        }
                    }
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
