"use client"

import { LayoutDashboard, Shield, Settings, LogOut, Play, Flag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  sidebarOpen: boolean
}

const flaggedVideosCount = 4 // This would come from your data

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen }: SidebarProps) {
  const navItems = [
    {
      id: "main",
      label: "Main",
      icon: LayoutDashboard,
      color: "text-gray-600 hover:bg-gray-50",
      activeColor: "bg-blue-50 text-blue-600",
    },
    {
      id: "parental",
      label: "Parental Control",
      icon: Shield,
      color: "text-gray-600 hover:bg-gray-50",
      activeColor: "bg-blue-50 text-blue-600",
    },
    {
      id: "flagged",
      label: "Flagged Videos",
      icon: Flag,
      color: "text-gray-600 hover:bg-gray-50",
      activeColor: "bg-red-50 text-red-600",
      badge: flaggedVideosCount,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      color: "text-gray-600 hover:bg-gray-50",
      activeColor: "bg-blue-50 text-blue-600",
    },
  ]

  return (
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
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === item.id ? item.activeColor : item.color
            }`}
          >
            <item.icon className="w-5 h-5" />
            {sidebarOpen && (
              <div className="flex items-center justify-between w-full">
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}
