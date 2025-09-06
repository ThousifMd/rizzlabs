"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MobileStickyCTAProps {
    href: string;
    customersCount: number;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({
    href,
    customersCount
}) => {
    return (
        <>
            {/* Mobile Sticky CTA - Only visible on mobile */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
                <div className="bg-gradient-to-r from-[#d4ae36] to-[#c19d2f] p-4 shadow-2xl border-t border-[#d4ae36]/20">
                    <a
                        href={href}
                        className="block w-full"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="text-black font-bold text-sm mb-1">
                                    Get My Photos Now →
                                </div>
                                <div className="text-black/80 text-xs">
                                    Join {customersCount.toLocaleString()} men who upgraded their profiles.
                                </div>
                            </div>
                            <div className="ml-3">
                                <ArrowRight className="w-5 h-5 text-black" />
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Spacer to prevent content from being hidden behind sticky CTA on mobile */}
            <div className="h-20 md:hidden"></div>
        </>
    );
};
