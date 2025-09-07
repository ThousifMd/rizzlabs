"use client";

export default function DatingPlatformsSectionV3() {
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
        <div className="py-16 bg-black/80 backdrop-blur-md border-y border-[#d4ae36]/20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 bg-[#d4ae36]/10 border border-[#d4ae36]/30 rounded-full px-6 py-2 mb-6">
                        <span className="text-[#d4ae36] text-sm font-medium">✓ VERIFIED</span>
                        <span className="text-white/70 text-sm">SUCCESSFULLY TESTED ON</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                        All Major Dating Platforms
                    </h3>
                </div>

                <div className="relative overflow-hidden">
                    {/* Scrolling marquee */}
                    <div className="flex animate-scroll space-x-16 items-center">
                        {/* First set */}
                        {platforms.map((platform, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex-shrink-0 flex items-center space-x-4 group"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-[#d4ae36]/20 to-[#c19d2f]/20 rounded-full flex items-center justify-center border border-[#d4ae36]/30 group-hover:border-[#d4ae36] transition-all duration-300">
                                    <span className="text-xl">{platform.logo}</span>
                                </div>
                                <span className="text-white/80 text-lg font-medium whitespace-nowrap group-hover:text-[#d4ae36] transition-colors duration-300">
                                    {platform.name}
                                </span>
                            </div>
                        ))}

                        {/* Duplicate set for seamless scrolling */}
                        {platforms.map((platform, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex-shrink-0 flex items-center space-x-4 group"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-[#d4ae36]/20 to-[#c19d2f]/20 rounded-full flex items-center justify-center border border-[#d4ae36]/30 group-hover:border-[#d4ae36] transition-all duration-300">
                                    <span className="text-xl">{platform.logo}</span>
                                </div>
                                <span className="text-white/80 text-lg font-medium whitespace-nowrap group-hover:text-[#d4ae36] transition-colors duration-300">
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
