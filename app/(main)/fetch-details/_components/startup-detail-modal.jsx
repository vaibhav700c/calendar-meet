"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Phone, 
  ExternalLink, 
  Users, 
  DollarSign, 
  Target, 
  Lightbulb,
  FileText,
  Calendar,
  Building2,
  Download
} from "lucide-react";

export default function StartupDetailModal({ startup, trigger, formatCurrency, formatDate }) {
  const [isOpen, setIsOpen] = useState(false);

  const getTimelineMoment = (meettime) => {
    if (!meettime) return null;
    const meetDate = new Date(meettime);
    return meetDate.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold gradient-title">
              {startup.startupname || "Startup Details"}
            </span>
            <div className="flex items-center space-x-2">
              <Badge variant={startup.mentorship ? "default" : "secondary"}>
                {startup.mentorship ? "Seeking Mentorship" : "No Mentorship"}
              </Badge>
              <Badge variant="outline">{startup.stage || "Unknown Stage"}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="team">Team & Funding</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Founder Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Founder Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-lg">{startup.fullname || "N/A"}</h4>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                        <a href={`mailto:${startup.email}`} className="text-blue-600 hover:underline">
                          {startup.email}
                        </a>
                      </div>
                      {startup.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-gray-500" />
                          <a href={`tel:${startup.phone}`} className="text-blue-600 hover:underline">
                            {startup.phone}
                          </a>
                        </div>
                      )}
                      {startup.linkedin && (
                        <div className="flex items-center text-sm">
                          <ExternalLink className="w-4 h-4 mr-2 text-gray-500" />
                          <a 
                            href={startup.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Application Date:</span>
                      <span className="font-medium">{formatDate(startup.created_at)}</span>
                    </div>
                    {startup.meettime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Meeting Time:</span>
                        <span className="font-medium text-green-600">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {getTimelineMoment(startup.meettime)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">{formatDate(startup.updated_at)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Startup Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  About {startup.startupname}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {startup.description || "No description provided."}
                </p>
                {startup.pitch && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-blue-900 mb-2">Elevator Pitch</h5>
                    <p className="text-blue-800 italic">&ldquo;{startup.pitch}&rdquo;</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            {/* Problem & Solution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Problem & Solution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-semibold text-red-600 mb-2">Problem Statement</h5>
                  <p className="text-gray-700">{startup.problem || "Not specified"}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-green-600 mb-2">Inspiration</h5>
                  <p className="text-gray-700">{startup.inspiration || "Not specified"}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-purple-600 mb-2">Differentiation</h5>
                  <p className="text-gray-700">{startup.differentiation || "Not specified"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Market & Competition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Market Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-semibold text-blue-600 mb-2">Target Audience</h5>
                  <p className="text-gray-700">{startup.audience || "Not specified"}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-orange-600 mb-2">Competitors</h5>
                  <p className="text-gray-700 whitespace-pre-line">{startup.competitors || "Not specified"}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-green-600 mb-2">Monetization Strategy</h5>
                  <p className="text-gray-700">{startup.monetization || "Not specified"}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            {/* Team Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Team Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Team Size</h5>
                    <p className="text-2xl font-bold text-blue-600">
                      {startup.teamsize ? `${startup.teamsize} member${startup.teamsize !== 1 ? 's' : ''}` : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Team Skills</h5>
                    <p className="text-gray-700 whitespace-pre-line">{startup.teamskills || "Not specified"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funding Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Funding Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">Funding Amount Sought</h5>
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(startup.fundingamount)}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Current Stage</h5>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {startup.stage || "Not specified"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">How Funding Will Be Used</h5>
                  <p className="text-gray-700 whitespace-pre-line">{startup.fundinguse || "Not specified"}</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Why Fund This Startup</h5>
                  <p className="text-gray-700">{startup.whyfund || "Not specified"}</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Previous Grants/Funding</h5>
                  <p className="text-gray-700">{startup.previousgrants || "Not specified"}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {/* Pitch Deck */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Documents & Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {startup.pitch_deck ? (
                  <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">📊 Pitch Deck Available</h5>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>File:</strong> {startup.pitch_deck.name || "pitch-deck.pdf"}
                        </p>
                        {startup.pitch_deck.uploaded_at && (
                          <p className="text-sm text-gray-600">
                            <strong>Uploaded:</strong> {formatDate(startup.pitch_deck.uploaded_at.$date?.$numberLong || startup.pitch_deck.uploaded_at)}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          variant="outline"
                          onClick={() => window.open(startup.pitch_deck.url, "_blank")}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Pitch Deck
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No pitch deck uploaded</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}