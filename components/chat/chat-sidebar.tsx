"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Users, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface ChatSidebarProps {
  currentRoomId: string
  onRoomChange: (roomId: string) => void
  currentUser: any
}

interface ChatRoom {
  id: string
  name: string
  description: string
  is_public: boolean
  created_by: string
  created_at: string
}

interface OnlineUser {
  id: string
  full_name: string
  avatar_url?: string
  role: string
}

export function ChatSidebar({ currentRoomId, onRoomChange, currentUser }: ChatSidebarProps) {
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const supabase = createClient()

  useEffect(() => {
    // Fetch chat rooms
    const fetchRooms = async () => {
      const { data } = await supabase
        .from("chat_rooms")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: true })

      setRooms(data || [])
    }

    fetchRooms()

    // Mock online users for demo
    setOnlineUsers([
      {
        id: "1",
        full_name: "Dr. Ahmad Ghamidi",
        role: "scholar",
      },
      {
        id: "2",
        full_name: "Sarah Ahmed",
        role: "user",
      },
      {
        id: "3",
        full_name: "Muhammad Ali",
        role: "user",
      },
    ])
  }, [supabase])

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
      case "scholar":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-300"
      default:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300"
    }
  }

  return (
    <div className="space-y-4">
      {/* Chat Rooms */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Chat Rooms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {rooms.map((room) => (
            <Button
              key={room.id}
              variant={currentRoomId === room.id ? "default" : "ghost"}
              className="w-full justify-start h-auto p-3"
              onClick={() => onRoomChange(room.id)}
            >
              <div className="text-left">
                <div className="font-medium">{room.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{room.description}</div>
              </div>
            </Button>
          ))}

          <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
            <Plus className="h-4 w-4 mr-2" />
            Create Room
          </Button>
        </CardContent>
      </Card>

      {/* Online Users */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Online Users
            <Badge variant="secondary">{onlineUsers.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.full_name} />
                      <AvatarFallback className="text-xs">{getInitials(user.full_name)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{user.full_name}</div>
                    {user.role !== "user" && (
                      <Badge variant="outline" className={`text-xs ${getRoleColor(user.role)}`}>
                        {user.role}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
