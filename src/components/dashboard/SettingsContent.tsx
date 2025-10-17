"use client"

import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function SettingsContent() {
  const [isAddingAccount, setIsAddingAccount] = useState(false)
  const [connectedAccounts, setConnectedAccounts] = useState([
    { email: "john.doe@gmail.com", type: "Primary", connected: "Jan 2024" },
    { email: "sarah.doe@gmail.com", type: "Family", connected: "Jan 2024" },
  ])

  const handleAddAccount = () => {
    setIsAddingAccount(true)
    // Simulate Google OAuth flow
    setTimeout(() => {
      setConnectedAccounts([
        ...connectedAccounts,
        { email: "new.account@gmail.com", type: "Family", connected: "Just now" },
      ])
      setIsAddingAccount(false)
      alert("Google account connected successfully!")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>Manage your Google accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {connectedAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{account.email}</p>
                  <p className="text-xs text-gray-500">
                    {account.type} • Connected {account.connected}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Remove
                </Button>
              </div>
            ))}
            <Button
              onClick={handleAddAccount}
              disabled={isAddingAccount}
              variant="outline"
              className="w-full justify-start"
            >
              <Plus className="w-4 h-4 mr-2" />
              {isAddingAccount ? "Connecting..." : "Add Google Account"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Manage your subscription plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-900">Free Plan</p>
              <p className="text-sm text-blue-700">Basic analytics and monitoring</p>
              <p className="text-xs text-blue-600 mt-1">• Up to 2 family accounts</p>
              <p className="text-xs text-blue-600">• Basic flagged content detection</p>
              <p className="text-xs text-blue-600">• Weekly reports</p>
            </div>
            <Button className="w-full">Upgrade to Pro - $9.99/month</Button>
            <div className="text-xs text-gray-500">
              <p>Pro features:</p>
              <p>• Unlimited family accounts</p>
              <p>• Advanced AI content analysis</p>
              <p>• Real-time alerts</p>
              <p>• Custom content filters</p>
              <p>• Priority support</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Edit your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input defaultValue="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input defaultValue="28" type="number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time Zone</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Pacific Time (PT)</option>
                <option>Mountain Time (MT)</option>
                <option>Central Time (CT)</option>
                <option>Eastern Time (ET)</option>
              </select>
            </div>
            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
            <CardDescription>Control your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Allow data collection for AI improvements</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Share anonymous usage statistics</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Enable two-factor authentication</span>
              </label>
            </div>
            <div className="pt-4 border-t space-y-2">
              <Button variant="outline" className="w-full">
                Export My Data
              </Button>
              <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>App Preferences</CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Default Dashboard View</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Main Dashboard</option>
                <option>Parental Control</option>
                <option>Profile</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Show productivity tips</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Auto-refresh dashboard data</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Compact view mode</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
