// COMMENTED OUT: Middleware Supabase implementation using placeholder environment variables
// // COMMENTED OUT: Middleware Supabase implementation using placeholder environment variables
// import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // COMMENTED OUT: Server-side authentication middleware
  // let supabaseResponse = NextResponse.next({
  //   request,
  // })

  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   {
  //     cookies: {
  //       getAll() {
  //         return request.cookies.getAll()
  //       },
  //       setAll(cookiesToSet) {
  //         cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
  //         supabaseResponse = NextResponse.next({
  //           request,
  //         })
  //         cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
  //       },
  //     },
  //   },
  // )

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // if ((!user && request.nextUrl.pathname.startsWith("/admin")) || request.nextUrl.pathname.startsWith("/dashboard")) {
  //   const url = request.nextUrl.clone()
  //   url.pathname = "/auth/login"
  //   return NextResponse.redirect(url)
  // }

  // return supabaseResponse
  
  // Temporary: Allow all requests to pass through without authentication
  return NextResponse.next({
    request,
  })
}

//   return supabaseResponse
// }

import { NextResponse, type NextRequest } from "next/server"

// Temporary placeholder function to prevent middleware errors
export async function updateSession(request: NextRequest) {
  // Skip authentication checks when Supabase is disabled
  return NextResponse.next({
    request,
  })
}
