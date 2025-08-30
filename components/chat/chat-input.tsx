"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface ChatInputProps {
  roomId: string
  userId: string
  onMessageSent?: () => void
}

export function ChatInput({ roomId, userId, onMessageSent }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    setIsLoading(true)

    try {
      const { error } = await supabase.from("chat_messages").insert({
        room_id: roomId,
        user_id: userId,
        message: message.trim(),
      })

      if (error) throw error

      setMessage("")
      onMessageSent?.()
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          className="min-h-[60px] max-h-32 resize-none"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={!message.trim() || isLoading} className="h-[60px] w-12">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </form>
  )
}
