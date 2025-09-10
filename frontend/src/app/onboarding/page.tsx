"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { CheckCircle2, User, Users, Dumbbell, Plane, UtensilsCrossed, Camera, Music, BookOpen, Gamepad2, Heart, Coffee, Mountain, Upload, X, Check, Smartphone, FileText, TrendingUp, Mail, Phone, Clock } from "lucide-react";
import { trackInitiateCheckout, trackCompleteRegistration, trackFormStep } from "@/lib/metaPixel";

interface OnboardingData {
  name: string;
  age: string;
  datingGoal: string;
  currentMatches: string;
  bodyType: string;
  stylePreference: string;
  ethnicity: string;
  interests: string[];
  photos: File[];
  screenshots: File[];
  currentBio: string;
  email: string;
  phone: string;
  // New fields for step 5
  vibe: string;
  wantMore: string;
  oneLiner: string;
}

const datingGoals = [
  { value: "casual", label: "Casual Dating" },
  { value: "relationship", label: "Relationship" },
  { value: "marriage", label: "Marriage" },
  { value: "hookup", label: "Hookup" }
];

const matchOptions = [
  { value: "0-2", label: "0-2 matches" },
  { value: "3-5", label: "3-5 matches" },
  { value: "5-10", label: "5-10 matches" },
  { value: "10+", label: "10+ matches" }
];

const vibeOptions = [
  { value: "fitness-lifestyle", label: "🔘 Fitness & Lifestyle" },
  { value: "career-success", label: "🔘 Career & Success" },
  { value: "foodie-traveler", label: "🔘 Foodie & Traveler" },
  { value: "fun-adventurous", label: "🔘 Fun & Adventurous" }
];

const wantMoreOptions = [
  { value: "matches", label: "🔘 Matches" },
  { value: "dates", label: "🔘 Dates" },
  { value: "serious-connections", label: "🔘 Serious Connections" }
];

const bodyTypes = [
  { value: "slim", label: "Slim" },
  { value: "average-fit", label: "Average / Fit" },
  { value: "lean-toned", label: "Lean & Toned" },
  { value: "muscular-athletic", label: "Muscular / Athletic" },
  { value: "bulky-bodybuilder", label: "Bulky / Bodybuilder" },
  { value: "chubby-soft", label: "Chubby / Soft" },
  { value: "plus-size", label: "Plus-size" },
  { value: "petite", label: "Petite" },
  { value: "tall-slim", label: "Tall and Slim" },
  { value: "short-stocky", label: "Short and Stocky" }
];

const stylePreferences = [
  { value: "professional", label: "Professional", description: "Business attire, suits, formal wear" },
  { value: "casual", label: "Casual", description: "Everyday comfort, relaxed style" },
  { value: "adventurous", label: "Adventurous", description: "Outdoor gear, active lifestyle" },
  { value: "party", label: "Party", description: "Night out, trendy fashion" }
];

const ethnicityOptions = [
  { value: "prefer-not-to-say", label: "Prefer not to say" },
  { value: "white", label: "White/Caucasian" },
  { value: "black", label: "Black/African American" },
  { value: "hispanic", label: "Hispanic/Latino" },
  { value: "asian", label: "Asian" },
  { value: "middle-eastern", label: "Middle Eastern" },
  { value: "native-american", label: "Native American" },
  { value: "pacific-islander", label: "Pacific Islander" },
  { value: "mixed", label: "Mixed/Multi-racial" },
  { value: "other", label: "Other" }
];

const interestOptions = [
  { value: "gym", label: "Gym", icon: Dumbbell },
  { value: "travel", label: "Travel", icon: Plane },
  { value: "food", label: "Food", icon: UtensilsCrossed },
  { value: "photography", label: "Photography", icon: Camera },
  { value: "music", label: "Music", icon: Music },
  { value: "reading", label: "Reading", icon: BookOpen },
  { value: "gaming", label: "Gaming", icon: Gamepad2 },
  { value: "dating", label: "Dating", icon: Heart },
  { value: "coffee", label: "Coffee", icon: Coffee },
  { value: "hiking", label: "Hiking", icon: Mountain },
  { value: "movies", label: "Movies", icon: Camera },
  { value: "art", label: "Art", icon: BookOpen }
];

const goodExamples = [
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/49e44d8b-77c8-42bb-baaa-b51976a9a14a/generated_images/close-up-selfie-of-a-young-woman-with-bl-709fdc88-20250821192757.jpg",
    alt: "Clear face selfie"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/49e44d8b-77c8-42bb-baaa-b51976a9a14a/generated_images/close-up-selfie-of-a-young-man-with-dark-243cb629-20250821192820.jpg",
    alt: "Different angle selfie"
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
    alt: "Good selfie example"
  }
];

const badExamples = [
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
    alt: "Group photos"
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&blur=2",
    alt: "Blurry photos"
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    alt: "Covered faces"
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [screenshotDragActive, setScreenshotDragActive] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState<OnboardingData>({
    name: "",
    age: "",
    datingGoal: "",
    currentMatches: "",
    bodyType: "",
    stylePreference: "",
    ethnicity: "",
    interests: [],
    photos: [],
    screenshots: [],
    currentBio: "",
    email: "",
    phone: "",
    vibe: "",
    wantMore: "",
    oneLiner: ""
  });

  // Clear any stored form data on page load to start fresh
  useEffect(() => {
    localStorage.removeItem('onboardingFormData');
    setCurrentStep(1);
    // Track form initiation
    trackInitiateCheckout("Onboarding Form");
  }, []);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const isStep1Valid = formData.name.trim() !== "" &&
    formData.age !== "" &&
    formData.datingGoal !== "" &&
    formData.currentMatches !== "";

  const isStep2Valid = formData.bodyType !== "" &&
    formData.stylePreference !== "" &&
    formData.ethnicity !== "" &&
    formData.interests.length === 3;

  const isStep3Valid = formData.photos.length >= 10;

  // Email validation function
  const isValidEmail = (email: string) => {
    return email.includes('@') && email.includes('.');
  };

  // Phone validation function - exactly 10 digits
  const isValidPhone = (phone: string) => {
    const digitsOnly = phone.replace(/\D/g, ''); // Remove all non-digits
    return digitsOnly.length === 10;
  };

  // Validation functions that update error states
  const validateEmail = (email: string) => {
    if (email.trim() === "") {
      setEmailError("Email is required");
      return false;
    }
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = (phone: string) => {
    if (phone.trim() === "") {
      setPhoneError("");
      return true; // Phone is optional
    }
    if (!isValidPhone(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const isStep5Valid = formData.email.trim() !== "" &&
    isValidEmail(formData.email) &&
    (formData.phone.trim() === "" || isValidPhone(formData.phone)) &&
    formData.vibe !== "" &&
    formData.wantMore !== "";

  const handleContinue = async () => {
    if (currentStep === 1 && isStep1Valid) {
      trackFormStep(1, "Basic Information");
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Valid) {
      trackFormStep(2, "Photo Upload");
      setCurrentStep(3);
    } else if (currentStep === 3 && isStep3Valid) {
      trackFormStep(3, "Screenshot Upload");
      setCurrentStep(4);
    } else if (currentStep === 4) {
      trackFormStep(4, "Bio and Preferences");
      setCurrentStep(5);
    } else if (currentStep === 5 && isStep5Valid) {
      // Track form completion
      trackCompleteRegistration({
        name: formData.name,
        age: formData.age,
        dating_goal: formData.datingGoal,
        photo_count: formData.photos.length,
        screenshot_count: formData.screenshots.length,
        vibe: formData.vibe,
        want_more: formData.wantMore,
        one_liner: formData.oneLiner
      });

      // Store form data in localStorage and redirect to payment
      try {
        // Store form data locally (without photos to avoid storage quota issues)
        localStorage.setItem('onboardingFormData', JSON.stringify({
          name: formData.name,
          age: formData.age,
          datingGoal: formData.datingGoal,
          currentMatches: formData.currentMatches,
          bodyType: formData.bodyType,
          stylePreference: formData.stylePreference,
          ethnicity: formData.ethnicity,
          interests: formData.interests,
          currentBio: formData.currentBio,
          email: formData.email,
          phone: formData.phone,
          photoCount: formData.photos.length,
          screenshotCount: formData.screenshots.length,
          vibe: formData.vibe,
          wantMore: formData.wantMore,
          oneLiner: formData.oneLiner
        }));

        // Store photos in memory using a global variable instead of sessionStorage
        // This avoids storage quota issues
        if (typeof window !== 'undefined') {
          (window as any).onboardingPhotos = formData.photos;
          (window as any).onboardingScreenshots = formData.screenshots;
        }

        // Set default package and redirect to checkout
        localStorage.setItem('selectedPackage', 'professional');
        router.push('/checkout');
      } catch (error) {
        console.error('Error preparing form data:', error);
        alert('Failed to prepare form data. Please try again.');
      }
    }
  };


  const handleSkipStep4 = () => {
    setCurrentStep(5);
  };

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter(file => {
      // Only allow image files
      return file.type.startsWith('image/');
    });

    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newFiles].slice(0, 20) // Max 20 photos
    }));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleDatingGoalSelect = (value: string) => {
    setFormData(prev => ({ ...prev, datingGoal: value }));
  };

  const handleMatchOptionSelect = (value: string) => {
    setFormData(prev => ({ ...prev, currentMatches: value }));
  };



  const handleStylePreferenceSelect = (value: string) => {
    setFormData(prev => ({ ...prev, stylePreference: value }));
  };

  const handleInterestToggle = (value: string) => {
    setFormData(prev => {
      const interests = prev.interests.includes(value)
        ? prev.interests.filter(i => i !== value)
        : prev.interests.length < 3
          ? [...prev.interests, value]
          : prev.interests;

      return { ...prev, interests };
    });
  };

  const handleScreenshotSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter(file => {
      return file.type.startsWith('image/');
    });

    setFormData(prev => ({
      ...prev,
      screenshots: [...prev.screenshots, ...newFiles].slice(0, 10)
    }));
  }, []);

  const handleScreenshotDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setScreenshotDragActive(false);
    handleScreenshotSelect(e.dataTransfer.files);
  }, [handleScreenshotSelect]);

  const handleScreenshotDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setScreenshotDragActive(true);
    } else if (e.type === "dragleave") {
      setScreenshotDragActive(false);
    }
  }, []);

  const removeScreenshot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  const getDeliveryTime = () => {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return deliveryTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: '#0E0E0F' }}>
        {/* Glass morphism background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E0F] via-[#1a1a1a] to-[#0E0E0F]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4ae36]/5 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#d4ae36]/3 via-transparent to-transparent"></div>
        <Card className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/8 hover:border-white/20 transition-all duration-300 ease-out">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-[#d4ae36] mx-auto" />
              <h2 className="text-2xl font-bold text-white">All Set!</h2>
              <p className="text-gray-300">
                Perfect! We'll get started on your optimized photos right away.
              </p>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-white/20">
                <p className="text-sm text-[#d4ae36] font-medium">
                  📧 Check your email at {formData.email}
                </p>
                <p className="text-sm text-[#c19d2f] mt-1">
                  We'll notify you as soon as your photos are ready!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: '#0E0E0F', color: 'white' }}>
      <style jsx global>{`
        body {
          background-color: #0E0E0F !important;
        }
        html {
          background-color: #0E0E0F !important;
        }
      `}</style>

      {/* Glass morphism background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E0F] via-[#1a1a1a] to-[#0E0E0F]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4ae36]/5 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#d4ae36]/3 via-transparent to-transparent"></div>
      {/* Progress Bar */}
      <div className="w-full bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {currentStep > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-white hover:text-white flex items-center gap-1"
                >
                  Back
                </Button>
              )}
              <span className="text-sm font-medium text-white">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            {currentStep === 4 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkipStep4}
                className="text-white hover:text-white"
              >
                Skip
              </Button>
            )}
            {currentStep !== 4 && (
              <Button variant="ghost" size="sm" disabled className="text-gray-500">
                Skip
              </Button>
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4 relative z-10">
        {currentStep === 5 ? (
          <Card className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/8 hover:border-white/20 transition-all duration-300 ease-out">
            <CardHeader className="text-center space-y-2 pb-6">
              <CardTitle className="text-3xl font-bold text-white">
                "What makes you stand out?"
              </CardTitle>
              <CardDescription className="text-lg text-gray-300">
                Help us understand your personality and goals
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Pick your vibe */}
              <div className="space-y-3">
                <label className="text-lg font-bold text-white">
                  Pick your vibe:
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {vibeOptions.map(option => (
                    <Button
                      key={option.value}
                      variant={formData.vibe === option.value ? "default" : "outline"}
                      className={`h-12 text-left justify-start ${formData.vibe === option.value
                        ? "bg-[#FFD700]/20 backdrop-blur-sm border-2 border-[#FFD700] text-white shadow-lg shadow-[#FFD700]/30 transition-all duration-300 ease-out"
                        : "bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:border-[#FFD700] hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all duration-300 ease-out"
                        }`}
                      onClick={() => setFormData(prev => ({ ...prev, vibe: option.value }))}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* What do you want more of? */}
              <div className="space-y-3">
                <label className="text-lg font-bold text-white">
                  What do you want more of?
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {wantMoreOptions.map(option => (
                    <Button
                      key={option.value}
                      variant={formData.wantMore === option.value ? "default" : "outline"}
                      className={`h-12 text-left justify-start ${formData.wantMore === option.value
                        ? "bg-[#FFD700]/20 backdrop-blur-sm border-2 border-[#FFD700] text-white shadow-lg shadow-[#FFD700]/30 transition-all duration-300 ease-out"
                        : "bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:border-[#FFD700] hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all duration-300 ease-out"
                        }`}
                      onClick={() => setFormData(prev => ({ ...prev, wantMore: option.value }))}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* One line about yourself */}
              <div className="space-y-3">
                <label className="text-lg font-bold text-white">
                  One line about yourself we should know<br />
                  <span className="text-sm font-normal text-gray-300">(Recommended)</span>
                </label>
                <Textarea
                  placeholder="e.g., I'm a software engineer who loves hiking and cooking Italian food..."
                  value={formData.oneLiner}
                  onChange={(e) => setFormData(prev => ({ ...prev, oneLiner: e.target.value }))}
                  className="h-20 bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 focus:bg-white/10 transition-all duration-300 ease-out resize-none"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    validateEmail(e.target.value);
                  }}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className={`h-12 bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 focus:bg-white/10 transition-all duration-300 ease-out ${emailError ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {emailError ? (
                  <p className="text-sm text-red-600">{emailError}</p>
                ) : (
                  <p className="text-sm text-gray-400">
                    Pre-filled from your payment information if available
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, phone: e.target.value }));
                    validatePhone(e.target.value);
                  }}
                  onBlur={(e) => validatePhone(e.target.value)}
                  className={`h-12 bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 focus:bg-white/10 transition-all duration-300 ease-out ${phoneError ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {phoneError ? (
                  <p className="text-sm text-red-600">{phoneError}</p>
                ) : (
                  <p className="text-sm text-gray-400">
                    For SMS updates about your photo generation progress
                  </p>
                )}
              </div>

              {/* Email Notification Banner */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-white/20">
                <div className="flex items-center gap-2 text-[#FFD700]">
                  <Mail className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">We'll email you as soon as they're ready!</div>
                    <div className="text-sm text-[#FFA500]">
                      You'll receive a link to download your optimized photos and bio suggestions
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="pt-6">
                <Button
                  onClick={handleContinue}
                  disabled={!isStep5Valid}
                  className="w-full h-12 bg-[#FFD700] hover:bg-[#d4ae36] disabled:bg-gray-700 disabled:text-gray-400 text-black text-lg font-medium transition-all duration-200"
                >
                  {isStep5Valid ? "➡️ Next → Build My Profile" :
                    emailError ? "Please fix email errors" :
                      phoneError ? "Please fix phone number errors" :
                        "Please select your vibe and what you want more of"
                  }
                </Button>
              </div>

              {/* Privacy Note */}
              <div className="text-center text-xs text-gray-400 bg-gray-800 p-3 rounded-lg">
                🔒 Your information is secure and will only be used to deliver your photos and send updates you've requested
              </div>
            </CardContent>
          </Card>
        ) : currentStep === 4 ? (
          <Card className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/8 hover:border-white/20 transition-all duration-300 ease-out">
            <CardHeader className="text-center space-y-2 pb-6">
              <CardTitle className="text-3xl font-bold text-white">
                Share Your Current Profile (Optional but Recommended)
              </CardTitle>
              <CardDescription className="text-lg text-gray-300">
                This helps us improve what's not working
              </CardDescription>

              {/* Value Proposition */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-white/30 mt-6">
                <div className="flex items-center justify-center gap-2 text-[#d4ae36] font-semibold">
                  <TrendingUp className="h-5 w-5" />
                  Users who share profiles get 2x better results
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Tinder Screenshots Upload */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-white" />
                  <h3 className="text-lg font-semibold text-white">
                    Upload Tinder Screenshots
                  </h3>
                  <span className="text-sm text-gray-400">(Optional)</span>
                </div>

                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${screenshotDragActive
                    ? "border-[#d4ae36] bg-[#d4ae36]/10"
                    : "border-white/20 hover:border-[#d4ae36] hover:bg-white/5"
                    }`}
                  onDragEnter={handleScreenshotDrag}
                  onDragLeave={handleScreenshotDrag}
                  onDragOver={handleScreenshotDrag}
                  onDrop={handleScreenshotDrop}
                >
                  <Smartphone className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-md font-semibold text-white mb-2">
                    Drop screenshots here or click to browse
                  </h4>
                  <p className="text-gray-300 mb-4 text-sm">
                    Upload screenshots of your current profile, photos, or matches
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleScreenshotSelect(e.target.files)}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="hover:bg-white/5 hover:border-[#d4ae36] text-white border-white/20"
                  >
                    <label htmlFor="screenshot-upload" className="cursor-pointer">
                      <Camera className="h-4 w-4 mr-2" />
                      Choose Screenshots
                    </label>
                  </Button>
                </div>

                {/* Screenshot Thumbnails */}
                {formData.screenshots.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-white">
                        Uploaded Screenshots
                      </span>
                      <span className="text-sm text-gray-400">
                        {formData.screenshots.length} uploaded
                      </span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                      {formData.screenshots.map((screenshot, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-[9/16] rounded-lg overflow-hidden border-2 border-white/20">
                            <img
                              src={URL.createObjectURL(screenshot)}
                              alt={`Screenshot ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => removeScreenshot(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Current Bio */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-white" />
                  <h3 className="text-lg font-semibold text-white">
                    Current Bio
                  </h3>
                  <span className="text-sm text-gray-400">(Optional)</span>
                </div>

                <Textarea
                  placeholder="Paste your current Tinder bio here... This helps us understand what's working and what needs improvement."
                  value={formData.currentBio}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentBio: e.target.value }))}
                  className="min-h-[120px] resize-none bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:border-[#d4ae36] focus:ring-2 focus:ring-[#d4ae36]/30 focus:bg-white/10 transition-all duration-300 ease-out"
                />

                {formData.currentBio && (
                  <div className="text-sm text-gray-400">
                    {formData.currentBio.length} characters
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {/* Continue Button */}
                <Button
                  onClick={handleContinue}
                  className="flex-1 h-12 bg-[#d4ae36] hover:from-[#c19d2f] hover:via-[#e04a5f] hover:to-[#c19d2f] text-black text-lg font-medium transition-all duration-200"
                >
                  Continue to Final Step
                </Button>

                {/* Skip Button - More Prominent */}
                <Button
                  onClick={handleSkipStep4}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-white/20 hover:border-[#d4ae36] text-white hover:text-white text-lg font-medium transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="text-white">Skip and use generic optimization</div>
                  </div>
                </Button>
              </div>

              {/* Helper Text */}
              <div className="text-center text-sm text-gray-400 bg-gray-800/50 p-3 rounded-lg border border-white/20">
                💡 Sharing your current profile helps our AI identify specific areas for improvement and create more targeted optimizations
              </div>
            </CardContent>
          </Card>
        ) : currentStep === 3 ? (
          <div className="w-full max-w-6xl">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl font-bold text-white">
                Upload Your Best Selfies
              </h1>
              <p className="text-lg text-gray-300">
                We need 10-20 clear photos of your face
              </p>
            </div>

            {/* Desktop: Two columns, Mobile: Stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Good Examples */}
              <Card className="border-2 border-[#d4ae36]/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#d4ae36]" />
                    <CardTitle className="text-xl text-[#d4ae36]">Good Examples</CardTitle>
                  </div>
                  <CardDescription>
                    Close up selfies, same person, adults, variety of backgrounds, facial expressions, head tilts and angles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {goodExamples.map((example, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden border-2 border-[#d4ae36]/30">
                        <img
                          src={example.src}
                          alt={example.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bad Examples */}
              <Card className="border-2 border-red-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-red-600" />
                    <CardTitle className="text-xl text-red-700">Bad Examples</CardTitle>
                  </div>
                  <CardDescription>
                    Group shots, blurry, full-length, covered faces, animals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {badExamples.map((example, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden border-2 border-red-300">
                        <img
                          src={example.src}
                          alt={example.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upload Zone */}
            <Card className="w-full">
              <CardContent className="p-6">
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${dragActive
                    ? "border-[#d4ae36] bg-[#d4ae36]/10"
                    : "border-white/20 hover:border-[#d4ae36] hover:bg-white/5"
                    }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Drag & drop your photos here
                  </h3>
                  <p className="text-gray-300 mb-4">
                    or click to browse from your device
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Button
                    asChild
                    variant="outline"
                    className="hover:bg-white/5 hover:border-[#d4ae36] text-white border-white/20"
                  >
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Camera className="h-4 w-4 mr-2" />
                      Choose Photos
                    </label>
                  </Button>
                </div>

                {/* Photo Counter */}
                <div className="flex items-center justify-between mt-6 mb-4">
                  <h3 className="text-lg font-semibold text-white">Uploaded Photos</h3>
                  <div className="text-sm">
                    <span className={`font-semibold ${formData.photos.length >= 10 ? 'text-[#d4ae36]' : 'text-gray-400'}`}>
                      {formData.photos.length}/10
                    </span>
                    <span className="text-gray-400 ml-1">minimum photos uploaded</span>
                  </div>
                </div>

                {/* Photo Thumbnails */}
                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 mb-6">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Continue Button */}
                <Button
                  onClick={handleContinue}
                  disabled={!isStep3Valid}
                  className="w-full h-12 bg-[#d4ae36] hover:from-[#c19d2f] hover:via-[#e04a5f] hover:to-[#c19d2f] disabled:bg-gray-700 disabled:text-gray-400 text-black text-lg font-medium transition-all duration-200"
                >
                  {isStep3Valid ? "Continue" : `Upload ${10 - formData.photos.length} more photos to continue`}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : currentStep === 2 ? (
          <Card className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/8 hover:border-white/20 transition-all duration-300 ease-out">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold text-white">
                What vibe do you want?
              </CardTitle>
              <CardDescription className="text-lg text-gray-300">
                Help us understand your style preferences and interests
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Body Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-white">
                  Body Type
                </label>
                <Select value={formData.bodyType} onValueChange={(value) => setFormData(prev => ({ ...prev, bodyType: value }))}>
                  <SelectTrigger className="h-12 bg-white/5 backdrop-blur-sm border border-white/20 text-white focus:border-[#d4ae36] focus:ring-2 focus:ring-[#d4ae36]/30 focus:bg-white/10 transition-all duration-300 ease-out">
                    <SelectValue placeholder="Select your body type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0E0E0F] border border-white/20 text-white">
                    {bodyTypes.map(type => (
                      <SelectItem key={type.value} value={type.value} className="hover:bg-white/5 hover:border hover:border-[#d4ae36] hover:text-white focus:bg-white/5 focus:text-white focus:border focus:border-[#d4ae36] text-white transition-all duration-200">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Style Preferences */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white">
                  Style Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stylePreferences.map(style => (
                    <Card
                      key={style.value}
                      className={`cursor-pointer bg-white/5 backdrop-blur-sm border border-white/20 transition-all duration-300 ease-out ${formData.stylePreference === style.value
                        ? "border-2 border-[#d4ae36] bg-[#d4ae36]/20 shadow-lg shadow-[#d4ae36]/30"
                        : "hover:border-[#d4ae36]"
                        }`}
                      onClick={() => handleStylePreferenceSelect(style.value)}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white mb-1">
                          {style.label}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {style.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Ethnicity (Required) */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-white">
                  Ethnicity
                </label>
                <Select value={formData.ethnicity} onValueChange={(value) => setFormData(prev => ({ ...prev, ethnicity: value }))}>
                  <SelectTrigger className="h-12 bg-white/5 backdrop-blur-sm border border-white/20 text-white focus:border-[#d4ae36] focus:ring-2 focus:ring-[#d4ae36]/30 focus:bg-white/10 transition-all duration-300 ease-out">
                    <SelectValue placeholder="Select your ethnicity" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0E0E0F] border border-white/20 text-white">
                    {ethnicityOptions.map(option => (
                      <SelectItem key={option.value} value={option.value} className="hover:bg-white/5 hover:border hover:border-[#d4ae36] hover:text-white focus:bg-white/5 focus:text-white focus:border focus:border-[#d4ae36] text-white transition-all duration-200">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interests Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-white">
                    Select Your Interests
                  </label>
                  <span className="text-sm text-gray-400">
                    {formData.interests.length}/3 selected
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {interestOptions.map(interest => {
                    const IconComponent = interest.icon;
                    const isSelected = formData.interests.includes(interest.value);
                    const isDisabled = !isSelected && formData.interests.length >= 3;

                    return (
                      <Button
                        key={interest.value}
                        variant={isSelected ? "default" : "outline"}
                        className={`h-20 flex flex-col items-center gap-2 p-3 bg-white/5 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 ease-out ${isSelected
                          ? "border-2 border-[#d4ae36] bg-[#d4ae36]/20 shadow-lg shadow-[#d4ae36]/30"
                          : isDisabled
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:border-[#d4ae36] hover:text-white"
                          }`}
                        onClick={() => !isDisabled && handleInterestToggle(interest.value)}
                        disabled={isDisabled}
                      >
                        <IconComponent className="h-5 w-5 flex-shrink-0" />
                        <span className="text-xs text-center leading-tight">
                          {interest.label}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Helper Text */}
              <div className="text-center text-sm text-gray-400 bg-gray-800/50 p-3 rounded-lg border border-white/20">
                This helps our AI create authentic photos that match your personality and style
              </div>

              {/* Continue Button */}
              <div className="pt-6">
                <Button
                  onClick={handleContinue}
                  disabled={!isStep2Valid}
                  className="w-full h-12 bg-[#d4ae36] hover:from-[#c19d2f] hover:via-[#e04a5f] hover:to-[#c19d2f] disabled:bg-gray-700 disabled:text-gray-400 text-black text-lg font-medium transition-all duration-200"
                >
                  Continue to Photo Upload
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/8 hover:border-white/20 transition-all duration-300 ease-out">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold text-white">
                Let's get to know you better
              </CardTitle>
              <CardDescription className="text-lg text-gray-300">
                Help us personalize your experience with some basic information
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Back to Homepage Button */}
              <div className="flex justify-start">
                <Button asChild variant="ghost" size="sm" className="text-white hover:text-white">
                  <Link href="/">
                    ← Back to Homepage
                  </Link>
                </Button>
              </div>
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-white">
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="h-12 bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:border-[#d4ae36] focus:ring-2 focus:ring-[#d4ae36]/30 focus:bg-white/10 transition-all duration-300 ease-out"
                />
              </div>

              {/* Age Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white">
                  Select your age
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant={formData.age === "20-29" ? "default" : "outline"}
                    className={`h-12 ${formData.age === "20-29"
                      ? "bg-[#d4ae36]/20 backdrop-blur-sm border-2 border-[#d4ae36] text-white shadow-lg shadow-[#d4ae36]/30 transition-all duration-300 ease-out"
                      : "bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:border-[#d4ae36] hover:text-white hover:shadow-lg hover:shadow-[#d4ae36]/20 transition-all duration-300 ease-out"
                      }`}
                    onClick={() => setFormData(prev => ({ ...prev, age: "20-29" }))}
                  >
                    Young Adult (20-29)
                  </Button>
                  <Button
                    variant={formData.age === "30-45" ? "default" : "outline"}
                    className={`h-12 ${formData.age === "30-45"
                      ? "bg-[#d4ae36]/20 backdrop-blur-sm border-2 border-[#d4ae36] text-white shadow-lg shadow-[#d4ae36]/30 transition-all duration-300 ease-out"
                      : "bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:border-[#d4ae36] hover:text-white hover:shadow-lg hover:shadow-[#d4ae36]/20 transition-all duration-300 ease-out"
                      }`}
                    onClick={() => setFormData(prev => ({ ...prev, age: "30-45" }))}
                  >
                    Adult (30-45)
                  </Button>
                  <Button
                    variant={formData.age === "46-60" ? "default" : "outline"}
                    className={`h-12 ${formData.age === "46-60"
                      ? "bg-[#d4ae36]/20 backdrop-blur-sm border-2 border-[#d4ae36] text-white shadow-lg shadow-[#d4ae36]/30 transition-all duration-300 ease-out"
                      : "bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:border-[#d4ae36] hover:text-white hover:shadow-lg hover:shadow-[#d4ae36]/20 transition-all duration-300 ease-out"
                      }`}
                    onClick={() => setFormData(prev => ({ ...prev, age: "46-60" }))}
                  >
                    Middle-aged (46-60)
                  </Button>
                  <Button
                    variant={formData.age === "60+" ? "default" : "outline"}
                    className={`h-12 ${formData.age === "60+"
                      ? "bg-[#d4ae36]/20 backdrop-blur-sm border-2 border-[#d4ae36] text-white shadow-lg shadow-[#d4ae36]/30 transition-all duration-300 ease-out"
                      : "bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:border-[#d4ae36] hover:text-white hover:shadow-lg hover:shadow-[#d4ae36]/20 transition-all duration-300 ease-out"
                      }`}
                    onClick={() => setFormData(prev => ({ ...prev, age: "60+" }))}
                  >
                    Senior (60+)
                  </Button>
                </div>
              </div>

              {/* Dating Goals */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white">
                  What are your dating goals?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {datingGoals.map(goal => (
                    <Button
                      key={goal.value}
                      variant={formData.datingGoal === goal.value ? "default" : "outline"}
                      className={`h-12 ${formData.datingGoal === goal.value
                        ? "bg-[#d4ae36]/20 backdrop-blur-sm border-2 border-[#d4ae36] text-white shadow-lg shadow-[#d4ae36]/30 transition-all duration-300 ease-out"
                        : "bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:border-[#d4ae36] hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-[#d4ae36]/20 transition-all duration-300 ease-out"
                        }`}
                      onClick={() => handleDatingGoalSelect(goal.value)}
                    >
                      {goal.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Current Matches */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white">
                  How many matches do you typically get per week?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {matchOptions.map(option => (
                    <Button
                      key={option.value}
                      variant={formData.currentMatches === option.value ? "default" : "outline"}
                      className={`h-12 ${formData.currentMatches === option.value
                        ? "bg-[#d4ae36]/20 backdrop-blur-sm border-2 border-[#d4ae36] text-white shadow-lg shadow-[#d4ae36]/30 transition-all duration-300 ease-out"
                        : "bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:border-[#d4ae36] hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-[#d4ae36]/20 transition-all duration-300 ease-out"
                        }`}
                      onClick={() => handleMatchOptionSelect(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>


              {/* Continue Button */}
              <div className="pt-6">
                <Button
                  onClick={handleContinue}
                  disabled={!isStep1Valid}
                  className="w-full h-12 bg-[#d4ae36] hover:from-[#c19d2f] hover:via-[#e04a5f] hover:to-[#c19d2f] disabled:bg-gray-700 disabled:text-gray-400 text-white text-lg font-medium transition-all duration-200"
                >
                  Continue to Next Step
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}