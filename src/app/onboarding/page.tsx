"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, User, Users, Dumbbell, Plane, UtensilsCrossed, Camera, Music, BookOpen, Gamepad2, Heart, Coffee, Mountain, Upload, X, Check, Smartphone, FileText, TrendingUp } from "lucide-react";

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

const bodyTypes = [
  { value: "slim", label: "Slim", icon: User },
  { value: "athletic", label: "Athletic", icon: Dumbbell },
  { value: "average", label: "Average", icon: Users },
  { value: "plus", label: "Plus", icon: User }
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
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/49e44d8b-77c8-42bb-baaa-b51976a9a14a/generated_images/close-up-selfie-of-a-young-woman-with-br-15f0206a-20250821192842.jpg",
    alt: "Variety of angles"
  }
];

const badExamples = [
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/49e44d8b-77c8-42bb-baaa-b51976a9a14a/generated_images/group-photo-of-three-young-women-at-a-pa-a57a9f74-20250821192906.jpg",
    alt: "Group photos"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/49e44d8b-77c8-42bb-baaa-b51976a9a14a/generated_images/blurry-selfie-photo%2c-out-of-focus%2c-m-78d89336-20250821192926.jpg",
    alt: "Blurry photos"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/49e44d8b-77c8-42bb-baaa-b51976a9a14a/generated_images/person-wearing-dark-sunglasses-covering--b612c2e3-20250821192948.jpg",
    alt: "Covered faces"
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [screenshotDragActive, setScreenshotDragActive] = useState(false);
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
    currentBio: ""
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const isStep1Valid = formData.name.trim() !== "" && 
                       formData.age !== "" && 
                       formData.datingGoal !== "" && 
                       formData.currentMatches !== "";

  const isStep2Valid = formData.bodyType !== "" && 
                       formData.stylePreference !== "" && 
                       formData.interests.length === 3;

  const isStep3Valid = formData.photos.length >= 10;

  const handleContinue = () => {
    if (currentStep === 1 && isStep1Valid) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Valid) {
      setCurrentStep(3);
    } else if (currentStep === 3 && isStep3Valid) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setIsCompleted(true);
    }
  };

  const handleSkipStep4 = () => {
    setCurrentStep(4);
    setIsCompleted(true);
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

  const handleBodyTypeSelect = (value: string) => {
    setFormData(prev => ({ ...prev, bodyType: value }));
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

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Step 4 Complete!</h2>
              <p className="text-gray-600">
                Perfect! Your profile information has been collected successfully.
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-emerald-700">
                  Step 5 is coming soon. We'll notify you when it's ready!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Progress Bar */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            {currentStep === 4 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSkipStep4}
                className="text-gray-600 hover:text-gray-800"
              >
                Skip
              </Button>
            )}
            {currentStep !== 4 && (
              <Button variant="ghost" size="sm" disabled className="text-gray-400">
                Skip
              </Button>
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
        {currentStep === 4 ? (
          <Card className="w-full max-w-4xl">
            <CardHeader className="text-center space-y-2 pb-6">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Share Your Current Profile (Optional but Recommended)
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                This helps us improve what's not working
              </CardDescription>
              
              {/* Value Proposition */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg border border-emerald-200 mt-6">
                <div className="flex items-center justify-center gap-2 text-emerald-700 font-semibold">
                  <TrendingUp className="h-5 w-5" />
                  Users who share profiles get 2x better results
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Tinder Screenshots Upload */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upload Tinder Screenshots
                  </h3>
                  <span className="text-sm text-gray-500">(Optional)</span>
                </div>
                
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                    screenshotDragActive
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                  onDragEnter={handleScreenshotDrag}
                  onDragLeave={handleScreenshotDrag}
                  onDragOver={handleScreenshotDrag}
                  onDrop={handleScreenshotDrop}
                >
                  <Smartphone className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-md font-semibold text-gray-900 mb-2">
                    Drop screenshots here or click to browse
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm">
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
                    className="hover:bg-emerald-50 hover:border-emerald-400"
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
                      <span className="text-sm font-medium text-gray-700">
                        Uploaded Screenshots
                      </span>
                      <span className="text-sm text-gray-500">
                        {formData.screenshots.length} uploaded
                      </span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                      {formData.screenshots.map((screenshot, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-[9/16] rounded-lg overflow-hidden border-2 border-gray-200">
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
                  <FileText className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Current Bio
                  </h3>
                  <span className="text-sm text-gray-500">(Optional)</span>
                </div>
                
                <Textarea
                  placeholder="Paste your current Tinder bio here... This helps us understand what's working and what needs improvement."
                  value={formData.currentBio}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentBio: e.target.value }))}
                  className="min-h-[120px] resize-none"
                />
                
                {formData.currentBio && (
                  <div className="text-sm text-gray-500">
                    {formData.currentBio.length} characters
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {/* Continue Button */}
                <Button
                  onClick={handleContinue}
                  className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-lg font-medium transition-all duration-200"
                >
                  Continue to Final Step
                </Button>
                
                {/* Skip Button - More Prominent */}
                <Button
                  onClick={handleSkipStep4}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400 text-lg font-medium transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="text-gray-700">Skip and use generic optimization</div>
                  </div>
                </Button>
              </div>
              
              {/* Helper Text */}
              <div className="text-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                💡 Sharing your current profile helps our AI identify specific areas for improvement and create more targeted optimizations
              </div>
            </CardContent>
          </Card>
        ) : currentStep === 3 ? (
          <div className="w-full max-w-6xl">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Upload Your Best Selfies
              </h1>
              <p className="text-lg text-gray-600">
                We need 10-20 clear photos of your face
              </p>
            </div>

            {/* Desktop: Two columns, Mobile: Stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Good Examples */}
              <Card className="border-2 border-emerald-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-emerald-600" />
                    <CardTitle className="text-xl text-emerald-700">Good Examples</CardTitle>
                  </div>
                  <CardDescription>
                    Close up selfies, same person, adults, variety of backgrounds, facial expressions, head tilts and angles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {goodExamples.map((example, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden border-2 border-emerald-300">
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
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    dragActive
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drag & drop your photos here
                  </h3>
                  <p className="text-gray-600 mb-4">
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
                    className="hover:bg-emerald-50 hover:border-emerald-400"
                  >
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Camera className="h-4 w-4 mr-2" />
                      Choose Photos
                    </label>
                  </Button>
                </div>

                {/* Photo Counter */}
                <div className="flex items-center justify-between mt-6 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Uploaded Photos</h3>
                  <div className="text-sm">
                    <span className={`font-semibold ${formData.photos.length >= 10 ? 'text-emerald-600' : 'text-gray-600'}`}>
                      {formData.photos.length}/10
                    </span>
                    <span className="text-gray-500 ml-1">minimum photos uploaded</span>
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
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-lg font-medium transition-all duration-200"
                >
                  {isStep3Valid ? "Continue" : `Upload ${10 - formData.photos.length} more photos to continue`}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : currentStep === 2 ? (
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold text-gray-900">
                What vibe do you want?
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Help us understand your style preferences and interests
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Body Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Body Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {bodyTypes.map(type => {
                    const IconComponent = type.icon;
                    return (
                      <Button
                        key={type.value}
                        variant={formData.bodyType === type.value ? "default" : "outline"}
                        className={`h-16 flex items-center gap-3 ${
                          formData.bodyType === type.value 
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                            : "hover:bg-emerald-50 hover:border-emerald-300"
                        }`}
                        onClick={() => handleBodyTypeSelect(type.value)}
                      >
                        <IconComponent className="h-5 w-5" />
                        {type.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Style Preferences */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Style Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stylePreferences.map(style => (
                    <Card
                      key={style.value}
                      className={`cursor-pointer transition-all duration-200 ${
                        formData.stylePreference === style.value
                          ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200"
                          : "hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                      onClick={() => handleStylePreferenceSelect(style.value)}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {style.label}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {style.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Ethnicity (Optional) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Ethnicity <span className="text-gray-400">(Optional)</span>
                </label>
                <Select value={formData.ethnicity} onValueChange={(value) => setFormData(prev => ({ ...prev, ethnicity: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    {ethnicityOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interests Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Select Your Interests
                  </label>
                  <span className="text-sm text-gray-500">
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
                        className={`h-20 flex flex-col items-center gap-2 p-3 ${
                          isSelected
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                            : isDisabled
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-emerald-50 hover:border-emerald-300"
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
              <div className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                This helps our AI create authentic photos that match your personality and style
              </div>

              {/* Continue Button */}
              <div className="pt-6">
                <Button
                  onClick={handleContinue}
                  disabled={!isStep2Valid}
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-lg font-medium transition-all duration-200"
                >
                  Continue to Photo Upload
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Let's get to know you better
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Help us personalize your experience with some basic information
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="h-12"
                />
              </div>

              {/* Age Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Age
                </label>
                <Select value={formData.age} onValueChange={(value) => setFormData(prev => ({ ...prev, age: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your age" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 48 }, (_, i) => i + 18).map(age => (
                      <SelectItem key={age} value={age.toString()}>
                        {age} years old
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dating Goals */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  What are your dating goals?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {datingGoals.map(goal => (
                    <Button
                      key={goal.value}
                      variant={formData.datingGoal === goal.value ? "default" : "outline"}
                      className={`h-12 ${
                        formData.datingGoal === goal.value 
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                          : "hover:bg-emerald-50 hover:border-emerald-300"
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
                <label className="text-sm font-medium text-gray-700">
                  How many matches do you typically get per week?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {matchOptions.map(option => (
                    <Button
                      key={option.value}
                      variant={formData.currentMatches === option.value ? "default" : "outline"}
                      className={`h-12 ${
                        formData.currentMatches === option.value 
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                          : "hover:bg-emerald-50 hover:border-emerald-300"
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
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-lg font-medium transition-all duration-200"
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