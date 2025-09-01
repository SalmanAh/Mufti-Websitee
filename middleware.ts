// Temporarily commented out for frontend development
// import { updateSession } from "@/lib/supabase/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Minimal middleware export to satisfy Next.js requirements
export function middleware(request: NextRequest) {
  // No authentication checks - allowing all requests for frontend development
  return NextResponse.next()
}

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
// }
