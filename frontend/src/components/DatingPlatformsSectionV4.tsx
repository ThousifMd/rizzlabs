"use client";

export default function DatingPlatformsSectionV4() {
    const platforms = [
        { name: "Tinder", logo: "🔥", users: "75M+" },
        { name: "Bumble", logo: "🐝", users: "50M+" },
        { name: "Hinge", logo: "💕", users: "20M+" },
        { name: "OkCupid", logo: "💘", users: "30M+" },
        { name: "Coffee Meets Bagel", logo: "☕", users: "10M+" },
        { name: "Happn", logo: "📍", users: "15M+" },
        { name: "Match", logo: "💍", users: "25M+" },
        { name: "eHarmony", logo: "💝", users: "10M+" },
    ];

    return (
        <div className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#d4ae36]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#d4ae36]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block bg-gradient-to-r from-[#d4ae36] to-[#c19d2f] text-black px-6 py-2 rounded-full text-sm font-bold mb-6">
                        TRUSTED BY MILLIONS
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-6">
                        Works on Every Dating Platform
                    </h3>
                    <p className="text-white/70 text-xl max-w-3xl mx-auto">
                        Our AI technology has been tested and optimized for all major dating apps worldwide
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {platforms.map((platform, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-[#d4ae36]/50 transition-all duration-500 hover:scale-110 hover:rotate-1"
                        >
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#d4ae36]/20 to-[#c19d2f]/20 rounded-full flex items-center justify-center border border-[#d4ae36]/30 group-hover:border-[#d4ae36] group-hover:shadow-lg group-hover:shadow-[#d4ae36]/20 transition-all duration-300">
                                    <span className="text-lg">{platform.logo}</span>
                                </div>
                                <h4 className="text-white font-semibold text-xs mb-1 group-hover:text-[#d4ae36] transition-colors duration-300">
                                    {platform.name}
                                </h4>
                                <p className="text-white/50 text-xs group-hover:text-white/70 transition-colors duration-300">
                                    {platform.users}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-white/60 text-sm">
                        * Compatible with all major dating platforms and their latest updates
                    </p>
                </div>
            </div>
        </div>
    );
}
