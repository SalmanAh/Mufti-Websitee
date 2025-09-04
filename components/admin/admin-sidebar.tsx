"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FileText,
  Video,
  BookOpen,
  Mic,
  Settings,
  BarChart3,
  FolderOpen,
  LogOut,
  Menu,
  X,
  Scroll,
  Quote,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Articles", href: "/admin/articles", icon: FileText },
  { name: "Videos", href: "/admin/videos", icon: Video },
  { name: "Books", href: "/admin/books", icon: BookOpen },
  { name: "Hadiths", href: "/admin/hadiths", icon: Scroll },
  { name: "Ayats", href: "/admin/ayats", icon: Quote },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  user: {
    full_name: string
    role: string
  }
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div
      className={`flex flex-col h-full bg-gradient-to-b from-emerald-800 to-emerald-900 border-r border-emerald-700 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-emerald-700">
        {!isCollapsed && (
          <div>
            <h2 className="text-lg font-semibold text-amber-100">Admin Panel</h2>
            <p className="text-sm text-emerald-200">Islamic Scholar Platform</p>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="text-emerald-200 hover:text-amber-100 hover:bg-emerald-700">
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-emerald-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
            {user.full_name.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-emerald-100">{user.full_name}</p>
              <Badge className="text-xs bg-amber-600 text-white hover:bg-amber-700">
                {user.role}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${isCollapsed ? "px-2" : "px-3"} ${
                    isActive 
                      ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-lg" 
                      : "text-emerald-200 hover:text-amber-100 hover:bg-emerald-700/50"
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Sign Out */}
      <div className="p-3">
        <Button
          variant="ghost"
          className={`w-full justify-start text-red-300 hover:text-red-100 hover:bg-red-800/30 ${
            isCollapsed ? "px-2" : "px-3"
          }`}
          onClick={handleSignOut}
          title={isCollapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
