"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Play, BarChart3, Target, Shield, Star, Users, Zap, CheckCircle, ArrowRight, Quote } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import GoogleSignInButton from "./GoogleSignInButton"

interface HomePageProps {
  onSignUp: () => void
}

export default function HomePage({ onSignUp }: HomePageProps) {
  const features = [
    {
      icon: BarChart3,
      title: "Real-Time AI Classification",
      description:
        "Advanced AI instantly categorizes videos as Educational, Entertainment, Gaming, Music, News, or Vlogs with precise age ratings and content analysis.",
      color: "blue",
    },
    {
      icon: Target,
      title: "Smart Goal Tracking",
      description:
        "Set personalized productivity goals and receive intelligent nudges to maintain healthy viewing habits with detailed progress tracking.",
      color: "green",
    },
    {
      icon: Shield,
      title: "Parental Monitoring",
      description:
        "Comprehensive family account monitoring with detailed dashboards, content filtering, and real-time alerts for inappropriate content.",
      color: "purple",
    },
    {
      icon: Zap,
      title: "Instant Content Flagging",
      description:
        "AI-powered content analysis flags inappropriate material in real-time, protecting your family from harmful content automatically.",
      color: "red",
    },
    {
      icon: Users,
      title: "Family Dashboard",
      description:
        "Monitor multiple family members with individual dashboards, custom restrictions, and detailed analytics for each account.",
      color: "orange",
    },
    {
      icon: Star,
      title: "Achievement System",
      description:
        "Gamified experience with achievements, streaks, and rewards to motivate healthy viewing habits and educational content consumption.",
      color: "yellow",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent of 2",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "TaskMind has completely transformed how our family uses YouTube. My kids are now watching 70% more educational content, and I have peace of mind knowing they're protected from inappropriate material.",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "As someone who uses YouTube for learning, TaskMind helps me stay focused on educational content. The AI recommendations are spot-on, and I've increased my productivity by 40%.",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Educator",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "I recommend TaskMind to all my students' parents. The detailed analytics help families understand their digital habits and make positive changes together.",
    },
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individuals getting started",
      features: [
        "Up to 2 family accounts",
        "Basic AI content classification",
        "Weekly productivity reports",
        "Goal setting and tracking",
        "Basic flagged content detection",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Ideal for families who want advanced features",
      features: [
        "Unlimited family accounts",
        "Advanced AI content analysis",
        "Real-time alerts and notifications",
        "Custom content filters",
        "Detailed analytics and insights",
        "Priority customer support",
        "Achievement system",
        "Export data and reports",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For schools and organizations",
      features: [
        "Everything in Pro",
        "Bulk account management",
        "Custom integrations",
        "Advanced reporting",
        "Dedicated account manager",
        "Custom training sessions",
        "SLA guarantees",
      ],
      popular: false,
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "2M+", label: "Videos Analyzed" },
    { number: "85%", label: "Productivity Increase" },
    { number: "99.9%", label: "Content Accuracy" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TaskMind</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
              Reviews
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <GoogleSignInButton variant="ghost" className="hidden md:block" />
            <Button onClick={onSignUp}>Get Started Free</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            🚀 AI-Powered YouTube Productivity Assistant
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Transform Your YouTube Habits with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              AI Intelligence
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            TaskMind uses advanced AI to classify your YouTube content in real-time, helping you balance entertainment
            with educational growth. Monitor productivity, set goals, and make mindful viewing decisions for your entire
            family.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoogleSignInButton size="lg" className="px-8 py-3 text-lg">
              Sign in with Google
              <ArrowRight className="w-5 h-5 ml-2" />
            </GoogleSignInButton>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              Watch Demo
              <Play className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image/Demo */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-1">
            <div className="bg-white rounded-xl p-4">
              <img
                src="/placeholder.svg?height=600&width=1200"
                alt="TaskMind Dashboard Preview"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
            <Star className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Smarter YouTube Usage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive tools to help you and your family make the most of YouTube
              while staying safe and productive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div
                    className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mx-auto mb-6`}
                  >
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How TaskMind Works</h2>
            <p className="text-xl text-gray-600">Get started in minutes with our simple 3-step process</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect Your Account</h3>
              <p className="text-gray-600">
                Securely connect your Google account to start analyzing your YouTube viewing habits immediately.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Set Your Goals</h3>
              <p className="text-gray-600">
                Define your productivity goals and content preferences. Add family members for comprehensive monitoring.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Track & Improve</h3>
              <p className="text-gray-600">
                Monitor your progress with detailed analytics and receive AI-powered recommendations for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of families who have transformed their YouTube experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-blue-600 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that's right for you and your family</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`border-0 shadow-lg relative ${plan.popular ? "ring-2 ring-blue-600" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period !== "contact us" && <span className="text-gray-600">/{plan.period}</span>}
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={onSignUp}
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your YouTube Experience?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of families who have already improved their digital wellness with TaskMind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={onSignUp} className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-blue-100 text-sm mt-4">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">TaskMind</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered YouTube productivity assistant helping families make smarter viewing choices.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Facebook
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TaskMind. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
