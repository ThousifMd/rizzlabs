"use client";

import React, { useState } from 'react';

interface DatingAppCardProps {
    appName: string;
    beforeImage: string;
    afterImage: string;
    upgradedImage: string;
    name: string;
    age: number;
    distance: string;
    beforeBio: string;
    afterBio: string;
    appStyle: 'tinder' | 'bumble' | 'hinge';
}

const DatingAppCard: React.FC<DatingAppCardProps> = ({
    appName,
    beforeImage,
    afterImage,
    upgradedImage,
    name,
    age,
    distance,
    beforeBio,
    afterBio,
    appStyle
}) => {
    const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');

    const getCurrentImage = () => {
        switch (activeTab) {
            case 'before': return beforeImage;
            case 'after': return afterImage;
            default: return afterImage;
        }
    };

    const getCurrentBio = () => {
        switch (activeTab) {
            case 'before': return beforeBio;
            case 'after': return afterBio;
            default: return afterBio;
        }
    };

    return (
        <div className="flex flex-col items-center">
            {/* App Label */}
            <div className="mb-4">
                <span className="text-white/60 text-sm font-medium">{appName}</span>
            </div>

            {/* Mobile Phone Frame */}
            <div className="relative w-80 h-[600px] bg-black rounded-[2.5rem] p-1 shadow-2xl border border-gray-300/20">
                {/* Phone Screen */}
                <div className="bg-white rounded-[2rem] h-full overflow-hidden relative">
                    {/* Top Toggle Bar */}
                    <div className="absolute top-4 left-4 right-4 z-20">
                        <div className="bg-white rounded-full p-1 shadow-lg flex">
                            <button
                                onClick={() => setActiveTab('before')}
                                className={`flex-1 py-2 px-3 text-xs font-medium rounded-full transition-all ${activeTab === 'before'
                                    ? 'bg-gray-600 text-white'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Before
                            </button>
                            <button
                                onClick={() => setActiveTab('after')}
                                className={`flex-1 py-2 px-3 text-xs font-medium rounded-full transition-all ${activeTab === 'after'
                                    ? 'bg-gray-600 text-white'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                After
                            </button>
                        </div>
                    </div>

                    {/* Profile Image Area - Full Bleed */}
                    <div className="relative h-full">
                        <img
                            src={getCurrentImage()}
                            alt={`${appName} profile`}
                            className="w-full h-full object-cover"
                        />

                        {/* Glassmorphic Info Card - True Semi Circle */}
                        <div className="absolute bottom-0 left-0 right-0">
                            <div className="bg-black/60 backdrop-blur-md rounded-t-[3rem] p-4 pb-6 shadow-lg">
                                {/* Profile Info */}
                                <div className="mb-3">
                                    <h4 className="text-white font-semibold text-base">
                                        {name}, {age}
                                    </h4>
                                    <p className="text-white/80 text-xs mb-1">{distance}</p>
                                    <p className="text-white/90 text-xs leading-relaxed line-clamp-2">
                                        {getCurrentBio()}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-center gap-3">
                                    {/* Reject Button */}
                                    <button className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-all">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {/* Like Button */}
                                    <button className="w-10 h-10 bg-[#FFD447] rounded-full flex items-center justify-center hover:bg-[#FFE066] transition-all">
                                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {/* Info Button */}
                                    <button className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-all">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const DatingAppContext: React.FC = () => {
    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                    The Swipe Revolution
                </h2>
                <p className="text-xl text-white max-w-2xl mx-auto">
                    See how profiles transform inside <span className="text-[#d4ae36] font-semibold">Tinder/Bumble/Hinge-style cards</span> (names blurred).
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <DatingAppCard
                    appName="Tinder-style"
                    beforeImage="/images/3.1.png"
                    afterImage="/images/3.3.png"
                    upgradedImage="/images/3.3.png"
                    name="Alex"
                    age={29}
                    distance="3 mi"
                    beforeBio="Adventure seeker & coffee enthusiast. Love hiking, photography, and trying new restaurants. Let's explore the city together!"
                    afterBio="Traveled to 47 countries. Climbed Kilimanjaro last month. Still can't cook pasta without burning it 😅 Looking for my adventure partner"
                    appStyle="tinder"
                />

                <DatingAppCard
                    appName="Bumble-style"
                    beforeImage="/images/2.1.png"
                    afterImage="/images/2.2.png"
                    upgradedImage="/images/2.2.png"
                    name="Roman"
                    age={31}
                    distance="12 mi"
                    beforeBio="Software engineer who enjoys hiking and playing guitar. Family and friends mean everything to me."
                    afterBio="Scaled an app to 1M users by day, hiking California peaks by weekend. If I'm not coding, I'm playing John Mayer on guitar for my niece. Swipe if you want real adventures."
                    appStyle="bumble"
                />

                <DatingAppCard
                    appName="Hinge-style"
                    beforeImage="/images/4.1.png"
                    afterImage="/images/4.2.png"
                    upgradedImage="/images/4.3.png"
                    name="Noah"
                    age={27}
                    distance="1 mi"
                    beforeBio="Creative soul who loves music, art galleries, and weekend brunches. Always up for a spontaneous road trip or cozy night in."
                    afterBio="Published author & TEDx speaker. Still get nervous on first dates 😊 Looking for someone who loves deep conversations"
                    appStyle="hinge"
                />
            </div>
        </section>
    );
};