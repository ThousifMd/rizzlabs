"use client";

export default function DatingPlatformsSectionStyle2() {
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
        <div className="py-16 bg-black/95 backdrop-blur-xl border-y border-[#d4ae36]/20 relative">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4ae36' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-light text-white/90 mb-2 tracking-widest">
                        SUCCESSFULLY TESTED AND APPROVED ON
                    </h3>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4ae36] to-transparent mx-auto"></div>
                </div>

                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll space-x-20 items-center">
                        {platforms.map((platform, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex-shrink-0 flex items-center space-x-3 group"
                            >
                                <div className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 group-hover:bg-[#d4ae36]/10 group-hover:border-[#d4ae36]/50 transition-all duration-300">
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">{platform.logo}</span>
                                </div>
                                <span className="text-white/60 text-sm font-medium whitespace-nowrap group-hover:text-white/90 transition-colors duration-300">
                                    {platform.name}
                                </span>
                            </div>
                        ))}

                        {platforms.map((platform, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex-shrink-0 flex items-center space-x-3 group"
                            >
                                <div className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 group-hover:bg-[#d4ae36]/10 group-hover:border-[#d4ae36]/50 transition-all duration-300">
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">{platform.logo}</span>
                                </div>
                                <span className="text-white/60 text-sm font-medium whitespace-nowrap group-hover:text-white/90 transition-colors duration-300">
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
