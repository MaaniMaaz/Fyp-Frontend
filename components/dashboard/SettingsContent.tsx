"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

export default function SettingsContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>Manage connected accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Add Google Account
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Remove Account
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
            </div>
            <Button className="w-full">Upgrade to Pro</Button>
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
            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
