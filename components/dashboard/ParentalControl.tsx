"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal } from "lucide-react"

const familyAccounts = [
  {
    name: "Sarah (Daughter)",
    email: "sarah@example.com",
    age: 12,
    productivityScore: 72,
    todayWatchTime: "2h 15m",
    status: "Good",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Mike (Son)",
    email: "mike@example.com",
    age: 16,
    productivityScore: 58,
    todayWatchTime: "3h 45m",
    status: "Needs Attention",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ParentalControl() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Family Accounts</h2>
          <p className="text-gray-600">Monitor and manage family members' YouTube usage</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {familyAccounts.map((account, index) => (
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
                    <DropdownMenuItem>View Details</DropdownMenuItem>
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

              <Button variant="outline" className="w-full">
                View Full Dashboard
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
