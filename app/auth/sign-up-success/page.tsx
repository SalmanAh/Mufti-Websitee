import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
                <CardDescription>Check your email to confirm</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You&apos;ve successfully signed up. Please check your email to confirm your account before signing in.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
