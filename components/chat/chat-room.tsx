"use client"

import { useState, useEffect, useRef } from "react"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Users, MessageCircle } from "lucide-react"
// Supabase client removed
import { toast } from "sonner"

interface ChatRoomProps {
  room: {
    id: string
    name: string
    description: string
  }
  currentUser: {
    id: string
    full_name: string
    avatar_url?: string
    role: string
  }
}

interface Message {
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

export function ChatRoom({ room, currentUser }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [onlineUsers, setOnlineUsers] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // Supabase client removed - using placeholder data

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Placeholder messages - real-time chat functionality removed
    const placeholderMessages: Message[] = [
      {
        id: "1",
        message: "Welcome to the chat room!",
        created_at: new Date().toISOString(),
        user: {
          id: "system",
          full_name: "System",
          role: "admin"
        }
      }
    ]
    
    setMessages(placeholderMessages)
    setOnlineUsers(1)
    setIsLoading(false)

    // Real-time subscriptions removed
  }, [room.id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {room.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{room.description}</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {onlineUsers} online
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-muted-foreground">Loading messages...</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-center space-y-2">
                <MessageCircle className="h-8 w-8 text-muted-foreground mx-auto" />
                <div className="text-muted-foreground">No messages yet. Start the conversation!</div>
              </div>
            </div>
          ) : (
            <div>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} isCurrentUser={message.user.id === currentUser.id} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        <ChatInput roomId={room.id} userId={currentUser.id} onMessageSent={scrollToBottom} />
      </CardContent>
    </Card>
  )
}
