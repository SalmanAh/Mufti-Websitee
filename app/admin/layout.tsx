export const dynamic = 'force-dynamic'

import type React from "react"
// COMMENTED OUT: Server-side redirect for authentication
// import { redirect } from "next/navigation"
// COMMENTED OUT: Server-side Supabase implementation using placeholder environment variables
// import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // COMMENTED OUT: Server-side authentication and role checking
  // const supabase = await createClient()

  // // Check authentication
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // if (!user) {
  //   redirect("/auth/login")
  // }

  // // Check admin role
  // const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // if (!profile || !["admin", "scholar"].includes(profile.role)) {
  //   redirect("/")
  // }

  // Temporary placeholder data for development
  const profile = {
    id: '1',
    full_name: 'Admin User',
    role: 'admin',
    email: 'admin@example.com'
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar user={profile} />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  )
}
