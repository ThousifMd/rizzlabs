"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, User, Users, Dumbbell, Plane, UtensilsCrossed, Camera, Music, BookOpen, Gamepad2, Heart, Coffee, Mountain } from "lucide-react";

interface OnboardingData {
  name: string;
  age: string;
  datingGoal: string;
  currentMatches: string;
  bodyType: string;
  stylePreference: string;
  ethnicity: string;
  interests: string[];
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

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    name: "",
    age: "",
    datingGoal: "",
    currentMatches: "",
    bodyType: "",
    stylePreference: "",
    ethnicity: "",
    interests: []
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

  const handleContinue = () => {
    if (currentStep === 1 && isStep1Valid) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Valid) {
      setIsCompleted(true);
    }
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

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Step 2 Complete!</h2>
              <p className="text-gray-600">
                Excellent! Your style preferences have been saved.
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-emerald-700">
                  Steps 3-5 are coming soon. We'll notify you when they're ready!
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
            <Button variant="ghost" size="sm" disabled className="text-gray-400">
              Skip
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
        <Card className="w-full max-w-2xl">
          {currentStep === 1 && (
            <>
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
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-3xl font-bold text-gray-900">
                  What vibe do you want?
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Help us understand your style and preferences
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-8">
                {/* Body Type */}
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
                          className={`h-16 flex flex-col items-center gap-2 ${
                            formData.bodyType === type.value 
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                              : "hover:bg-emerald-50 hover:border-emerald-300"
                          }`}
                          onClick={() => handleBodyTypeSelect(type.value)}
                        >
                          <IconComponent className="h-5 w-5" />
                          <span className="text-sm">{type.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Style Preference */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Style Preference
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {stylePreferences.map(style => (
                      <Card
                        key={style.value}
                        className={`cursor-pointer transition-all duration-200 ${
                          formData.stylePreference === style.value
                            ? "ring-2 ring-emerald-500 bg-emerald-50"
                            : "hover:shadow-md hover:border-emerald-300"
                        }`}
                        onClick={() => handleStylePreferenceSelect(style.value)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-medium text-gray-900">{style.label}</h3>
                            <p className="text-sm text-gray-600">{style.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Ethnicity */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Ethnicity <span className="text-gray-400">(Optional)</span>
                  </label>
                  <Select value={formData.ethnicity} onValueChange={(value) => setFormData(prev => ({ ...prev, ethnicity: value }))}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your ethnicity (optional)" />
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

                {/* Interests */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Interests
                    </label>
                    <span className="text-sm text-gray-500">
                      Select 3 ({formData.interests.length}/3)
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
                          disabled={isDisabled}
                          className={`h-20 flex flex-col items-center gap-2 transition-all duration-200 ${
                            isSelected
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : isDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-emerald-50 hover:border-emerald-300"
                          }`}
                          onClick={() => handleInterestToggle(interest.value)}
                        >
                          <IconComponent className="h-5 w-5" />
                          <span className="text-xs text-center">{interest.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Helper Text */}
                <div className="text-center py-4">
                  <p className="text-sm text-gray-600">
                    This helps our AI create authentic photos
                  </p>
                </div>

                {/* Continue Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleContinue}
                    disabled={!isStep2Valid}
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-lg font-medium transition-all duration-200"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}