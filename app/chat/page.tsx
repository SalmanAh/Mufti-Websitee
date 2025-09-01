export const dynamic = 'force-dynamic'

// COMMENTED OUT: Server-side redirect for authentication
// import { redirect } from "next/navigation"
import { Navigation } from "@/components/navigation"
// COMMENTED OUT: Server-side Supabase implementation using placeholder environment variables
// import { createClient } from "@/lib/supabase/server"
import { ChatInterface } from "./chat-interface"

export default async function ChatPage() {
  // COMMENTED OUT: Server-side authentication and data fetching
  // const supabase = await createClient()

  // // Check if user is authenticated
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // if (!user) {
  //   redirect("/auth/login")
  // }

  // // Get user profile
  // const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // if (!profile) {
  //   redirect("/auth/login")
  // }

  // // Get default chat room
  // const { data: defaultRoom } = await supabase
  //   .from("chat_rooms")
  //   .select("*")
  //   .eq("is_public", true)
  //   .order("created_at", { ascending: true })
  //   .limit(1)
  //   .single()

  // Temporary placeholder data for development
  const defaultRoom = {
    id: '1',
    name: 'General Discussion',
    description: 'A place for general Islamic discussions',
    is_public: true,
    created_at: '2024-01-01T00:00:00Z'
  }

  const profile = {
    id: '1',
    full_name: 'Guest User',
    role: 'student',
    created_at: '2024-01-01T00:00:00Z'
  }

  // if (!defaultRoom) {
  //   return (
  //     <div className="min-h-screen bg-background">
  //       <Navigation />
  //       <main className="container mx-auto px-4 py-8">
  //         <div className="text-center">
  //           <h1 className="text-2xl font-bold mb-4">No Chat Rooms Available</h1>
  //           <p className="text-muted-foreground">Please contact an administrator to set up chat rooms.</p>
  //         </div>
  //       </main>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Islamic Discussion Chat</h1>
          <p className="text-muted-foreground">
            Join the conversation with fellow Muslims and scholars from around the world
          </p>
        </div>

        <ChatInterface defaultRoom={defaultRoom} currentUser={profile} />
      </main>
    </div>
  )
}
