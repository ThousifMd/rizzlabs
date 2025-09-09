"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react";

export default function PrivacyPage() {
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
                        <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                            <Shield className="h-8 w-8 text-[#d4ae36]" />
                            Privacy Policy
                        </CardTitle>
                        <p className="text-gray-300">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6 text-gray-300">
                        <div className="bg-[#d4ae36]/10 border border-[#d4ae36]/20 rounded-lg p-4">
                            <p className="text-center text-[#d4ae36] font-semibold">
                                🔒 Your privacy is our priority. We protect your data with industry-standard security measures.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                                <Eye className="h-5 w-5 text-[#d4ae36]" />
                                1. Information We Collect
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="font-semibold text-white">Personal Information:</h3>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Name and email address</li>
                                        <li>Phone number (optional)</li>
                                        <li>Age range and dating preferences</li>
                                        <li>Photos you upload for enhancement</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Usage Information:</h3>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Service usage patterns</li>
                                        <li>Device and browser information</li>
                                        <li>IP address and location data</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                                <Database className="h-5 w-5 text-[#d4ae36]" />
                                2. How We Use Your Information
                            </h2>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Process and enhance your photos using AI technology</li>
                                <li>Optimize your dating profile based on your preferences</li>
                                <li>Provide customer support and service updates</li>
                                <li>Improve our AI algorithms and service quality</li>
                                <li>Send you important service notifications</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                                <Lock className="h-5 w-5 text-[#d4ae36]" />
                                3. Data Security
                            </h2>
                            <p>
                                We implement industry-standard security measures to protect your personal information:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                <li>End-to-end encryption for data transmission</li>
                                <li>Secure cloud storage with access controls</li>
                                <li>Regular security audits and updates</li>
                                <li>Limited access to personal data by authorized personnel only</li>
                                <li>Automatic deletion of photos after processing (unless you request retention)</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">4. Photo Processing and Storage</h2>
                            <div className="space-y-3">
                                <p>
                                    <strong className="text-white">Photo Processing:</strong> Your photos are processed using secure AI algorithms. We do not share your photos with third parties.
                                </p>
                                <p>
                                    <strong className="text-white">Storage Duration:</strong> Photos are automatically deleted from our servers after 30 days unless you specifically request longer retention.
                                </p>
                                <p>
                                    <strong className="text-white">Data Retention:</strong> Your enhanced photos and profile data are stored securely and can be accessed by you at any time.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">5. Information Sharing</h2>
                            <p>We do not sell, trade, or rent your personal information to third parties. We may share information only in these limited circumstances:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                <li>With your explicit consent</li>
                                <li>To comply with legal requirements or court orders</li>
                                <li>To protect our rights, property, or safety</li>
                                <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
                            <p>You have the following rights regarding your personal information:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                                <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information</li>
                                <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data</li>
                                <li><strong className="text-white">Portability:</strong> Export your data in a machine-readable format</li>
                                <li><strong className="text-white">Opt-out:</strong> Unsubscribe from marketing communications</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">7. Cookies and Tracking</h2>
                            <p>
                                We use cookies and similar technologies to improve your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">8. Third-Party Services</h2>
                            <p>
                                Our service may integrate with third-party services (payment processors, analytics tools). These services have their own privacy policies, and we encourage you to review them.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">9. Children's Privacy</h2>
                            <p>
                                Our service is not intended for users under 18 years of age. We do not knowingly collect personal information from children under 18.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">10. International Users</h2>
                            <p>
                                If you are accessing our service from outside the United States, please note that your information may be transferred to, stored, and processed in the United States where our servers are located.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">11. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any material changes via email or through the service. Your continued use after changes constitutes acceptance of the updated policy.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">12. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy or want to exercise your rights, please contact us:
                                <br />
                                <br />
                                <strong className="text-white">Email:</strong> privacy@matchlens.ai
                                <br />
                                <strong className="text-white">Support:</strong> support@matchlens.ai
                            </p>
                        </div>

                        <div className="bg-[#d4ae36]/10 border border-[#d4ae36]/20 rounded-lg p-4 mt-8">
                            <p className="text-center text-[#d4ae36] font-semibold">
                                🛡️ We're committed to protecting your privacy and ensuring your data is secure.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
