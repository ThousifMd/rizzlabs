"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface OnboardingData {
  name: string;
  age: string;
  datingGoal: string;
  currentMatches: string;
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

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    name: "",
    age: "",
    datingGoal: "",
    currentMatches: ""
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const isStep1Valid = formData.name.trim() !== "" && 
                       formData.age !== "" && 
                       formData.datingGoal !== "" && 
                       formData.currentMatches !== "";

  const handleContinue = () => {
    if (currentStep === 1 && isStep1Valid) {
      setIsCompleted(true);
    }
  };

  const handleDatingGoalSelect = (value: string) => {
    setFormData(prev => ({ ...prev, datingGoal: value }));
  };

  const handleMatchOptionSelect = (value: string) => {
    setFormData(prev => ({ ...prev, currentMatches: value }));
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Step 1 Complete!</h2>
              <p className="text-gray-600">
                Great! You've completed the first step of your onboarding journey.
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-emerald-700">
                  Steps 2-5 are coming soon. We'll notify you when they're ready!
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
      </div>
    </div>
  );
}