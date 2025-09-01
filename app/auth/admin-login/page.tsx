"use client"

import type React from "react"

// Supabase client removed

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Shield, AlertTriangle } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Placeholder admin login - authentication removed
    try {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, redirect to admin dashboard
      router.push("/admin")
    } catch (error: unknown) {
      setError("Admin login functionality temporarily disabled")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">Admin Sign In</CardTitle>
                <CardDescription>Enter your admin credentials to access the dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Security Notice */}
                <div className="mb-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      This is a secure admin area. Only authorized personnel should access this page.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleAdminLogin}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="admin-email">Admin Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="admin-password">Admin Password</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                    {error && (
                      <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-3">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      disabled={isLoading}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {isLoading ? "Verifying Admin Access..." : "Sign In as Admin"}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    <Link href="/auth/login" className="underline underline-offset-4 text-muted-foreground">
                      ← Back to regular sign in
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}