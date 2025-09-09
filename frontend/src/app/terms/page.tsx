"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: '#0E0E0F' }}>
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

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
                {/* Back Button */}
                <div className="mb-8">
                    <Button asChild variant="ghost" size="sm" className="text-white hover:text-white">
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Homepage
                        </Link>
                    </Button>
                </div>

                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold text-white">
                            Terms of Service
                        </CardTitle>
                        <p className="text-gray-300">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6 text-gray-300">
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using Matchlens AI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
                            <p>
                                Matchlens AI provides AI-powered photo enhancement and profile optimization services for dating applications. Our service uses artificial intelligence to enhance your photos and optimize your dating profile to improve your chances of getting matches.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h2>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>You must be at least 18 years old to use this service</li>
                                <li>You must provide accurate and truthful information</li>
                                <li>You are responsible for the photos you upload and must own the rights to them</li>
                                <li>You agree not to upload inappropriate, offensive, or illegal content</li>
                                <li>You will not use the service for any unlawful purpose</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">4. Photo and Content Usage</h2>
                            <p>
                                By uploading photos to our service, you grant us a limited license to process, enhance, and modify your images for the purpose of providing our services. We do not claim ownership of your original photos.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">5. Payment and Refunds</h2>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>All payments are processed securely through our payment partners</li>
                                <li>Refunds are available within 24 hours of purchase if no processing has begun</li>
                                <li>Once photo processing has started, refunds are not available</li>
                                <li>Prices are subject to change with notice</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
                            <p>
                                The enhanced photos created by our AI service are provided to you for personal use. You may not resell, redistribute, or use them for commercial purposes without our written permission.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
                            <p>
                                Matchlens AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">8. Service Availability</h2>
                            <p>
                                We strive to maintain high service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue the service at any time.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">9. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service. Continued use after changes constitutes acceptance of the new terms.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">10. Contact Information</h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact us at:
                                <br />
                                Email: support@matchlens.ai
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
