"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Users, CheckCircle } from "lucide-react"

interface OnboardingPageProps {
  onNext: () => void
}

interface FormData {
  name: string
  age: string
  goals: string[]
  insights: string[]
  additionalAccounts: boolean
}

export default function OnboardingPage({ onNext }: OnboardingPageProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    goals: [],
    insights: [],
    additionalAccounts: false,
  })

  const goalOptions = [
    "Increase educational content consumption",
    "Limit entertainment viewing time",
    "Track learning progress",
    "Monitor family screen time",
    "Improve productivity habits",
  ]

  const insightOptions = [
    "Daily productivity score",
    "Weekly viewing trends",
    "Content category breakdown",
    "Age rating distribution",
    "Goal achievement tracking",
    "AI recommendations",
  ]

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      onNext()
    }
  }

  const handleAddAccount = () => {
    console.log("Adding additional Google account for parental control")
    alert("Additional account added successfully!")
  }

  const handleGoalChange = (goal: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, goals: [...formData.goals, goal] })
    } else {
      setFormData({ ...formData, goals: formData.goals.filter((g) => g !== goal) })
    }
  }

  const handleInsightChange = (insight: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, insights: [...formData.insights, insight] })
    } else {
      setFormData({ ...formData, insights: formData.insights.filter((i) => i !== insight) })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Setup Your Profile</h2>
              <span className="text-sm text-gray-500">Step {step} of 3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Enter your age"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Goals & Insights</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What are your goals? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {goalOptions.map((goal, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={formData.goals.includes(goal)}
                        onChange={(e) => handleGoalChange(goal, e.target.checked)}
                      />
                      <span className="text-sm">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Which insights do you want on your dashboard?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {insightOptions.map((insight, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={formData.insights.includes(insight)}
                        onChange={(e) => handleInsightChange(insight, e.target.checked)}
                      />
                      <span className="text-sm">{insight}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Parental Control (Optional)</h3>
              <p className="text-gray-600">Add additional Google accounts to monitor family members' YouTube usage.</p>

              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Add Family Accounts</h4>
                    <p className="text-sm text-gray-600">Monitor children's YouTube consumption</p>
                  </div>
                  <Button onClick={handleAddAccount} variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Add Account
                  </Button>
                </div>

                <div className="text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 inline mr-2 text-green-600" />
                  Each family member will need to sign in with their Google account
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You can always add or remove accounts later in Settings.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            <Button onClick={handleNext} className="ml-auto">
              {step === 3 ? "Complete Setup" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
