"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/testGoogleAuth'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signUp: () => Promise<{ success: boolean; error?: string; isNewUser?: boolean }>
  signIn: () => Promise<{ success: boolean; error?: string }>
  authenticate: () => Promise<{ success: boolean; error?: string; isNewUser?: boolean }>
  signOut: () => Promise<{ success: boolean; error?: string }>
  updateProfile: (profileData: any) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser()
          setUser(currentUser)
        }
      } catch (error) {
        console.error('Auth check error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signUp = async () => {
    setIsLoading(true)
    try {
      const result = await authService.authenticateWithGoogle()
      if (result.success) {
        setUser(result.user)
        return { success: true, isNewUser: result.isNewUser }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: 'Sign up failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async () => {
    setIsLoading(true)
    try {
      const result = await authService.authenticateWithGoogle()
      if (result.success) {
        setUser(result.user)
        return { success: true, isNewUser: result.isNewUser }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: 'Sign in failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const authenticate = async () => {
    setIsLoading(true)
    try {
      const result = await authService.authenticateWithGoogle()
      if (result.success) {
        setUser(result.user)
        return { success: true, isNewUser: result.isNewUser }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: 'Authentication failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      const result = await authService.signOut()
      if (result.success) {
        setUser(null)
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: 'Sign out failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (profileData: any) => {
    try {
      const result = await authService.updateProfile(profileData)
      if (result.success) {
        setUser(result.user)
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: 'Profile update failed' }
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signUp,
    signIn,
    authenticate,
    signOut,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
