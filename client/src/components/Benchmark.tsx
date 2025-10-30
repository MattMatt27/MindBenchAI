import { useNavigate } from "react-router-dom";
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart3, MessageSquare, Lightbulb, ChevronRight } from 'lucide-react';

export default function Benchmark() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-gray-900 mb-6 text-5xl font-bold">MindBench.ai</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            A comprehensive framework for evaluating and comparing AI models and tools in mental health
            applications. Discover technical capabilities, performance metrics, and communication dynamics
            across the AI landscape.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Profile Section */}
        <section>
          <div className="mb-10">
            <h2 className="text-gray-900 text-3xl mb-3 font-semibold">Profile</h2>
            <p className="text-gray-600">
              Explore detailed AI model capabilities, specifications, and communication patterns
            </p>
          </div>

          <div className="grid gap-6">
            {/* Technical Profile Card */}
            <Card className="p-8 hover:shadow-lg transition-shadow border-2 border-gray-100">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1 text-xl font-semibold">Technical Profile</h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Core Features
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Explore detailed technical specifications, platform support, pricing, and
                    compliance information for AI tools and base models.
                  </p>

                  <Button className="gap-2" onClick={() => navigate("/technical_profile")}>
                    Technical Profile
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="hidden md:flex flex-col gap-3 text-sm">
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Platform Support
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Pricing Models
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Compliance
                  </div>
                </div>
              </div>
            </Card>

            {/* Communication Dynamics Card */}
            <Card className="p-8 hover:shadow-lg transition-shadow border-2 border-gray-100">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1 text-xl font-semibold">Communication Dynamics</h3>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        Interaction Analysis
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Analyze how AI models communicate, their conversation patterns, and
                    interpersonal interaction capabilities.
                  </p>

                  <Button className="gap-2" onClick={() => navigate("/conversational_profile")}>
                    Conversation Profile
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="hidden md:flex flex-col gap-3 text-sm">
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Conversation Patterns
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Empathy Metrics
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Response Style
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Performance Section */}
        <section>
          <div className="mb-10">
            <h2 className="text-gray-900 text-3xl mb-3 font-semibold">Performance</h2>
            <p className="text-gray-600">
              Compare metrics, accuracy scores, and reasoning capabilities across different AI models
            </p>
          </div>

          <div className="grid gap-6">
            {/* Benchmarking Card */}
            <Card className="p-8 hover:shadow-lg transition-shadow border-2 border-gray-100">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1 text-xl font-semibold">Benchmarking</h3>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        Performance Metrics
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Compare performance metrics, accuracy scores, and standardized benchmark
                    results across different AI models and configurations.
                  </p>

                  <Button className="gap-2" onClick={() => navigate("/leaderboard")}>
                    Leaderboard
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="hidden md:flex flex-col gap-3 text-sm">
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Accuracy Scores
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Response Time
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Model Rankings
                  </div>
                </div>
              </div>
            </Card>

            {/* Reasoning Card */}
            <Card className="p-8 hover:shadow-lg transition-shadow border-2 border-gray-100 relative overflow-hidden">
              <div className="flex items-start justify-between gap-6 opacity-75">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1 text-xl font-semibold">Reasoning</h3>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        Cognitive Analysis
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Evaluate logical reasoning capabilities, problem-solving approaches, and
                    cognitive processing patterns in AI systems.
                  </p>

                  <Button className="gap-2" disabled>
                    Coming Soon
                  </Button>
                </div>

                <div className="hidden md:flex flex-col gap-3 text-sm">
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Logic Tests
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Problem Solving
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
                    Pattern Recognition
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}