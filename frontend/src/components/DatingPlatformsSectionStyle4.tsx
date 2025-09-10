"use client";

export default function DatingPlatformsSectionStyle4() {
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
        <div className="py-16 bg-black relative overflow-hidden">
            {/* Geometric background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,_transparent_25%,_#d4ae36_25%,_#d4ae36_50%,_transparent_50%,_transparent_75%,_#d4ae36_75%)] bg-[length:20px_20px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-white mb-4 relative">
                        <span className="relative z-10">SUCCESSFULLY TESTED AND APPROVED ON</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#d4ae36]/20 via-[#d4ae36]/40 to-[#d4ae36]/20 blur-sm"></div>
                    </h3>
                    <div className="flex items-center justify-center space-x-4">
                        <div className="h-px bg-gradient-to-r from-transparent to-[#d4ae36] w-16"></div>
                        <div className="w-2 h-2 bg-[#d4ae36] rounded-full"></div>
                        <div className="h-px bg-gradient-to-l from-transparent to-[#d4ae36] w-16"></div>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll space-x-16 items-center">
                        {platforms.map((platform, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex-shrink-0 flex items-center space-x-3 group"
                            >
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 group-hover:bg-[#d4ae36]/20 group-hover:border-[#d4ae36] group-hover:rotate-12 transition-all duration-300">
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">{platform.logo}</span>
                                </div>
                                <span className="text-white/60 text-sm font-medium whitespace-nowrap group-hover:text-white transition-colors duration-300">
                                    {platform.name}
                                </span>
                            </div>
                        ))}

                        {platforms.map((platform, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex-shrink-0 flex items-center space-x-3 group"
                            >
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 group-hover:bg-[#d4ae36]/20 group-hover:border-[#d4ae36] group-hover:rotate-12 transition-all duration-300">
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">{platform.logo}</span>
                                </div>
                                <span className="text-white/60 text-sm font-medium whitespace-nowrap group-hover:text-white transition-colors duration-300">
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
