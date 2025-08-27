"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2, CreditCard } from "lucide-react";

interface PaymentStatus {
    paymentId: string;
    status: string;
    timestamp: string;
    verified: boolean;
    packageId?: string;
    amount?: number;
}

function PaymentVerificationContent() {
    const searchParams = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const paymentId = searchParams.get('paymentId');
    const packageId = searchParams.get('package');
    const amount = searchParams.get('amount');

    const verifyPayment = async () => {
        if (!paymentId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentId,
                    packageId,
                    amount: amount ? parseFloat(amount) : undefined
                }),
            });

            const data = await response.json();

            if (data.success) {
                setPaymentStatus(data.payment);
            } else {
                setError(data.error || 'Payment verification failed');
            }
        } catch (err) {
            setError('Failed to verify payment');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (paymentId) {
            verifyPayment();
        }
    }, [paymentId]);

    if (!paymentId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center">Payment Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-muted-foreground">
                            No payment ID provided. Please complete a payment first.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center flex items-center justify-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Payment Verification
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin mr-2" />
                            <span>Verifying payment...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center space-y-4">
                            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                            <p className="text-red-600">{error}</p>
                            <Button onClick={verifyPayment} variant="outline">
                                Try Again
                            </Button>
                        </div>
                    ) : paymentStatus ? (
                        <div className="space-y-4">
                            <div className="text-center">
                                {paymentStatus.verified ? (
                                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                                ) : (
                                    <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">Payment ID:</span>
                                    <span className="text-sm text-muted-foreground">{paymentStatus.paymentId}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">Status:</span>
                                    <Badge variant={paymentStatus.status === "COMPLETED" ? "default" : "destructive"}>
                                        {paymentStatus.status}
                                    </Badge>
                                </div>

                                {paymentStatus.packageId && (
                                    <div className="flex justify-between">
                                        <span className="font-medium">Package:</span>
                                        <span className="text-sm text-muted-foreground">{paymentStatus.packageId}</span>
                                    </div>
                                )}

                                {paymentStatus.amount && (
                                    <div className="flex justify-between">
                                        <span className="font-medium">Amount:</span>
                                        <span className="text-sm text-muted-foreground">${paymentStatus.amount}</span>
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <span className="font-medium">Timestamp:</span>
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(paymentStatus.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    onClick={() => window.location.href = '/checkout'}
                                    className="w-full"
                                >
                                    Make Another Payment
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-muted-foreground">No payment data available</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default function PaymentVerificationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center">Payment Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin mr-2" />
                            <span>Loading...</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        }>
            <PaymentVerificationContent />
        </Suspense>
    );
}
