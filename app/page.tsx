"use client"

import { useState, useEffect } from "react"
import HomePage from "@/components/HomePage"
import SignUpPage from "@/components/SignUpPage"
import OnboardingPage from "@/components/OnboardingPage"
import MainDashboard from "@/components/MainDashboard"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth()
  const [currentStep, setCurrentStep] = useState("homepage")

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentStep("dashboard")
    } else if (!isLoading) {
      setCurrentStep("homepage")
    }
  }, [isAuthenticated, isLoading])

  const handleStepChange = (step: string) => {
    setCurrentStep(step)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  switch (currentStep) {
    case "signup":
      return <SignUpPage onNext={() => handleStepChange("onboarding")} />
    case "onboarding":
      return <OnboardingPage onNext={() => handleStepChange("dashboard")} />
    case "dashboard":
      return <MainDashboard />
    default:
      return <HomePage onSignUp={() => handleStepChange("signup")} />
  }
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
