"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "Is this private?",
        answer: "Yes, absolutely. We keep all your photos and information completely private and secure. No public sharing or social media posting."
    },
    {
        question: "What if I don't see results?",
        answer: "We guarantee 3x more matches or we'll re-edit your photos and profile until you do. If you're still not satisfied, we offer a full refund."
    },
    {
        question: "Which apps does this work for?",
        answer: "Our optimized photos and profiles work on all major dating apps including Tinder, Bumble, Hinge, Coffee Meets Bagel, and more."
    }
];

export const FAQSection: React.FC = () => {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenItems(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    return (
        <section className="py-16 px-4 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <HelpCircle className="w-8 h-8 text-[#EDC967]" />
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
                        FAQ
                    </h2>
                </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-1">
                {faqData.map((item, index) => (
                    <div key={index} className="border-b border-[#EDC967]/20 last:border-b-0">
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full text-left flex items-center justify-between py-6 group focus:outline-none"
                        >
                            <div className="flex items-center gap-6 w-full">
                                {/* Question number */}
                                <div className="w-6 h-6 bg-gradient-to-br from-[#EDC967] to-[#F4D03F] rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-black font-bold text-xs">{index + 1}</span>
                                </div>

                                {/* Question text */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-white group-hover:text-[#EDC967] transition-colors duration-300">
                                        {item.question}
                                    </h3>
                                </div>

                                {/* Chevron */}
                                <ChevronDown
                                    className={`w-5 h-5 text-[#EDC967] transition-all duration-300 ${openItems.includes(index) ? 'rotate-180' : ''
                                        }`}
                                />
                            </div>
                        </button>

                        {/* Answer content */}
                        {openItems.includes(index) && (
                            <div className="pb-6 animate-in slide-in-from-top-2 duration-500">
                                <div className="ml-10">
                                    <p className="text-white leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-2xl hover:bg-white/8 hover:border-white/20 transition-all duration-300 ease-out">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <MessageCircle className="w-6 h-6 text-[#d4ae36]" />
                        <h3 className="text-xl font-semibold text-white">
                            Still have questions?
                        </h3>
                    </div>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        Our support team is here to help you get the most out of your photos.
                    </p>
                    <button className="px-5 py-2 bg-gradient-to-r from-[#d4ae36] to-[#c19d2f] hover:from-[#c19d2f] hover:to-[#b8941f] text-black rounded-full font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#d4ae36]/30 border border-[#d4ae36]/20 backdrop-blur-sm">
                        Contact Support
                    </button>
                </div>
            </div>
        </section>
    );
};