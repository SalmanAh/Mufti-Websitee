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

  // Check admin role
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || !["admin", "scholar"].includes(profile.role)) {
    redirect("/")
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
