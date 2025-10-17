"use client"

import { useState } from "react"
import Sidebar from "./dashboard/Sidebar"
import Header from "./dashboard/Header"
import MainContent from "./dashboard/MainContent"
import ParentalControl from "./dashboard/ParentalControl"
import FlaggedVideos from "./dashboard/FlaggedVideos"
import SettingsContent from "./dashboard/SettingsContent"

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("main")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const productivityScore = 68
  const dailyGoal = 180
  const dailyProgress = 120

  const renderContent = () => {
    switch (activeTab) {
      case "main":
        return <MainContent productivityScore={productivityScore} dailyGoal={dailyGoal} dailyProgress={dailyProgress} />
      case "parental":
        return <ParentalControl />
      case "flagged":
        return <FlaggedVideos />
      case "settings":
        return <SettingsContent />
      default:
        return <MainContent productivityScore={productivityScore} dailyGoal={dailyGoal} dailyProgress={dailyProgress} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
