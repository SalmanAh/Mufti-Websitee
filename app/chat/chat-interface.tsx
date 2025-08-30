"use client"

import { useState } from "react"
import { ChatRoom } from "@/components/chat/chat-room"
import { ChatSidebar } from "@/components/chat/chat-sidebar"

interface ChatInterfaceProps {
  defaultRoom: {
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

export function ChatInterface({ defaultRoom, currentUser }: ChatInterfaceProps) {
  const [currentRoomId, setCurrentRoomId] = useState(defaultRoom.id)
  const [currentRoom, setCurrentRoom] = useState(defaultRoom)

  const handleRoomChange = (roomId: string) => {
    setCurrentRoomId(roomId)
    // In a real app, you'd fetch the room details here
    // For now, we'll use the default room
    setCurrentRoom(defaultRoom)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <ChatSidebar currentRoomId={currentRoomId} onRoomChange={handleRoomChange} currentUser={currentUser} />
      </div>

      {/* Main Chat */}
      <div className="lg:col-span-3">
        <ChatRoom room={currentRoom} currentUser={currentUser} />
      </div>
    </div>
  )
}
