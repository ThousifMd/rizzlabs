"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  age: number;
  beforeImage: string;
  afterImage: string;
  quote: string;
  matchesFrom: number;
  matchesTo: number;
  timeframe: string;
}

interface FloatingNotification {
  id: string;
  name: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jake',
    age: 28,
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    quote: "I couldn't believe the difference! My matches went from barely getting any responses to having genuine conversations every day. The photo upgrade was a game-changer.",
    matchesFrom: 3,
    matchesTo: 47,
    timeframe: 'one week'
  },
  {
    id: '2',
    name: 'Marcus',
    age: 32,
    beforeImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    quote: "The transformation was incredible. I went from swiping endlessly with no results to having quality matches who actually wanted to meet up. Worth every penny.",
    matchesFrom: 8,
    matchesTo: 73,
    timeframe: '10 days'
  },
  {
    id: '3',
    name: 'David',
    age: 26,
    beforeImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1556474835-b0f3ac40d4d1?w=150&h=150&fit=crop&crop=face',
    quote: "My dating life completely changed. The professional photos made such a difference - I started getting matches with women I never thought would be interested.",
    matchesFrom: 5,
    matchesTo: 62,
    timeframe: '2 weeks'
  }
];

const floatingNotifications: FloatingNotification[] = [
  { id: '1', name: 'Marcus', location: 'LA' },
  { id: '2', name: 'Jake', location: 'NYC' },
  { id: '3', name: 'David', location: 'Miami' },
  { id: '4', name: 'Alex', location: 'SF' },
  { id: '5', name: 'Ryan', location: 'Chicago' }
];

export const SocialProofSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Floating notification logic
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(true);
      setCurrentNotification(prev => (prev + 1) % floatingNotifications.length);
      
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll for mobile carousel
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Handle manual navigation
  const handlePrevSlide = () => {
    setIsAutoScrolling(false);
    setCurrentSlide(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const handleNextSlide = () => {
    setIsAutoScrolling(false);
    setCurrentSlide(prev => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const scrollToSlide = (index: number) => {
    setIsAutoScrolling(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F9FAFB] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
            Join 2,847+ Men Who've 
            <br className="hidden sm:block" />
            <span className="text-primary"> Upgraded Their Dating Game</span>
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden mb-16">
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide 
                      ? 'bg-primary w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* TrustPilot Widget Placeholder */}
        <TrustPilotWidget />
      </div>

      {/* Floating Notification */}
      <div className={`fixed top-4 right-4 md:top-6 md:right-6 z-50 transition-all duration-500 ${
        showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[280px] max-w-[320px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {floatingNotifications[currentNotification].name} from {floatingNotifications[currentNotification].location} just got his photos
                </p>
                <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [imageLoading, setImageLoading] = useState({ before: true, after: true });

  const handleImageLoad = (type: 'before' | 'after') => {
    setImageLoading(prev => ({ ...prev, [type]: false }));
  };

  return (
    <Card className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 rounded-2xl">
      {/* Before/After Photos */}
      <div className="flex justify-center space-x-4 mb-6">
        <div className="text-center">
          <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-2">
            {imageLoading.before && (
              <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse"></div>
            )}
            <img
              src={testimonial.beforeImage}
              alt={`${testimonial.name} before`}
              className={`w-full h-full object-cover rounded-full border-2 border-gray-300 transition-opacity duration-300 ${
                imageLoading.before ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => handleImageLoad('before')}
            />
          </div>
          <p className="text-xs text-gray-500 font-medium">Before</p>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-0.5 bg-gradient-to-r from-gray-300 to-primary"></div>
        </div>
        
        <div className="text-center">
          <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-2">
            {imageLoading.after && (
              <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse"></div>
            )}
            <img
              src={testimonial.afterImage}
              alt={`${testimonial.name} after`}
              className={`w-full h-full object-cover rounded-full border-2 border-primary transition-opacity duration-300 ${
                imageLoading.after ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => handleImageLoad('after')}
            />
          </div>
          <p className="text-xs text-primary font-medium">After</p>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 text-center italic">
        "{testimonial.quote}"
      </blockquote>

      {/* Stats and Name */}
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 mb-2">
          {testimonial.name}, {testimonial.age}
        </h3>
        <div className="bg-accent/10 rounded-lg p-3">
          <p className="text-sm font-medium text-gray-900">
            From <span className="text-gray-600">{testimonial.matchesFrom}</span> to{' '}
            <span className="text-primary font-bold">{testimonial.matchesTo} matches</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">in {testimonial.timeframe}</p>
        </div>
      </div>
    </Card>
  );
};

const TrustPilotWidget = () => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 126 31'%3E%3Cpath fill='%2300B67A' d='M0 0h126v31H0z'/%3E%3Cpath fill='%23fff' d='M25.5 6.7l2.8 8.6h9.1l-7.4 5.4 2.8 8.5-7.3-5.3-7.3 5.3 2.8-8.5-7.4-5.4h9.1l2.8-8.6z'/%3E%3Cpath fill='%23fff' d='M45.9 6.7l2.8 8.6h9.1l-7.4 5.4 2.8 8.5-7.3-5.3-7.3 5.3 2.8-8.5-7.4-5.4h9.1l2.8-8.6z'/%3E%3Cpath fill='%23fff' d='M66.3 6.7l2.8 8.6h9.1l-7.4 5.4 2.8 8.5-7.3-5.3-7.3 5.3 2.8-8.5-7.4-5.4h9.1l2.8-8.6z'/%3E%3Cpath fill='%23fff' d='M86.7 6.7l2.8 8.6h9.1l-7.4 5.4 2.8 8.5-7.3-5.3-7.3 5.3 2.8-8.5-7.4-5.4h9.1l2.8-8.6z'/%3E%3Cpath fill='%23fff' d='M107.1 6.7l2.8 8.6h9.1l-7.4 5.4 2.8 8.5-7.3-5.3-7.3 5.3 2.8-8.5-7.4-5.4h9.1l2.8-8.6z'/%3E%3C/svg%3E"
              alt="Trustpilot logo"
              className="h-8 mb-2"
            />
          </div>
          <div className="flex items-center justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${i < 4 ? 'text-[#00B67A] fill-current' : 'text-[#00B67A] fill-current'}`} 
              />
            ))}
            <span className="ml-2 text-sm font-medium text-gray-700">4.8 out of 5</span>
          </div>
          <p className="text-sm text-gray-600">
            Based on <span className="font-medium">2,847+ reviews</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">TrustPilot Reviews</p>
        </div>
      </div>
    </div>
  );
};