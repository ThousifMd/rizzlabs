"use client";

export default function DatingPlatformsSectionStyle3() {
    const platforms = [
        { name: "Tinder", logo: "🔥" },
        { name: "Bumble", logo: "🐝" },
        { name: "Hinge", logo: "💕" },
        { name: "OkCupid", logo: "💘" },
        { name: "Coffee Meets Bagel", logo: "☕" },
        { name: "Happn", logo: "📍" },
        { name: "Match", logo: "💍" },
        { name: "eHarmony", logo: "💝" },
    ];

    return (
        <div className="py-20 bg-gradient-to-r from-[#0a0a0a] via-black to-[#0a0a0a] relative">
            {/* Neon glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4ae36]/5 via-transparent to-[#d4ae36]/5"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4ae36] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4ae36] to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-black/50 border border-[#d4ae36]/30 rounded-full px-6 py-2 mb-6">
                        <div className="w-2 h-2 bg-[#d4ae36] rounded-full animate-pulse"></div>
                        <span className="text-[#d4ae36] text-sm font-medium">LIVE</span>
                        <span className="text-white/70 text-sm">SUCCESSFULLY TESTED AND APPROVED ON</span>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll space-x-24 items-center">
                        {platforms.map((platform, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex-shrink-0 flex items-center space-x-4 group"
                            >
                                <div className="relative">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#d4ae36]/20 to-[#c19d2f]/20 rounded-xl flex items-center justify-center border border-[#d4ae36]/40 group-hover:border-[#d4ae36] group-hover:shadow-lg group-hover:shadow-[#d4ae36]/30 transition-all duration-300">
                                        <span className="text-xl group-hover:scale-110 transition-transform duration-300">{platform.logo}</span>
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#d4ae36]/20 to-[#c19d2f]/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <span className="text-white/70 text-base font-semibold whitespace-nowrap group-hover:text-[#d4ae36] transition-colors duration-300">
                                    {platform.name}
                                </span>
                            </div>
                        ))}

                        {platforms.map((platform, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex-shrink-0 flex items-center space-x-4 group"
                            >
                                <div className="relative">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#d4ae36]/20 to-[#c19d2f]/20 rounded-xl flex items-center justify-center border border-[#d4ae36]/40 group-hover:border-[#d4ae36] group-hover:shadow-lg group-hover:shadow-[#d4ae36]/30 transition-all duration-300">
                                        <span className="text-xl group-hover:scale-110 transition-transform duration-300">{platform.logo}</span>
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#d4ae36]/20 to-[#c19d2f]/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <span className="text-white/70 text-base font-semibold whitespace-nowrap group-hover:text-[#d4ae36] transition-colors duration-300">
                                    {platform.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
