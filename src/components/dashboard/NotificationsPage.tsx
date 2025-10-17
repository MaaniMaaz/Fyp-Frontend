"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Bell, CheckCircle, AlertTriangle, Target, TrendingUp, Shield, Settings, Trash2 } from "lucide-react"

interface Notification {
  id: string
  type: "goal" | "alert" | "achievement" | "family" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "alert",
      title: "Bedtime Violation - Sarah",
      message: "Sarah watched 'Minecraft Tutorial' at 10:30 PM, violating her 8:00 PM bedtime restriction",
      timestamp: "30 minutes ago",
      read: false,
      priority: "high",
      actionUrl: "/parental",
    },
    {
      id: "2",
      type: "alert",
      title: "18+ Content Alert - Mike",
      message: "Mike (Age 16) watched 'Mature Gaming Content - Violence and Strong Language' which is rated 18+",
      timestamp: "1 hour ago",
      read: false,
      priority: "high",
      actionUrl: "/flagged",
    },
    {
      id: "3",
      type: "alert",
      title: "Flagged Video Alert - Sarah",
      message:
        "Sarah watched 'Horror Movie Review - Disturbing Scenes Discussion' which was flagged by AI for inappropriate content",
      timestamp: "2 hours ago",
      read: false,
      priority: "high",
      actionUrl: "/flagged",
    },
    {
      id: "4",
      type: "alert",
      title: "13+ Content Alert - Sarah",
      message:
        "Sarah (Age 12) watched 'Teen Drama Series Episode 5' which is rated 13+ and may not be suitable for her age",
      timestamp: "3 hours ago",
      read: true,
      priority: "medium",
      actionUrl: "/parental",
    },
    {
      id: "5",
      type: "alert",
      title: "Late Night Viewing - Mike",
      message: "Mike watched 'Gaming Stream Highlights' at 11:45 PM, past his 10:00 PM bedtime restriction",
      timestamp: "5 hours ago",
      read: true,
      priority: "medium",
      actionUrl: "/parental",
    },
    {
      id: "6",
      type: "goal",
      title: "Daily Goal Achieved! 🎉",
      message: "You've reached your 180-minute educational content goal for today",
      timestamp: "6 hours ago",
      read: false,
      priority: "medium",
    },
    {
      id: "7",
      type: "alert",
      title: "Multiple Violations - Mike",
      message:
        "Mike has watched 3 age-inappropriate videos today (2 x 18+, 1 x 13+). Consider reviewing parental controls.",
      timestamp: "8 hours ago",
      read: true,
      priority: "high",
      actionUrl: "/parental",
    },
    {
      id: "8",
      type: "family",
      title: "Sarah's Screen Time Alert",
      message: "Sarah has exceeded her daily entertainment limit by 30 minutes",
      timestamp: "1 day ago",
      read: true,
      priority: "medium",
      actionUrl: "/parental",
    },
    {
      id: "9",
      type: "alert",
      title: "Bedtime Pattern Alert - Sarah",
      message:
        "Sarah has violated bedtime restrictions 4 times this week. Consider adjusting settings or device access.",
      timestamp: "1 day ago",
      read: true,
      priority: "medium",
      actionUrl: "/parental",
    },
    {
      id: "10",
      type: "achievement",
      title: "New Achievement Unlocked!",
      message: "Learning Streak: 15 consecutive days of educational content",
      timestamp: "2 days ago",
      read: true,
      priority: "low",
    },
    {
      id: "11",
      type: "system",
      title: "Weekly Family Report Available",
      message: "Your family's productivity and safety report for this week is ready to view",
      timestamp: "3 days ago",
      read: true,
      priority: "low",
    },
  ])

  const [filter, setFilter] = useState<"all" | "unread" | "goal" | "alert" | "family">("all")

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "goal":
        return <Target className="w-5 h-5 text-blue-600" />
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "achievement":
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "family":
        return <Shield className="w-5 h-5 text-purple-600" />
      case "system":
        return <Settings className="w-5 h-5 text-gray-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      default:
        return "border-l-gray-300 bg-white"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true
    if (filter === "unread") return !notif.read
    return notif.type === filter
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </h2>
          <p className="text-gray-600">Stay updated with your productivity insights</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={markAllAsRead} variant="outline" size="sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All", count: notifications.length },
              { key: "unread", label: "Unread", count: unreadCount },
              { key: "goal", label: "Goals", count: notifications.filter((n) => n.type === "goal").length },
              { key: "alert", label: "Alerts", count: notifications.filter((n) => n.type === "alert").length },
              { key: "family", label: "Family", count: notifications.filter((n) => n.type === "family").length },
            ].map((filterOption) => (
              <Button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                variant={filter === filterOption.key ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
              >
                {filterOption.label}
                <Badge variant="secondary" className="text-xs">
                  {filterOption.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications</h3>
              <p className="text-gray-600">You're all caught up! No new notifications to show.</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-l-4 transition-all hover:shadow-md ${getPriorityColor(notification.priority)} ${
                !notification.read ? "ring-2 ring-blue-100" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">{notification.timestamp}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              notification.type === "alert"
                                ? "border-red-200 text-red-700"
                                : notification.type === "goal"
                                  ? "border-blue-200 text-blue-700"
                                  : notification.type === "family"
                                    ? "border-purple-200 text-purple-700"
                                    : "border-gray-200 text-gray-700"
                            }`}
                          >
                            {notification.type}
                          </Badge>
                          {!notification.read && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <Button
                            onClick={() => markAsRead(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          onClick={() => deleteNotification(notification.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
