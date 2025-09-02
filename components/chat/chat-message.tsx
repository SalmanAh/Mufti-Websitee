"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ChatMessageProps {
  message: {
    id: string
    message: string
    created_at: string
    user: {
      id: string
      full_name: string
      avatar_url?: string
      role: string
    }
  }
  isCurrentUser: boolean
}

export function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-700 dark:text-red-300"
      case "user":
        return "bg-green-500/10 text-green-700 dark:text-green-300"
      default:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300"
    }
  }

  return (
    <div className={`flex gap-3 p-4 hover:bg-muted/30 transition-colors ${isCurrentUser ? "bg-primary/5" : ""}`}>
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={message.user.avatar_url || "/placeholder.svg"} alt={message.user.full_name} />
        <AvatarFallback className="text-sm font-medium">{getInitials(message.user.full_name)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-semibold ${isCurrentUser ? "text-primary" : "text-foreground"}`}>
            {message.user.full_name}
          </span>
          {message.user.role !== "user" && (
            <Badge variant="outline" className={`text-xs ${getRoleColor(message.user.role)}`}>
              {message.user.role}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
          </span>
        </div>

        <div className="text-sm text-pretty leading-relaxed">{message.message}</div>
      </div>
    </div>
  )
}
