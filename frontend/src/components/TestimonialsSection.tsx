"use client";

import React from 'react';

export const TestimonialsSection: React.FC = () => {
    return (
        <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Jason's Testimonial */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#EDC967] to-[#F4D03F] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-black font-semibold text-sm">J</span>
                        </div>
                        <div>
                            <p className="text-white leading-relaxed mb-3 text-sm">
                                "I used to get 1-2 matches a week. With Matchlens, I had 30 in 3 days – photos + bio both felt professional."
                            </p>
                            <div className="text-gray-300">
                                <p className="font-medium text-sm">Jason, 28</p>
                                <p className="text-xs">NYC</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daniel's Testimonial */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#EDC967] to-[#F4D03F] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-black font-semibold text-sm">D</span>
                        </div>
                        <div>
                            <p className="text-white leading-relaxed mb-3 text-sm">
                                "They figured out my vibe was fitness + travel and built my profile around it. Women actually replied for the first time."
                            </p>
                            <div className="text-gray-300">
                                <p className="font-medium text-sm">Daniel, 31</p>
                                <p className="text-xs">LA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
