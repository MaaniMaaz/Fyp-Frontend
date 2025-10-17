"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, BarChart3, Target, Shield } from "lucide-react"

interface HomePageProps {
  onSignUp: () => void
}

export default function HomePage({ onSignUp }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TaskMind</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">About</Button>
            <Button onClick={onSignUp}>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            AI-Powered YouTube Productivity Assistant
          </Badge>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Transform Your YouTube Habits with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              AI Intelligence
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TaskMind uses advanced AI to classify your YouTube content in real-time, helping you balance entertainment
            with educational growth. Monitor productivity, set goals, and make mindful viewing decisions.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" onClick={onSignUp} className="px-8">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Classification</h3>
              <p className="text-gray-600">
                AI instantly categorizes videos as Educational, Entertainment, Gaming, Music, News, or Vlogs with age
                ratings.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Goal Tracking</h3>
              <p className="text-gray-600">
                Set personalized productivity goals and receive intelligent nudges to maintain healthy viewing habits.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Parental Monitoring</h3>
              <p className="text-gray-600">
                Monitor multiple accounts with comprehensive dashboards for family digital wellness management.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
