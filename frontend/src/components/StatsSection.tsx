"use client";

import React from 'react';
import { TrendingUp, Clock, Target, AlertTriangle } from 'lucide-react';

export const StatsSection: React.FC = () => {

    const insights = [
        {
            icon: <TrendingUp className="w-6 h-6" />,
            stat: "85%",
            highlight: "of women swipe right on just 5% of men",
            context: "Most profiles never get noticed - the odds are stacked against you."
        },
        {
            icon: <Clock className="w-6 h-6" />,
            stat: "3s",
            highlight: "is all you get",
            context: "Women decide in seconds. Your photos and bio either win… or you're skipped."
        },
        {
            icon: <AlertTriangle className="w-6 h-6" />,
            stat: "78%",
            highlight: "get rejected on their first photo alone",
            context: "One weak selfie/photo can end your chances before they begin."
        },
        {
            icon: <Target className="w-6 h-6" />,
            stat: "10x",
            highlight: "more matches with optimized profiles",
            context: "The difference between normal pics and pro-level photos is massive."
        }
    ];

    return (
        <section className="py-24 px-4 max-w-6xl mx-auto">
            {/* Main Container with Glass Morphism */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                        The Harsh Truth of Modern Dating Apps
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        Real data shows why most men struggle to get matches - and why a few stand out.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {insights.map((insight, index) => (
                        <div key={index} className="group">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/8 hover:border-[#d4ae36]/30 transition-all duration-300 hover:scale-105 h-full flex flex-col">
                                {/* Icon */}
                                <div className="w-10 h-10 bg-[#d4ae36] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <div className="text-black">
                                        {insight.icon}
                                    </div>
                                </div>

                                {/* Stat Number */}
                                <div className="text-3xl md:text-4xl font-black text-[#d4ae36] mb-3">
                                    {insight.stat}
                                </div>

                                {/* Highlight */}
                                <h3 className="text-sm md:text-base font-semibold text-white mb-3 leading-tight">
                                    {insight.highlight}
                                </h3>

                                {/* Context */}
                                <p className="text-xs md:text-sm text-white/70 leading-relaxed flex-grow">
                                    {insight.context}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Reality Section */}
                <div className="text-center">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#d4ae36] mb-4">
                            Here's the Reality
                        </h3>
                        <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto">
                            On dating apps, your photos and profile aren't just details - they're your first impression, your status signal, and your competitive edge.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
