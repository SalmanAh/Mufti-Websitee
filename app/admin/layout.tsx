export const dynamic = 'force-dynamic'

import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check admin role - only fetch required fields for better performance
  const { data: profile } = await supabase.from("users").select("id, role, full_name, email").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100 dark:from-emerald-950 dark:via-amber-950 dark:to-emerald-900">
      <AdminSidebar user={profile} />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  )
}
