"use client"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ArrowLeft, TrendingUp, Target, Clock, Video, Play, AlertTriangle, Shield } from "lucide-react"
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

interface FamilyDashboardProps {
  selectedMember?: any
  onBack?: () => void
}

export default function FamilyDashboard({ selectedMember, onBack }: FamilyDashboardProps) {
  const member = selectedMember || {
    name: "Sarah (Daughter)",
    email: "sarah@example.com",
    age: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const memberStats = {
    productivityScore: 72,
    dailyGoal: 120,
    dailyProgress: 85,
    todayWatchTime: "2h 15m",
    weeklyWatchTime: "14h 30m",
    videosWatched: 28,
    streakDays: 8,
  }

  const categoryData = [
    { name: "Educational", value: 55, color: "#10b981" },
    { name: "Entertainment", value: 25, color: "#f59e0b" },
    { name: "Gaming", value: 12, color: "#8b5cf6" },
    { name: "Music", value: 5, color: "#ef4444" },
    { name: "Kids Content", value: 3, color: "#3b82f6" },
  ]

  const weeklyData = [
    { day: "Mon", educational: 90, entertainment: 45, gaming: 20 },
    { day: "Tue", educational: 75, entertainment: 60, gaming: 30 },
    { day: "Wed", educational: 110, entertainment: 40, gaming: 15 },
    { day: "Thu", educational: 85, entertainment: 50, gaming: 25 },
    { day: "Fri", educational: 65, entertainment: 80, gaming: 40 },
    { day: "Sat", educational: 45, entertainment: 120, gaming: 60 },
    { day: "Sun", educational: 70, entertainment: 90, gaming: 35 },
  ]

  const recentVideos = [
    {
      title: "Math for Kids: Fractions Made Easy",
      channel: "Kids Learning Hub",
      category: "Educational",
      duration: "12:30",
      ageRating: "All Ages",
      timestamp: "1 hour ago",
    },
    {
      title: "Minecraft Building Tutorial",
      channel: "Gaming Kids",
      category: "Gaming",
      duration: "18:45",
      ageRating: "7+",
      timestamp: "2 hours ago",
    },
    {
      title: "Science Experiments for Children",
      channel: "Fun Science",
      category: "Educational",
      duration: "15:20",
      ageRating: "All Ages",
      timestamp: "3 hours ago",
    },
  ]

  const alerts = [
    {
      type: "warning",
      message: "Exceeded entertainment limit by 15 minutes today",
      timestamp: "2 hours ago",
    },
    {
      type: "success",
      message: "Achieved educational goal for 3 consecutive days",
      timestamp: "1 day ago",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Parental Control
        </Button>
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={member.avatar || "/placeholder.svg"} />
            <AvatarFallback>{member.name.split(" ")[0][0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{member.name}</h1>
            <p className="text-gray-600">
              Age {member.age} • {member.email}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{memberStats.productivityScore}%</div>
            <p className="text-xs text-gray-600">+8% from last week</p>
            <Progress value={memberStats.productivityScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberStats.dailyProgress}m</div>
            <p className="text-xs text-gray-600">of {memberStats.dailyGoal}m educational content</p>
            <Progress value={(memberStats.dailyProgress / memberStats.dailyGoal) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos Watched</CardTitle>
            <Video className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberStats.videosWatched}</div>
            <p className="text-xs text-gray-600">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberStats.todayWatchTime}</div>
            <p className="text-xs text-gray-600">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    alert.type === "warning"
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-green-50 border border-green-200"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${alert.type === "warning" ? "bg-yellow-500" : "bg-green-500"}`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Viewing Trends</CardTitle>
            <CardDescription>Content consumption patterns over the past week</CardDescription>
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
                  <Area
                    type="monotone"
                    dataKey="gaming"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Distribution</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
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
            <div className="space-y-2">
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
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest videos watched by {member.name.split(" ")[0]}</CardDescription>
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
                          : video.category === "Gaming"
                            ? "bg-purple-100 text-purple-800"
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

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Parental Controls
          </CardTitle>
          <CardDescription>Manage {member.name.split(" ")[0]}'s viewing settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Daily Educational Goal</label>
                <div className="flex items-center gap-2">
                  <input type="range" min="30" max="240" value={memberStats.dailyGoal} className="flex-1" />
                  <span className="text-sm font-medium w-16">{memberStats.dailyGoal}m</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Entertainment Time</label>
                <div className="flex items-center gap-2">
                  <input type="range" min="15" max="120" defaultValue="60" className="flex-1" />
                  <span className="text-sm font-medium w-16">60m</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Content Restrictions</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Block 13+ content</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Require approval for new channels</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Bedtime restrictions (8 PM - 7 AM)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button>Save Changes</Button>
            <Button variant="outline">Reset to Defaults</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
