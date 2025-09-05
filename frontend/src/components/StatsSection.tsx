"use client";

import React from 'react';

export const StatsSection: React.FC = () => {

    const stats = [
        {
            number: "85%",
            label: "of women swipe on just 5% of men",
            description: "Tinder study shows extreme inequality in match distribution"
        },
        {
            number: "3s",
            label: "average time spent on a profile",
            description: "First impression is everything - your photos decide your fate"
        },
        {
            number: "10x",
            label: "more matches with optimized photos",
            description: "Professional photos vs. selfies - the difference is staggering"
        },
        {
            number: "78%",
            label: "get rejected on first photo alone",
            description: "Your main photo makes or breaks your dating success"
        }
    ];

    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                    The Science of Swiping
                </h2>
                <p className="text-xl text-white max-w-3xl mx-auto">
                    Real data reveals why your profile photos matter more than you think
                </p>
            </div>

            {/* Stats in a Single Row */}
            <div className="flex flex-col lg:flex-row gap-8 mb-16">
                {stats.map((stat, index) => (
                    <div key={index} className="flex-1 text-center">
                        {/* Number */}
                        <div className="text-5xl md:text-6xl font-black text-[#d4ae36] mb-3">
                            {stat.number}
                        </div>

                        {/* Label */}
                        <h3 className="text-lg font-semibold text-white mb-2">
                            {stat.label}
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 text-sm leading-relaxed">
                            {stat.description}
                        </p>

                        {/* Divider line (except for last item) */}
                        {index < stats.length - 1 && (
                            <div className="hidden lg:block absolute top-1/2 right-0 w-px h-16 bg-[#d4ae36]/30 transform -translate-y-1/2"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom Insight */}
            <div className="text-center">
                <div className="inline-block bg-[#d4ae36] text-black px-8 py-3 rounded-full font-bold text-lg mb-6">
                    HERE'S THE REALITY
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Your photos decide your dating fate
                </h3>
                <div className="max-w-4xl mx-auto">
                    <p className="text-xl text-white/90 mb-4">
                        In a world where <span className="text-[#d4ae36] font-bold">85% of women swipe on just 5% of men</span>,
                        your photos aren't just pictures—they're your competitive advantage.
                    </p>
                    <p className="text-lg text-white/80">
                        Professional photos are the difference between being invisible and being irresistible.
                    </p>
                </div>
            </div>
        </section>
    );
};
