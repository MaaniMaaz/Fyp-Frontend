import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Calendar, Download, TrendingUp, TrendingDown, Target, Clock } from "lucide-react"

export default function AnalyticsPage() {
  const monthlyData = [
    { month: "Jan", productivity: 65, watchTime: 120, educational: 78 },
    { month: "Feb", productivity: 68, watchTime: 115, educational: 82 },
    { month: "Mar", productivity: 72, watchTime: 108, educational: 85 },
    { month: "Apr", productivity: 70, watchTime: 125, educational: 80 },
    { month: "May", productivity: 75, watchTime: 100, educational: 90 },
    { month: "Jun", productivity: 78, watchTime: 95, educational: 95 },
  ]

  const categoryTrends = [
    { category: "Educational", thisMonth: 45, lastMonth: 38, change: "+18%" },
    { category: "Entertainment", thisMonth: 30, lastMonth: 35, change: "-14%" },
    { category: "Gaming", thisMonth: 15, lastMonth: 18, change: "-17%" },
    { category: "Music", thisMonth: 5, lastMonth: 5, change: "0%" },
    { category: "News", thisMonth: 3, lastMonth: 2, change: "+50%" },
    { category: "Vlogs", thisMonth: 2, lastMonth: 2, change: "0%" },
  ]

  const insights = [
    {
      title: "Peak Learning Hours",
      value: "2-4 PM",
      description: "You're most productive during afternoon hours",
      trend: "up",
    },
    {
      title: "Favorite Educational Topics",
      value: "Technology, Science",
      description: "Your top learning categories this month",
      trend: "neutral",
    },
    {
      title: "Weekly Goal Achievement",
      value: "85%",
      description: "Consistent improvement in goal completion",
      trend: "up",
    },
    {
      title: "Average Session Length",
      value: "23 minutes",
      description: "Optimal attention span for learning content",
      trend: "down",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Advanced Analytics</h2>
          <p className="text-gray-600">Deep insights into your YouTube productivity patterns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 6 Months
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{insight.title}</h3>
                {insight.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : insight.trend === "down" ? (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                ) : (
                  <Target className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div className="text-2xl font-bold mb-1">{insight.value}</div>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>6-Month Productivity Trends</CardTitle>
          <CardDescription>Track your progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Productivity Score"
                />
                <Line type="monotone" dataKey="educational" stroke="#3b82f6" strokeWidth={2} name="Educational %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Content Category Analysis</CardTitle>
          <CardDescription>Month-over-month changes in viewing patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryTrends.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{category.category}</h4>
                    <p className="text-sm text-gray-600">{category.thisMonth}% this month</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      category.change.startsWith("+")
                        ? "default"
                        : category.change.startsWith("-")
                          ? "destructive"
                          : "secondary"
                    }
                    className="mb-1"
                  >
                    {category.change}
                  </Badge>
                  <p className="text-sm text-gray-600">vs last month</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Watch Time Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Watch Time Pattern</CardTitle>
            <CardDescription>When you're most active on YouTube</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { hour: "6AM", minutes: 5 },
                    { hour: "9AM", minutes: 15 },
                    { hour: "12PM", minutes: 25 },
                    { hour: "3PM", minutes: 45 },
                    { hour: "6PM", minutes: 35 },
                    { hour: "9PM", minutes: 20 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="minutes" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goal Achievement Rate</CardTitle>
            <CardDescription>Your consistency in meeting daily goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Goals Met", value: 85, color: "#10b981" },
                      { name: "Partially Met", value: 10, color: "#f59e0b" },
                      { name: "Goals Missed", value: 5, color: "#ef4444" },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[
                      { name: "Goals Met", value: 85, color: "#10b981" },
                      { name: "Partially Met", value: 10, color: "#f59e0b" },
                      { name: "Goals Missed", value: 5, color: "#ef4444" },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm">Goals Met</span>
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-sm">Partially Met</span>
                </div>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm">Goals Missed</span>
                </div>
                <span className="text-sm font-medium">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
