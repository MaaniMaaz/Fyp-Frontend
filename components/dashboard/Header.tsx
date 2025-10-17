"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, Bell, Search } from "lucide-react"

interface HeaderProps {
  activeTab: string
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Header({ activeTab, sidebarOpen, setSidebarOpen }: HeaderProps) {
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
  )
}
