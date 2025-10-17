"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Play, AlertCircle } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import LoginPage from "./LoginPage"
import SignUpPage from "./SignUpPage"

interface AuthPageProps {
  onNext: () => void
}

type AuthMode = 'welcome' | 'signup' | 'login'

export default function AuthPage({ onNext }: AuthPageProps) {
  const { authenticate } = useAuth()
  const [mode, setMode] = useState<AuthMode>('welcome')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAuthenticate = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await authenticate()
      if (result.success) {
        console.log("User authenticated successfully")
        if (result.isNewUser) {
          console.log("New user - proceeding to onboarding")
        } else {
          console.log("Existing user - proceeding to dashboard")
        }
        onNext()
      } else {
        setError(result.error || "Authentication failed")
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (mode === 'signup') {
    return <SignUpPage onNext={onNext} />
  }

  if (mode === 'login') {
    return <LoginPage onNext={onNext} onBack={() => setMode('welcome')} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">TaskMind</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to TaskMind</h2>
            <p className="text-gray-600">AI-powered YouTube productivity assistant</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleAuthenticate}
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
                  Continue with Google
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setMode('signup')}
                variant="outline"
                className="h-10"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => setMode('login')}
                variant="outline"
                className="h-10"
              >
                Sign In
              </Button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

