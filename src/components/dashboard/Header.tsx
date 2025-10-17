"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Menu, Bell, Search } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

interface HeaderProps {
  activeTab: string
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setActiveTab?: (tab: string) => void
}

export default function Header({ activeTab, sidebarOpen, setSidebarOpen, setActiveTab }: HeaderProps) {
  const { user } = useAuth()
  const getHeaderContent = () => {
    switch (activeTab) {
      case "main":
        return {
          title: "Dashboard",
          description: "Your YouTube productivity insights",
        }
      case "parental":
        return {
          title: "Parental Control",
          description: "Monitor family accounts",
        }
      case "flagged":
        return {
          title: "Flagged Videos",
          description: "Review AI-flagged inappropriate content",
        }
      case "profile":
        return {
          title: "Profile",
          description: "Manage your personal information and preferences",
        }
      case "notifications":
        return {
          title: "Notifications",
          description: "View your alerts and updates",
        }
      case "family-dashboard":
        return {
          title: "Family Dashboard",
          description: "Detailed view of family member activity",
        }
      case "settings":
        return {
          title: "Settings",
          description: "Manage your account and preferences",
        }
      default:
        return {
          title: "Dashboard",
          description: "Your YouTube productivity insights",
        }
    }
  }

  const { title, description } = getHeaderContent()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search..." className="pl-10 w-64" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab && setActiveTab("notifications")}
            className="relative"
          >
            <Bell className="w-4 h-4" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
            >
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setActiveTab && setActiveTab("profile")}>
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  )
}
