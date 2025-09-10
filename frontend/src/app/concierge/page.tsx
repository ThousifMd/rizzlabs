"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    Clock,
    MessageCircle,
    Home,
} from "lucide-react";
import Link from "next/link";

export default function ConciergePage() {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [countdown, setCountdown] = useState(24 * 60 * 60); // 24 hours in seconds
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(true);

    useEffect(() => {
        // Trigger animation after component mounts
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Auto-hide payment success notification after 4 seconds
    useEffect(() => {
        if (showPaymentSuccess) {
            const timer = setTimeout(() => {
                setShowPaymentSuccess(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [showPaymentSuccess]);

    // Countdown timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [countdown]);

    // Format countdown time
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Glass morphism background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0E0E0F] to-black"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4ae36]/5 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#d4ae36]/3 via-transparent to-transparent"></div>

            {/* Payment Success Line Animation */}
            {showPaymentSuccess && (
                <div className="fixed top-0 left-0 right-0 z-50 h-1 overflow-hidden">
                    <div className="h-full animate-line-progress-fast bg-gradient-to-r from-green-400 to-green-500"></div>
                </div>
            )}

            {/* Payment Success Text */}
            {showPaymentSuccess && (
                <div className="fixed top-3 right-3 md:top-2 md:right-4 z-50">
                    <div className="text-sm md:text-sm font-semibold animate-fade-in-out px-3 py-1 rounded-lg backdrop-blur-sm text-green-300 bg-green-500/10 border border-green-500/20">
                        Payment Success
                    </div>
                </div>
            )}

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'}`}>
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#d4ae36] via-white to-[#FD5E76] bg-clip-text text-transparent">
                            We will make you a super model
                        </h1>
                        <p className="text-lg text-gray-300 mb-6">
                            Your payment was successful! Our team is now working on your profile enhancement.
                        </p>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="text-center mb-8">
                    <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'}`}>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-md mx-auto shadow-2xl">
                            <div className="flex items-center justify-center gap-2 text-lg text-[#d4ae36] font-medium mb-4">
                                <Clock className="h-5 w-5" />
                                <span>Your Profile Will Be Ready In:</span>
                            </div>
                            <div className="text-5xl font-mono font-bold text-white">
                                {formatTime(countdown)}
                            </div>
                        </div>
                    </div>
                </div>



                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 bg-[#d4ae36] hover:bg-[#c19d2f] text-black font-semibold px-8 py-3"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10 px-8 py-3"
                    >
                        <MessageCircle className="h-4 w-4" />
                        Contact Support
                    </Button>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-8 text-sm text-gray-400">
                    <p>Questions? Our support team is available 24/7 to help you.</p>
                </div>
            </div>
        </div>
    );
}
