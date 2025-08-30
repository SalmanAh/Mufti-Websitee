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
  Users,
  MessageCircle,
  Settings,
  BarChart3,
  FolderOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Articles", href: "/admin/articles", icon: FileText },
  { name: "Videos", href: "/admin/videos", icon: Video },
  { name: "Books", href: "/admin/books", icon: BookOpen },
  { name: "Lectures", href: "/admin/lectures", icon: Mic },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Chat Rooms", href: "/admin/chat", icon: MessageCircle },
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
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div
      className={`flex flex-col h-full bg-card border-r transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div>
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">Islamic Scholar Platform</p>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
            {user.full_name.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.full_name}</p>
              <Badge variant="secondary" className="text-xs">
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
                  className={`w-full justify-start ${isCollapsed ? "px-2" : "px-3"}`}
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
          className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 ${
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
