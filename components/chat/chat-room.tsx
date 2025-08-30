"use client"

import { useState, useEffect, useRef } from "react"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Users, MessageCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
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
  const supabase = createClient()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("chat_messages")
          .select(`
            id,
            message,
            created_at,
            user:profiles(id, full_name, avatar_url, role)
          `)
          .eq("room_id", room.id)
          .order("created_at", { ascending: true })
          .limit(100)

        if (error) throw error

        setMessages(data || [])
      } catch (error) {
        console.error("Error fetching messages:", error)
        toast.error("Failed to load messages")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()

    // Subscribe to new messages
    const messagesSubscription = supabase
      .channel(`chat_messages:${room.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${room.id}`,
        },
        async (payload) => {
          // Fetch the complete message with user data
          const { data } = await supabase
            .from("chat_messages")
            .select(`
              id,
              message,
              created_at,
              user:profiles(id, full_name, avatar_url, role)
            `)
            .eq("id", payload.new.id)
            .single()

          if (data) {
            setMessages((prev) => [...prev, data])
          }
        },
      )
      .subscribe()

    // Subscribe to presence for online users count
    const presenceSubscription = supabase
      .channel(`room:${room.id}`)
      .on("presence", { event: "sync" }, () => {
        const state = supabase.getChannels()[0].presenceState()
        setOnlineUsers(Object.keys(state).length)
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("User joined:", key, newPresences)
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("User left:", key, leftPresences)
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await supabase.channel(`room:${room.id}`).track({
            user_id: currentUser.id,
            full_name: currentUser.full_name,
            online_at: new Date().toISOString(),
          })
        }
      })

    return () => {
      messagesSubscription.unsubscribe()
      presenceSubscription.unsubscribe()
    }
  }, [room.id, currentUser.id, currentUser.full_name, supabase])

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
