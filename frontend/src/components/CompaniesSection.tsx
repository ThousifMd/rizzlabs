"use client";

export default function CompaniesSection() {
    const companies = [
        {
            name: "NEW YORK POST",
            logo: (
                <span className="text-white font-bold text-lg italic tracking-wide">
                    NEW YORK POST
                </span>
            )
        },
        {
            name: "Financial Times",
            logo: (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-200 rounded flex items-center justify-center">
                        <span className="text-amber-800 font-bold text-sm">FT</span>
                    </div>
                    <span className="text-amber-200 text-xs">FINANCIAL TIMES</span>
                </div>
            )
        },
        {
            name: "Stripe",
            logo: (
                <span className="text-blue-500 font-bold text-lg">
                    stripe
                </span>
            )
        },
        {
            name: "CNET",
            logo: (
                <span className="text-white font-medium text-lg">
                    c|net
                </span>
            )
        },
        {
            name: "Andreessen Horowitz",
            logo: (
                <div className="text-gray-400 text-sm leading-tight">
                    <div>andreesen.</div>
                    <div>horowitz</div>
                </div>
            )
        },
        {
            name: "HubSpot",
            logo: (
                <span className="text-blue-600 font-bold text-lg">
                    Hub<span className="text-orange-500">Spot</span>
                </span>
            )
        },
        {
            name: "Realtor.com",
            logo: (
                <span className="text-gray-600 text-lg">
                    <span className="text-red-500">realtor</span>.com
                </span>
            )
        },
        {
            name: "Fashionista",
            logo: (
                <span className="text-gray-400 font-bold text-lg tracking-wider">
                    FASHIONISTA
                </span>
            )
        },
        {
            name: "Amazon",
            logo: (
                <span className="text-white font-bold text-lg">
                    amazon®
                </span>
            )
        },
        {
            name: "LinkedIn",
            logo: (
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                    <span className="text-black font-bold text-sm">in</span>
                </div>
            )
        },
        {
            name: "Meta",
            logo: (
                <div className="flex flex-col items-center">
                    <div className="w-6 h-6 mb-1">
                        <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                        </svg>
                    </div>
                    <span className="text-white font-bold text-sm">Meta</span>
                </div>
            )
        },
        {
            name: "Microsoft",
            logo: (
                <div className="flex flex-col items-center">
                    <div className="w-6 h-6 mb-1 grid grid-cols-2 gap-0.5">
                        <div className="bg-white"></div>
                        <div className="bg-white"></div>
                        <div className="bg-white"></div>
                        <div className="bg-white"></div>
                    </div>
                    <span className="text-white font-bold text-sm">Microsoft</span>
                </div>
            )
        },
        {
            name: "Google",
            logo: (
                <span className="text-white font-bold text-2xl">
                    G
                </span>
            )
        },
        {
            name: "Apple",
            logo: (
                <span className="text-white font-bold text-lg">
                    Apple
                </span>
            )
        },
        {
            name: "Netflix",
            logo: (
                <span className="text-red-500 font-bold text-lg">
                    Netflix
                </span>
            )
        },
        {
            name: "Uber",
            logo: (
                <span className="text-white font-bold text-lg">
                    Uber
                </span>
            )
        },
        {
            name: "Tesla",
            logo: (
                <span className="text-white font-bold text-lg">
                    Tesla
                </span>
            )
        },
        {
            name: "Spotify",
            logo: (
                <span className="text-green-500 font-bold text-lg">
                    Spotify
                </span>
            )
        },
        {
            name: "Notion",
            logo: (
                <span className="text-white font-bold text-lg">
                    Notion
                </span>
            )
        },
        {
            name: "Figma",
            logo: (
                <span className="text-white font-bold text-lg">
                    Figma
                </span>
            )
        },
    ];

    return (
        <div className="py-16 bg-black/30 backdrop-blur-sm border-y border-white/10">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-center text-2xl font-bold text-white mb-8 tracking-wider">
                    OUR CUSTOMERS WORK HERE
                </h3>

                <div className="relative overflow-hidden">
                    {/* Scrolling container */}
                    <div className="flex animate-scroll space-x-16 items-center">
                        {/* First set of companies */}
                        {companies.map((company, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity duration-300"
                            >
                                {company.logo}
                            </div>
                        ))}

                        {/* Second set for seamless scrolling */}
                        {companies.map((company, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity duration-300"
                            >
                                {company.logo}
                            </div>
                        ))}

                        {/* Third set for extra smoothness */}
                        {companies.map((company, index) => (
                            <div
                                key={`third-${index}`}
                                className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity duration-300"
                            >
                                {company.logo}
                            </div>
                        ))}

                        {/* Fourth set for perfect seamless loop */}
                        {companies.map((company, index) => (
                            <div
                                key={`fourth-${index}`}
                                className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity duration-300"
                            >
                                {company.logo}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
