"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Shield,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  TrendingUp,
  Target,
  Clock,
  Video,
  Play,
  MoreHorizontal,
  Plus,
  Flag,
  ExternalLink,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample data
const categoryData = [
  { name: "Educational", value: 45, color: "#10b981" },
  { name: "Entertainment", value: 30, color: "#f59e0b" },
  { name: "Gaming", value: 15, color: "#8b5cf6" },
  { name: "Music", value: 5, color: "#ef4444" },
  { name: "News", value: 3, color: "#3b82f6" },
  { name: "Vlogs", value: 2, color: "#f97316" },
]

const weeklyData = [
  { day: "Mon", educational: 120, entertainment: 80, gaming: 30 },
  { day: "Tue", educational: 90, entertainment: 120, gaming: 45 },
  { day: "Wed", educational: 150, entertainment: 60, gaming: 20 },
  { day: "Thu", educational: 110, entertainment: 90, gaming: 35 },
  { day: "Fri", educational: 80, entertainment: 140, gaming: 60 },
  { day: "Sat", educational: 60, entertainment: 180, gaming: 90 },
  { day: "Sun", educational: 100, entertainment: 160, gaming: 70 },
]

const recentVideos = [
  {
    title: "Machine Learning Fundamentals",
    channel: "Tech Academy",
    category: "Educational",
    duration: "15:30",
    ageRating: "All Ages",
    timestamp: "2 hours ago",
  },
  {
    title: "React Best Practices 2024",
    channel: "Dev Channel",
    category: "Educational",
    duration: "22:15",
    ageRating: "All Ages",
    timestamp: "3 hours ago",
  },
  {
    title: "Funny Cat Compilation",
    channel: "Pet Videos",
    category: "Entertainment",
    duration: "8:45",
    ageRating: "All Ages",
    timestamp: "4 hours ago",
  },
]

const familyAccounts = [
  {
    name: "Sarah (Daughter)",
    email: "sarah@example.com",
    age: 12,
    productivityScore: 72,
    todayWatchTime: "2h 15m",
    status: "Good",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Mike (Son)",
    email: "mike@example.com",
    age: 16,
    productivityScore: 58,
    todayWatchTime: "3h 45m",
    status: "Needs Attention",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const flaggedVideos = [
  {
    id: "1",
    title: "Mature Gaming Content - Violence and Strong Language",
    channel: "GameZone Pro",
    description:
      "This video contains explicit violence, strong language, and mature themes not suitable for younger audiences.",
    flagReason:
      "Contains explicit violence, strong language (F-word used 15+ times), mature themes, and graphic content",
    ageRating: "18+",
    duration: "25:43",
    timestamp: "1 hour ago",
    videoUrl: "https://youtube.com/watch?v=example1",
    thumbnail: "/placeholder.svg?height=90&width=120",
    severity: "high",
  },
  {
    id: "2",
    title: "Adult Comedy Special - Explicit Content Warning",
    channel: "Comedy Central",
    description: "Stand-up comedy special with adult humor, sexual references, and strong language throughout.",
    flagReason: "Contains sexual references, adult humor, profanity, and content inappropriate for minors",
    ageRating: "18+",
    duration: "58:12",
    timestamp: "3 hours ago",
    videoUrl: "https://youtube.com/watch?v=example2",
    thumbnail: "/placeholder.svg?height=90&width=120",
    severity: "medium",
  },
  {
    id: "3",
    title: "Horror Movie Review - Disturbing Scenes Discussion",
    channel: "Horror Hub",
    description:
      "Detailed review of horror movie including discussion of disturbing scenes, violence, and psychological themes.",
    flagReason:
      "Discusses graphic violence, disturbing imagery, psychological horror themes, and contains mature content",
    ageRating: "18+",
    duration: "18:30",
    timestamp: "5 hours ago",
    videoUrl: "https://youtube.com/watch?v=example3",
    thumbnail: "/placeholder.svg?height=90&width=120",
    severity: "medium",
  },
  {
    id: "4",
    title: "Uncensored Documentary - Real Crime Footage",
    channel: "True Crime Docs",
    description:
      "Documentary featuring real crime scene footage, victim interviews, and graphic descriptions of violence.",
    flagReason:
      "Contains real crime footage, graphic descriptions of violence, disturbing content, and mature subject matter",
    ageRating: "18+",
    duration: "42:15",
    timestamp: "1 day ago",
    videoUrl: "https://youtube.com/watch?v=example4",
    thumbnail: "/placeholder.svg?height=90&width=120",
    severity: "high",
  },
]

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("main")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const productivityScore = 68
  const dailyGoal = 180
  const dailyProgress = 120

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && <span className="text-xl font-bold text-gray-900">TaskMind</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("main")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "main" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            {sidebarOpen && <span>Main</span>}
          </button>

          <button
            onClick={() => setActiveTab("parental")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "parental" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Shield className="w-5 h-5" />
            {sidebarOpen && <span>Parental Control</span>}
          </button>

          <button
            onClick={() => setActiveTab("flagged")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "flagged" ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Flag className="w-5 h-5" />
            {sidebarOpen && (
              <div className="flex items-center justify-between w-full">
                <span>Flagged Videos</span>
                {flaggedVideos.length > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {flaggedVideos.length}
                  </Badge>
                )}
              </div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span>Settings</span>}
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeTab === "main" && "Dashboard"}
                  {activeTab === "parental" && "Parental Control"}
                  {activeTab === "flagged" && "Flagged Videos"}
                  {activeTab === "settings" && "Settings"}
                </h1>
                <p className="text-gray-600 text-sm">
                  {activeTab === "main" && "Your YouTube productivity insights"}
                  {activeTab === "parental" && "Monitor family accounts"}
                  {activeTab === "flagged" && "Review AI-flagged inappropriate content"}
                  {activeTab === "settings" && "Manage your account and preferences"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "main" && (
            <MainContent productivityScore={productivityScore} dailyGoal={dailyGoal} dailyProgress={dailyProgress} />
          )}
          {activeTab === "parental" && <ParentalControl />}
          {activeTab === "flagged" && <FlaggedVideos />}
          {activeTab === "settings" && <SettingsContent />}
        </main>
      </div>
    </div>
  )
}

function FlaggedVideos() {
  const [hiddenVideos, setHiddenVideos] = useState<string[]>([])

  const handleHideVideo = (videoId: string) => {
    setHiddenVideos([...hiddenVideos, videoId])
  }

  const handleMarkAsSafe = (videoId: string) => {
    // In a real app, this would update the backend
    console.log(`Marking video ${videoId} as safe`)
    setHiddenVideos([...hiddenVideos, videoId])
  }

  const visibleVideos = flaggedVideos.filter((video) => !hiddenVideos.includes(video.id))

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-orange-200 bg-orange-50"
      default:
        return "border-yellow-200 bg-yellow-50"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            High Risk
          </Badge>
        )
      case "medium":
        return <Badge className="text-xs bg-orange-100 text-orange-800">Medium Risk</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            Low Risk
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Flagged Videos ({visibleVideos.length})
          </h2>
          <p className="text-gray-600">AI-detected inappropriate content requiring review</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Auto-flagged by AI
          </Badge>
        </div>
      </div>

      {visibleVideos.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flag className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Flagged Videos</h3>
            <p className="text-gray-600">Great! No inappropriate content has been detected recently.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {visibleVideos.map((video) => (
            <Card key={video.id} className={`border-l-4 ${getSeverityColor(video.severity)}`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Video Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 text-center mt-1">{video.duration}</div>
                  </div>

                  {/* Video Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{video.channel}</p>
                        <div className="flex items-center gap-2 mb-2">
                          {getSeverityBadge(video.severity)}
                          <Badge variant="outline" className="text-xs bg-red-100 text-red-800">
                            {video.ageRating}
                          </Badge>
                          <span className="text-xs text-gray-500">{video.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-3 rounded-lg border">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Video Description:</h4>
                      <p className="text-sm text-gray-700 mb-2">{video.description}</p>
                    </div>

                    {/* Flag Reason */}
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <h4 className="text-sm font-medium text-red-900 mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        Why this was flagged:
                      </h4>
                      <p className="text-sm text-red-800">{video.flagReason}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(video.videoUrl, "_blank")}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Video
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsSafe(video.id)}
                        className="flex items-center gap-2 text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <Eye className="w-4 h-4" />
                        Mark as Safe
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleHideVideo(video.id)}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <EyeOff className="w-4 h-4" />
                        Hide
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Report False Flag</DropdownMenuItem>
                          <DropdownMenuItem>Block Channel</DropdownMenuItem>
                          <DropdownMenuItem>Add to Whitelist</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {flaggedVideos.filter((v) => v.severity === "high").length}
            </div>
            <p className="text-sm text-gray-600">High Risk Videos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {flaggedVideos.filter((v) => v.severity === "medium").length}
            </div>
            <p className="text-sm text-gray-600">Medium Risk Videos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{hiddenVideos.length}</div>
            <p className="text-sm text-gray-600">Hidden/Resolved</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MainContent({
  productivityScore,
  dailyGoal,
  dailyProgress,
}: { productivityScore: number; dailyGoal: number; dailyProgress: number }) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{productivityScore}%</div>
            <p className="text-xs text-gray-600">+5% from last week</p>
            <Progress value={productivityScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyProgress}m</div>
            <p className="text-xs text-gray-600">of {dailyGoal}m educational content</p>
            <Progress value={(dailyProgress / dailyGoal) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos Watched</CardTitle>
            <Video className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-gray-600">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5h</div>
            <p className="text-xs text-gray-600">Total this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Content Distribution</CardTitle>
            <CardDescription>Breakdown of your YouTube consumption by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals & Insights</CardTitle>
            <CardDescription>Your productivity goals and AI recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium text-sm mb-3">Today's Goals</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Educational Content</span>
                    <span>120/180 min</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Limit Entertainment</span>
                    <span>45/60 min</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-3">AI Recommendations</h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    🎯 You're 60 minutes away from your educational goal. Consider watching a programming tutorial!
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✨ Great job! You've maintained a 68% productivity score this week.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Viewing Trends</CardTitle>
          <CardDescription>Your content consumption patterns over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="educational"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.8}
                />
                <Area
                  type="monotone"
                  dataKey="entertainment"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.8}
                />
                <Area type="monotone" dataKey="gaming" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest YouTube video consumption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentVideos.map((video, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{video.title}</h4>
                  <p className="text-xs text-gray-600">{video.channel}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        video.category === "Educational"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {video.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {video.ageRating}
                    </Badge>
                    <span className="text-xs text-gray-500">{video.duration}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{video.timestamp}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ParentalControl() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Family Accounts</h2>
          <p className="text-gray-600">Monitor and manage family members' YouTube usage</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {familyAccounts.map((account, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={account.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{account.name.split(" ")[0][0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{account.name}</h3>
                    <p className="text-sm text-gray-600">Age {account.age}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                    <DropdownMenuItem>Remove Account</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Productivity Score</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{account.productivityScore}%</span>
                  <Badge variant={account.status === "Good" ? "default" : "destructive"} className="text-xs">
                    {account.status}
                  </Badge>
                </div>
              </div>
              <Progress value={account.productivityScore} />

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Today's Watch Time</span>
                <span className="font-medium">{account.todayWatchTime}</span>
              </div>

              <Button variant="outline" className="w-full">
                View Full Dashboard
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SettingsContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>Manage connected accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Add Google Account
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Remove Account
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Manage your subscription plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-900">Free Plan</p>
              <p className="text-sm text-blue-700">Basic analytics and monitoring</p>
            </div>
            <Button className="w-full">Upgrade to Pro</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Edit your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input defaultValue="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input defaultValue="28" type="number" />
            </div>
            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
