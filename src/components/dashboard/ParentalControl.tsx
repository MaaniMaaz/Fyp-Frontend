"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Plus, MoreHorizontal, X } from "lucide-react"

interface ParentalControlProps {
  onNavigateToFamilyDashboard?: (member: any) => void
}

const familyAccounts = [
  {
    id: "sarah",
    name: "Sarah (Daughter)",
    email: "sarah@example.com",
    age: 12,
    productivityScore: 72,
    todayWatchTime: "2h 15m",
    status: "Good",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "mike",
    name: "Mike (Son)",
    email: "mike@example.com",
    age: 16,
    productivityScore: 58,
    todayWatchTime: "3h 45m",
    status: "Needs Attention",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ParentalControl({ onNavigateToFamilyDashboard }: ParentalControlProps) {
  const [showAddAccountModal, setShowAddAccountModal] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [accounts, setAccounts] = useState(familyAccounts)

  const handleAddAccount = () => {
    setShowAddAccountModal(true)
  }

  const handleGoogleAuth = () => {
    setIsConnecting(true)
    // Simulate Google OAuth flow
    setTimeout(() => {
      const newAccount = {
        id: "new-member",
        name: "Alex (Child)",
        email: "alex.doe@gmail.com",
        age: 10,
        productivityScore: 65,
        todayWatchTime: "1h 30m",
        status: "Good",
        avatar: "/placeholder.svg?height=40&width=40",
      }
      setAccounts([...accounts, newAccount])
      setIsConnecting(false)
      setShowAddAccountModal(false)
    }, 2000)
  }

  const handleViewDashboard = (account: any) => {
    if (onNavigateToFamilyDashboard) {
      onNavigateToFamilyDashboard(account)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Family Accounts</h2>
            <p className="text-gray-600">Monitor and manage family members' YouTube usage</p>
          </div>
          <Button onClick={handleAddAccount}>
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={account.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{account.name.split(" ")[0][0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{account.name}</h3>
                      <p className="text-sm text-gray-600">Age {account.age}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleViewDashboard(account)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                      <DropdownMenuItem>Remove Account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Productivity Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{account.productivityScore}%</span>
                    <Badge variant={account.status === "Good" ? "default" : "destructive"} className="text-xs">
                      {account.status}
                    </Badge>
                  </div>
                </div>
                <Progress value={account.productivityScore} />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Today's Watch Time</span>
                  <span className="font-medium">{account.todayWatchTime}</span>
                </div>

                <Button variant="outline" className="w-full" onClick={() => handleViewDashboard(account)}>
                  View Full Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add Family Account</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAddAccountModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2">Connect Google Account</h4>
                <p className="text-gray-600 text-sm mb-6">
                  The family member needs to sign in with their Google account to enable monitoring and parental
                  controls.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">What happens next:</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Family member signs in with Google</li>
                  <li>• YouTube viewing data is analyzed by AI</li>
                  <li>• Parental controls are automatically applied</li>
                  <li>• Real-time monitoring begins</li>
                </ul>
              </div>

              <Button
                onClick={handleGoogleAuth}
                disabled={isConnecting}
                className="w-full h-12 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>

              <div className="text-center">
                <Button variant="ghost" onClick={() => setShowAddAccountModal(false)} className="text-gray-600">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
