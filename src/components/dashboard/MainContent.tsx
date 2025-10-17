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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { useState, useEffect } from "react"
import { apiService } from "../../services/api"

interface MainContentProps {
  productivityScore: number
  dailyGoal: number
  dailyProgress: number
}

// Default data for fallback
const defaultCategoryData = [
  { name: "Educational", value: 45, color: "#10b981" },
  { name: "Entertainment", value: 30, color: "#f59e0b" },
  { name: "Gaming", value: 15, color: "#8b5cf6" },
  { name: "Music", value: 5, color: "#ef4444" },
  { name: "News", value: 3, color: "#3b82f6" },
  { name: "Vlogs", value: 2, color: "#f97316" },
];

const defaultWeeklyData = [
  { day: "Mon", educational: 120, entertainment: 80, gaming: 30 },
  { day: "Tue", educational: 90, entertainment: 120, gaming: 45 },
  { day: "Wed", educational: 150, entertainment: 60, gaming: 20 },
  { day: "Thu", educational: 110, entertainment: 90, gaming: 35 },
  { day: "Fri", educational: 80, entertainment: 140, gaming: 60 },
  { day: "Sat", educational: 60, entertainment: 180, gaming: 90 },
  { day: "Sun", educational: 100, entertainment: 160, gaming: 70 },
];

export default function MainContent({ productivityScore, dailyGoal, dailyProgress }: MainContentProps) {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentVideos, setRecentVideos] = useState([]);
  const [categoryData, setCategoryData] = useState(defaultCategoryData);
  const [weeklyData, setWeeklyData] = useState(defaultWeeklyData);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Try to fetch real analytics data first
        try {
          const analyticsData = await apiService.getDashboardAnalytics();
          setDashboardData(analyticsData.data);
          
          // Process category data for pie chart
          const categories = analyticsData.data?.today?.categories || {};
          const categoryChartData = Object.entries(categories).map(([name, value], index) => ({
            name,
            value: Math.round(value),
            color: defaultCategoryData[index]?.color || "#8884d8"
          }));
          setCategoryData(categoryChartData);
          
          // Process weekly data
          const weeklyAnalytics = analyticsData.data?.weekly?.daily || [];
          const weeklyChartData = weeklyAnalytics.map(day => ({
            day: day.day,
            educational: Math.round(day.categories?.Educational || 0),
            entertainment: Math.round(day.categories?.Entertainment || 0),
            gaming: Math.round(day.categories?.Gaming || 0)
          }));
          setWeeklyData(weeklyChartData);
        } catch (error) {
          console.log('Using mock data for analytics');
          // Fallback to mock data
          const mockAnalytics = await apiService.getMockAnalytics();
          if (mockAnalytics.data) {
            setDashboardData(mockAnalytics.data);
            setCategoryData(defaultCategoryData);
            setWeeklyData(defaultWeeklyData);
          }
        }

        // Try to fetch recent videos
        try {
          const videosData = await apiService.getRecentVideos(10);
          setRecentVideos(videosData.data?.videos || []);
        } catch (error) {
          console.log('Using mock data for recent videos');
          // Fallback to mock data
          const mockData = await apiService.getMockData();
          setRecentVideos(mockData.data?.watchHistory?.slice(0, 10) || []);
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate metrics from dashboard data
  const totalWatchTime = dashboardData?.today?.totalWatchTime || 0;
  const videosWatched = dashboardData?.today?.videosWatched || 0;
  const productivityScoreFromData = dashboardData?.today?.productivityScore || productivityScore;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

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
            <div className="text-2xl font-bold text-green-600">{productivityScoreFromData}%</div>
            <p className="text-xs text-gray-600">Based on educational content ratio</p>
            <Progress value={productivityScoreFromData} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Watch Time</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalWatchTime)}m</div>
            <p className="text-xs text-gray-600">Total watch time today</p>
            <Progress value={Math.min((totalWatchTime / 480) * 100, 100)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos Watched</CardTitle>
            <Video className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videosWatched}</div>
            <p className="text-xs text-gray-600">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Watch Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((dashboardData?.weekly?.totals?.totalWatchTime || 0) / 60)}h</div>
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
            {recentVideos.length > 0 ? recentVideos.map((video, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <a 
                    href={video.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-sm truncate hover:text-blue-600 hover:underline cursor-pointer"
                  >
                    {video.title}
                  </a>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        video.category === "Educational"
                          ? "bg-green-100 text-green-800"
                          : video.category === "Music"
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
                    <span className="text-xs text-gray-500">{Math.round(video.completionPercentage || 0)}% watched</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(video.timestamp).toLocaleDateString()}
                </span>
              </div>
            )) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No recent videos found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

