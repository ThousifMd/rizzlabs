"use client";

import { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

// Custom styles for PayPal buttons
const paypalStyles = `
  .paypal-button-container {
    width: 100% !important;
    max-width: 600px !important;
    margin: 0 auto !important;
  }
  
  .paypal-button-container > div {
    width: 100% !important;
    border-radius: 8px !important;
    overflow: hidden !important;
  }
  
  .paypal-button-container button {
    border-radius: 8px !important;
    margin: 0 !important;
  }
`;

interface SimplePayPalCheckoutProps {
    selectedPackage?: {
        id: string;
        name: string;
        price: number;
    };
}

export default function SimplePayPalCheckout({ selectedPackage }: SimplePayPalCheckoutProps) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    const storePaymentAndOnboarding = async (paymentDetails: any) => {
        try {
            // Hardcoded to $1.00 for testing
            const actualAmountPaid = "1.00";

            // STEP 1: Store payment data
            const paymentData = {
                orderId: paymentDetails.id,
                paymentId: paymentDetails.id,
                amount: parseFloat(actualAmountPaid), // Use the actual amount paid
                currency: 'USD',
                packageId: selectedPackage?.id,
                packageName: selectedPackage?.name || 'Payment',
                customerEmail: formData.email,
                customerName: `${formData.firstName} ${formData.lastName}`,
                status: 'completed',
                onboardingData: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    packageSelected: selectedPackage,
                    paymentDetails: {
                        orderId: paymentDetails.id,
                        paymentId: paymentDetails.id,
                        amount: parseFloat(actualAmountPaid),
                        currency: 'USD'
                    }
                }
            };

            console.log("Sending payment data to backend:", paymentData);

            const paymentResponse = await fetch('/api/payments/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData)
            });

            if (!paymentResponse.ok) {
                throw new Error(`Failed to store payment: ${paymentResponse.statusText}`);
            }

            const paymentResult = await paymentResponse.json();
            console.log("Payment stored successfully:", paymentResult);

            // STEP 2: Submit onboarding data to onboarding_submissions table
            try {
                // Get stored form data from localStorage
                const storedFormData = localStorage.getItem('onboardingFormData');

                if (storedFormData) {
                    const onboardingFormData = JSON.parse(storedFormData);

                    // Get stored photos from global variable
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

                    // Create onboarding submission data
                    const onboardingData = {
                        name: onboardingFormData.name || '',
                        gender: onboardingFormData.gender || 'not_specified',
                        age: onboardingFormData.age || 0,
                        datingGoal: onboardingFormData.datingGoal || '',
                        currentMatches: onboardingFormData.currentMatches || 0,
                        bodyType: onboardingFormData.bodyType || '',
                        stylePreference: onboardingFormData.stylePreference || '',
                        ethnicity: onboardingFormData.ethnicity || '',
                        interests: JSON.stringify(onboardingFormData.interests || []),
                        currentBio: onboardingFormData.currentBio || '',
                        email: onboardingFormData.email || '',
                        phone: onboardingFormData.phone || '',
                        weeklyTips: onboardingFormData.weeklyTips ? onboardingFormData.weeklyTips.toString() : 'false',
                        originalPhotos: JSON.stringify(photoDataUrls || []),
                        screenshotPhotos: JSON.stringify(screenshotDataUrls || [])
                    };

                    console.log("Submitting onboarding data:", onboardingData);

                    const onboardingResponse = await fetch('http://localhost:5001/api/onboarding/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(onboardingData)
                    });

                    const onboardingResult = await onboardingResponse.json();

                    if (onboardingResult.success) {
                        console.log("Onboarding data submitted successfully:", onboardingResult);

                        // Clear stored data
                        localStorage.removeItem('onboardingFormData');
                        if (typeof window !== 'undefined') {
                            delete (window as any).onboardingPhotos;
                            delete (window as any).onboardingScreenshots;
                        }
                    } else {
                        console.error('Onboarding submission failed:', onboardingResult.error);
                    }
                } else {
                    console.warn('No onboarding form data found in localStorage');
                }
            } catch (onboardingError) {
                console.error('Error submitting onboarding data:', onboardingError);
                // Don't fail the entire process if onboarding submission fails
            }

            alert("Payment successful! Your data has been saved to the database.");
        } catch (error) {
            console.error("Error storing payment:", error);
            alert("Payment successful but failed to save data. Please contact support.");
        }
    };



    const handleStartPayment = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form is ready, PayPal button will handle the payment
    };

    if (!showForm) {
        return (
            <div className="w-full max-w-md mx-auto p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-center text-white">Ready to Start?</h2>
                <p className="text-white/70 mb-6 text-center">
                    {selectedPackage ? `${selectedPackage.name}: $1.00 (Testing)` : 'Payment: $1.00 (Testing)'}
                </p>
                <button
                    onClick={handleStartPayment}
                    className="w-full bg-gradient-to-r from-[#d4ae36] to-[#c19d2f] hover:from-[#c19d2f] hover:to-[#b8941f] text-black py-3 px-4 rounded-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#d4ae36]/30"
                >
                    Start Payment Process
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-2 text-center text-white">Complete Your Order</h2>
            <p className="text-white/70 mb-6 text-center">
                {selectedPackage ? `${selectedPackage.name}: $1.00 (Testing)` : 'Payment: $1.00 (Testing)'}
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#d4ae36]/30 focus:border-[#d4ae36] focus:bg-white/10 transition-all duration-300"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#d4ae36]/30 focus:border-[#d4ae36] focus:bg-white/10 transition-all duration-300"
                        required
                    />
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                />

                <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                />
            </form>

            {/* PayPal Integration */}
            <div className="mt-6 p-8 bg-gradient-to-br from-[#d4ae36]/10 to-[#c19d2f]/10 border-2 border-[#d4ae36]/20 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-3 text-center">💳 Complete Payment</h3>
                <p className="text-white/70 mb-6 text-center text-sm">Secure payment powered by PayPal</p>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 shadow-sm">
                    <style dangerouslySetInnerHTML={{ __html: paypalStyles }} />
                    <div className="paypal-button-container">
                        <PayPalScriptProvider
                            options={{
                                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                                currency: "USD",
                                intent: "capture"
                            }}
                        >
                            <PayPalButtons
                                createOrder={async (data, actions) => {
                                    try {
                                        console.log('🔄 Creating PayPal order via server...');
                                        console.log('📦 Package data:', { selectedPackage, amount: "1.00" });

                                        const orderData = {
                                            amount: "1.00",
                                            description: selectedPackage?.name || "Test Payment",
                                            packageId: selectedPackage?.id,
                                            packageName: selectedPackage?.name
                                        };

                                        console.log('📡 Sending request to server:', orderData);

                                        const response = await fetch('/api/paypal/create-order', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(orderData)
                                        });

                                        console.log('📊 Response status:', response.status);
                                        console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));

                                        const responseText = await response.text();
                                        console.log('📄 Raw response body:', responseText);

                                        if (!response.ok) {
                                            throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
                                        }

                                        let result;
                                        try {
                                            result = JSON.parse(responseText);
                                        } catch (parseError) {
                                            console.error('❌ JSON parse error:', parseError);
                                            throw new Error(`Invalid JSON response: ${responseText}`);
                                        }

                                        console.log('📋 Parsed response:', result);

                                        if (!result.success) {
                                            throw new Error(result.message || 'Failed to create order');
                                        }

                                        if (!result.orderId) {
                                            console.error('❌ No orderId in response:', result);
                                            throw new Error('No order ID in response');
                                        }

                                        console.log('✅ Server-side order created:', result.orderId);
                                        return result.orderId;
                                    } catch (error) {
                                        console.error('❌ Error creating order:', error);
                                        throw error;
                                    }
                                }}
                                onApprove={async (data, actions) => {
                                    console.log("✅ Order approved:", data.orderID);
                                    console.log("🔄 Starting payment capture...");

                                    try {
                                        // Use PayPal's recommended approach
                                        if (actions.order) {
                                            const details = await actions.order.capture();
                                            console.log("✅ Payment captured successfully:", details);

                                            // Store payment details AND onboarding data in database
                                            await storePaymentAndOnboarding(details);

                                            alert("Payment successful! Order ID: " + details.id);
                                        } else {
                                            throw new Error("PayPal order actions not available");
                                        }
                                    } catch (error) {
                                        console.error("❌ Payment capture failed:", error);
                                        alert("Payment capture failed: " + (error instanceof Error ? error.message : "Unknown error"));
                                    }
                                }}
                                onError={(err) => {
                                    console.error("PayPal error:", err);
                                    alert("PayPal error: " + JSON.stringify(err));
                                }}
                                onCancel={(data) => {
                                    console.log("Payment cancelled:", data);
                                    alert("Payment was cancelled");
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}
