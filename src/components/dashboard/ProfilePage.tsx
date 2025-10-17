"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Camera, Edit, Save, X, Target, TrendingUp, Clock, Video } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Maaz",
    email: "mmaazz4339@gmail.com",
    age: 24,
    location: "Pakistan",
    joinDate: "August 2024",
    bio: "Computer Science student passionate about AI and web development. Love learning new technologies through YouTube tutorials and building innovative projects!",
    goals: ["Master React & Node.js", "Learn AI/ML concepts", "Build full-stack applications", "Improve coding productivity"],
    preferences: {
      dailyGoal: 240,
      maxEntertainment: 90,
      notifications: true,
      weeklyReports: true,
    },
  })

  const stats = {
    totalWatchTime: "10h 46m",
    videosWatched: 35,
    productivityScore: 3,
    streakDays: 7,
    educationalHours: "2h 15m",
    achievedGoals: 12,
  }

  const achievements = [
    { name: "YouTube Explorer", description: "Watched 35+ videos this week", icon: "🔥", earned: true },
    { name: "Music Lover", description: "Listened to 51% music content", icon: "🎵", earned: true },
    { name: "Entertainment Buff", description: "Enjoyed 48% entertainment videos", icon: "🎬", earned: true },
    { name: "Learning Beginner", description: "Started educational content journey", icon: "📚", earned: true },
    { name: "Productivity Master", description: "Maintained consistent watch patterns", icon: "🎯", earned: false },
    { name: "Goal Crusher", description: "Achieve 20 daily goals", icon: "💪", earned: false },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // In a real app, this would save to backend
    console.log("Profile saved:", profileData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset any changes
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="text-2xl">MZ</AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  {isEditing ? (
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="text-2xl font-bold mb-2"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  )}
                  <p className="text-gray-600">{profileData.email}</p>
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline" size="sm">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.productivityScore}%</div>
                  <div className="text-sm text-gray-600">Productivity Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.streakDays}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.videosWatched}</div>
                  <div className="text-sm text-gray-600">Videos Watched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.totalWatchTime}</div>
                  <div className="text-sm text-gray-600">Total Watch Time</div>
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
              ) : (
                <p className="text-gray-700">{profileData.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              {isEditing ? (
                <Input
                  type="number"
                  value={profileData.age}
                  onChange={(e) => setProfileData({ ...profileData, age: Number.parseInt(e.target.value) })}
                />
              ) : (
                <p className="text-gray-700">{profileData.age} years old</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              {isEditing ? (
                <Input
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                />
              ) : (
                <p className="text-gray-700">{profileData.location}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Member Since</label>
              <p className="text-gray-700">{profileData.joinDate}</p>
            </div>
          </CardContent>
        </Card>

        {/* Goals & Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Goals & Preferences</CardTitle>
            <CardDescription>Your productivity settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Daily Educational Goal</label>
              {isEditing ? (
                <Input
                  type="number"
                  value={profileData.preferences.dailyGoal}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      preferences: { ...profileData.preferences, dailyGoal: Number.parseInt(e.target.value) },
                    })
                  }
                />
              ) : (
                <p className="text-gray-700">{profileData.preferences.dailyGoal} minutes</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Entertainment Time</label>
              {isEditing ? (
                <Input
                  type="number"
                  value={profileData.preferences.maxEntertainment}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      preferences: { ...profileData.preferences, maxEntertainment: Number.parseInt(e.target.value) },
                    })
                  }
                />
              ) : (
                <p className="text-gray-700">{profileData.preferences.maxEntertainment} minutes</p>
              )}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Current Goals</h4>
              {profileData.goals.map((goal, index) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-2">
                  {goal}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Your productivity milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.earned ? "text-green-800" : "text-gray-600"}`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-sm ${achievement.earned ? "text-green-600" : "text-gray-500"}`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <Badge variant="default" className="bg-green-600">
                    Earned
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Statistics</CardTitle>
          <CardDescription>Your comprehensive YouTube analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{stats.productivityScore}%</div>
              <div className="text-sm text-gray-600">Average Productivity</div>
              <Progress value={stats.productivityScore} className="mt-2" />
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{stats.achievedGoals}</div>
              <div className="text-sm text-gray-600">Goals Achieved</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Video className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{stats.educationalHours}</div>
              <div className="text-sm text-gray-600">Educational Content</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{stats.totalWatchTime}</div>
              <div className="text-sm text-gray-600">Total Watch Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
