"use client"

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
import { TrendingUp, Target, Clock, Video, Play } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface MainContentProps {
  productivityScore: number
  dailyGoal: number
  dailyProgress: number
}

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

export default function MainContent({ productivityScore, dailyGoal, dailyProgress }: MainContentProps) {
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
