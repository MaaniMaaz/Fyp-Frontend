"use client"

import { useState, useEffect } from "react"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import HomePage from "./components/HomePage"
import AuthPage from "./components/AuthPage"
import OnboardingPage from "./components/OnboardingPage"
import MainDashboard from "./components/MainDashboard"

function AppContent() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const [currentStep, setCurrentStep] = useState("homepage")

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if user has completed onboarding
      // For now, assume all authenticated users go to dashboard
      setCurrentStep("dashboard")
    } else if (!isLoading) {
      setCurrentStep("homepage")
    }
  }, [isAuthenticated, isLoading, user])

  const handleStepChange = (step: string) => {
    setCurrentStep(step)
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  switch (currentStep) {
    case "auth":
      return <AuthPage onNext={() => handleStepChange("onboarding")} />
    case "onboarding":
      return <OnboardingPage onNext={() => handleStepChange("dashboard")} />
    case "dashboard":
      return <MainDashboard />
    default:
      return <HomePage onSignUp={() => handleStepChange("auth")} />
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
