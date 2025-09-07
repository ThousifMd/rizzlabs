"use client";

export default function DatingPlatformsSectionV2() {
    const platforms = [
        { name: "Tinder", logo: "🔥", color: "from-red-500 to-pink-500" },
        { name: "Bumble", logo: "🐝", color: "from-yellow-400 to-orange-400" },
        { name: "Hinge", logo: "💕", color: "from-pink-500 to-rose-500" },
        { name: "OkCupid", logo: "💘", color: "from-blue-500 to-purple-500" },
        { name: "Coffee Meets Bagel", logo: "☕", color: "from-amber-600 to-orange-600" },
        { name: "Happn", logo: "📍", color: "from-green-500 to-teal-500" },
        { name: "Match", logo: "💍", color: "from-purple-500 to-indigo-500" },
        { name: "eHarmony", logo: "💝", color: "from-rose-500 to-pink-500" },
    ];

    return (
        <div className="py-20 bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#d4ae36_0%,_transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_#d4ae36_0%,_transparent_50%)]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Trusted by Users Across All Major Platforms
                    </h3>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Our AI-powered profile optimization works seamlessly on every dating app
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {platforms.map((platform, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                        >
                            <div className="text-center">
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                    {platform.logo}
                                </div>
                                <h4 className="text-white font-semibold text-sm group-hover:text-[#d4ae36] transition-colors duration-300">
                                    {platform.name}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
