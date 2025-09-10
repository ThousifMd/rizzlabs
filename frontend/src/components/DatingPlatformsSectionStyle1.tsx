"use client";

export default function DatingPlatformsSectionStyle1() {
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
        <div className="py-20 bg-gradient-to-br from-[#1a1a1a] via-black to-[#2a2a2a] relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4ae36]/10 via-transparent to-transparent animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block bg-gradient-to-r from-[#d4ae36] via-[#c19d2f] to-[#d4ae36] bg-[length:200%_100%] animate-gradient-x text-black px-8 py-3 rounded-full text-sm font-bold mb-6">
                        ✓ VERIFIED ON ALL PLATFORMS
                    </div>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-white via-[#d4ae36] to-white bg-clip-text text-transparent mb-4">
                        SUCCESSFULLY TESTED AND APPROVED ON
                    </h3>
                </div>

                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll space-x-16 items-center">
                        {platforms.map((platform, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex-shrink-0 flex items-center space-x-4 group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-[#d4ae36]/20 to-[#c19d2f]/20 rounded-2xl flex items-center justify-center border-2 border-[#d4ae36]/30 group-hover:border-[#d4ae36] group-hover:shadow-2xl group-hover:shadow-[#d4ae36]/30 transition-all duration-500 group-hover:scale-110">
                                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{platform.logo}</span>
                                </div>
                                <span className="text-white/80 text-xl font-semibold whitespace-nowrap group-hover:text-[#d4ae36] transition-colors duration-300">
                                    {platform.name}
                                </span>
                            </div>
                        ))}

                        {platforms.map((platform, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex-shrink-0 flex items-center space-x-4 group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-[#d4ae36]/20 to-[#c19d2f]/20 rounded-2xl flex items-center justify-center border-2 border-[#d4ae36]/30 group-hover:border-[#d4ae36] group-hover:shadow-2xl group-hover:shadow-[#d4ae36]/30 transition-all duration-500 group-hover:scale-110">
                                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{platform.logo}</span>
                                </div>
                                <span className="text-white/80 text-xl font-semibold whitespace-nowrap group-hover:text-[#d4ae36] transition-colors duration-300">
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
