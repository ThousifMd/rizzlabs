"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, XCircle, Camera, User, Users } from "lucide-react";

interface PhotoGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartUpload: () => void;
}

export default function PhotoGuidelinesModal({ isOpen, onClose, onStartUpload }: PhotoGuidelinesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Camera className="h-6 w-6 text-[#FFD700]" />
            Photo Quality Guidelines
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Good Practices */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              What Makes Great Photos:
            </h3>
            <ul className="space-y-2 text-sm text-green-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Clear, well-lit face (natural lighting is best)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Single person in photo (no group shots)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Good resolution (not blurry or pixelated)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Natural expression and genuine smile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>No sunglasses or hats covering your face</span>
              </li>
            </ul>
          </div>

          {/* Bad Practices */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Avoid These:
            </h3>
            <ul className="space-y-2 text-sm text-red-600">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Group photos with other people</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Dark, blurry, or low-quality images</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Sunglasses, hats, or anything covering your face</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Heavy filters or over-edited photos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Screenshots or photos of photos</span>
              </li>
            </ul>
          </div>

          {/* Photo Types */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
              <User className="h-5 w-5" />
              Photo Types We Need:
            </h3>
            <ul className="space-y-2 text-sm text-blue-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>2-3 clear selfies (different angles)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>1-2 full body photos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Photos showing your personality and hobbies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Recent photos (within last 2 years)</span>
              </li>
            </ul>
          </div>

          {/* Visual Examples */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Examples:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-full h-32 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <p className="text-xs text-green-600 font-medium">✅ Good: Clear face, good lighting</p>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-red-100 rounded-lg flex items-center justify-center mb-2">
                  <XCircle className="h-16 w-16 text-red-500" />
                </div>
                <p className="text-xs text-red-600 font-medium">❌ Avoid: Group photo, faces covered</p>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-700 mb-3">💡 Pro Tips:</h3>
            <ul className="space-y-2 text-sm text-yellow-600">
              <li>• Use natural lighting near a window</li>
              <li>• Take photos at eye level, not from above or below</li>
              <li>• Smile naturally and show your personality</li>
              <li>• Include photos that show your interests and lifestyle</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button 
            onClick={onStartUpload} 
            className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
          >
            Got it, let's upload!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
