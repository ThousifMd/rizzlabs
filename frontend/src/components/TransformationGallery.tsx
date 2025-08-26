"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TransformationData {
  id: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  alt: string;
}

interface TransformationCardProps {
  data: TransformationData;
  isVisible: boolean;
  index: number;
}

const transformationsData: TransformationData[] = [
  {
    id: 'professional',
    category: 'Professional',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face',
    alt: 'Professional headshot transformation'
  },
  {
    id: 'casual',
    category: 'Casual',
    beforeImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face',
    alt: 'Casual style transformation'
  },
  {
    id: 'activity',
    category: 'Activity',
    beforeImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=500&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=face',
    alt: 'Activity photo transformation'
  },
  {
    id: 'social',
    category: 'Social',
    beforeImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
    alt: 'Social setting transformation'
  },
  {
    id: 'travel',
    category: 'Travel',
    beforeImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=500&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1556474835-b0f3ac40d4d1?w=400&h=500&fit=crop&crop=face',
    alt: 'Travel photo transformation'
  },
  {
    id: 'nightout',
    category: 'Night Out',
    beforeImage: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&crop=face',
    afterImage: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=500&fit=crop&crop=face',
    alt: 'Night out transformation'
  }
];

const TransformationCard: React.FC<TransformationCardProps> = ({ data, isVisible, index }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = useCallback((clientX: number) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleSliderMove(e.clientX);
  }, [handleSliderMove]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleSliderMove(e.touches[0].clientX);
  }, [handleSliderMove]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleSliderMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleSliderMove(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleSliderMove]);

  return (
    <Card
      ref={cardRef}
      className={`relative overflow-hidden group cursor-grab active:cursor-grabbing transition-all duration-700 ease-out transform ${isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-8'
        } hover:shadow-2xl hover:scale-[1.02] shadow-lg`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
      }}
    >
      <div className="relative h-80 sm:h-96 overflow-hidden">
        {/* Before Image */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
          }}
        >
          <img
            src={data.beforeImage}
            alt={`Before - ${data.alt}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* After Image */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            clipPath: `inset(0 0 0 ${sliderPosition}%)`
          }}
        >
          <img
            src={data.afterImage}
            alt={`After - ${data.alt}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Category Badge */}
        <Badge
          variant="secondary"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-foreground shadow-lg z-20"
        >
          {data.category}
        </Badge>

        {/* Slider Handle */}
        <div
          ref={sliderRef}
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-grab active:cursor-grabbing z-30 transition-all duration-200 ease-out"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={sliderPosition}
          aria-label={`Transformation slider for ${data.category}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              setSliderPosition(Math.max(0, sliderPosition - 5));
            } else if (e.key === 'ArrowRight') {
              setSliderPosition(Math.min(100, sliderPosition + 5));
            }
          }}
        >
          {/* Handle Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-primary flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95">
            <div className="w-2 h-2 bg-primary rounded-full" />
          </div>
        </div>

        {/* Before/After Labels */}
        <div className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
          Before
        </div>
        <div className="absolute bottom-4 right-4 text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
          After
        </div>
      </div>
    </Card>
  );
};

export const TransformationGallery: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(6).fill(false));
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
          Your Transformation Awaits
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          See how our AI transforms ordinary photos into extraordinary profile pictures
        </p>
      </div>

      {/* Transformation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {transformationsData.map((transformation, index) => (
          <div
            key={transformation.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            data-index={index}
          >
            <TransformationCard
              data={transformation}
              isVisible={visibleCards[index]}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Caption */}
      <div className="text-center mb-12">
        <p className="text-2xl font-semibold text-foreground">
          Same person, 10x more matches
        </p>
        <p className="text-lg text-muted-foreground mt-2">
          Professional quality photos that get results
        </p>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Button
          onClick={() => {
            localStorage.setItem('selectedPackage', 'professional');
            window.location.href = '/onboarding';
          }}
          size="lg"
          className="px-12 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
        >
          See Your Potential
        </Button>
      </div>
    </section>
  );
};