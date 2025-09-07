"use client";

export default function DatingPlatformsSectionV5() {
    const platforms = [
        { name: "Tinder", logo: "🔥", verified: true },
        { name: "Bumble", logo: "🐝", verified: true },
        { name: "Hinge", logo: "💕", verified: true },
        { name: "OkCupid", logo: "💘", verified: true },
        { name: "Coffee Meets Bagel", logo: "☕", verified: true },
        { name: "Happn", logo: "📍", verified: true },
        { name: "Match", logo: "💍", verified: true },
        { name: "eHarmony", logo: "💝", verified: true },
    ];

    return (
        <div className="py-16 bg-black/90 backdrop-blur-sm border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-white mb-2">
                        ✓ Successfully Tested & Approved On
                    </h3>
                    <p className="text-white/60 text-sm">
                        All major dating platforms worldwide
                    </p>
                </div>

                <div className="relative">
                    {/* Static grid layout */}
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                        {platforms.map((platform, index) => (
                            <div
                                key={index}
                                className="group flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-white/5 transition-all duration-300"
                            >
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-white/10 group-hover:border-[#d4ae36]/50 group-hover:shadow-lg group-hover:shadow-[#d4ae36]/20 transition-all duration-300">
                                        <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">
                                            {platform.logo}
                                        </span>
                                    </div>
                                    {platform.verified && (
                                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#d4ae36] rounded-full flex items-center justify-center">
                                            <span className="text-black text-xs font-bold">✓</span>
                                        </div>
                                    )}
                                </div>
                                <span className="text-white/70 text-xs font-medium text-center group-hover:text-[#d4ae36] transition-colors duration-300">
                                    {platform.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-8">
                    <div className="inline-flex items-center space-x-2 bg-[#d4ae36]/10 border border-[#d4ae36]/30 rounded-full px-4 py-2">
                        <span className="text-[#d4ae36] text-sm">🔒</span>
                        <span className="text-white/80 text-sm font-medium">100% Platform Compatible</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
