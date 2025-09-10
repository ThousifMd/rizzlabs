"use client";

export default function DatingPlatformsSectionColor2() {
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
        <div className="py-16 bg-black/50 backdrop-blur-sm border-y border-white/10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    {/* White to golden gradient */}
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-[#d4ae36] to-white bg-clip-text text-transparent mb-2 tracking-wider">
                        SUCCESSFULLY TESTED AND APPROVED ON
                    </h3>
                </div>

                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll space-x-12 items-center">
                        {platforms.map((platform, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex-shrink-0 flex items-center space-x-3 text-white/60 hover:text-white/80 transition-colors duration-300"
                            >
                                <span className="text-2xl">{platform.logo}</span>
                                <span className="text-lg font-medium whitespace-nowrap">
                                    {platform.name}
                                </span>
                            </div>
                        ))}

                        {platforms.map((platform, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex-shrink-0 flex items-center space-x-3 text-white/60 hover:text-white/80 transition-colors duration-300"
                            >
                                <span className="text-2xl">{platform.logo}</span>
                                <span className="text-lg font-medium whitespace-nowrap">
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
