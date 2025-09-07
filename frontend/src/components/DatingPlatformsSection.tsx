"use client";

export default function DatingPlatformsSection() {
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
                <h3 className="text-center text-2xl font-bold text-white mb-8 tracking-wider">
                    SUCCESSFULLY TESTED AND APPROVED ON
                </h3>

                <div className="relative overflow-hidden">
                    {/* Scrolling container */}
                    <div className="flex animate-scroll space-x-12 items-center">
                        {/* First set of logos */}
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

                        {/* Duplicate set for seamless scrolling */}
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
