export const dynamic = 'force-dynamic'

import { Navigation } from "@/components/navigation"
// COMMENTED OUT: Server-side Supabase implementation using placeholder environment variables
// import { createClient } from "@/lib/supabase/server"
import { Video, Star, Calendar, User, Eye, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const dummyVideos = [
  {
    id: 1,
    title: "The Beautiful Names of Allah - Complete Series",
    description:
      "A comprehensive exploration of the 99 beautiful names of Allah and their meanings in our daily lives.",
    author: "Sheikh Muhammad Al-Shareef",
    category: "Theology",
    views: 45672,
    createdAt: "2024-01-20",
    thumbnailUrl: "/islamic-calligraphy-allah-names-golden.png",
    duration: "2:45:30",
    featured: true,
  },
  {
    id: 2,
    title: "Understanding the Quran: Surah Al-Fatiha Deep Dive",
    description: "An in-depth analysis of the opening chapter of the Quran and its profound meanings.",
    author: "Dr. Yasir Qadhi",
    category: "Quran Studies",
    views: 32145,
    createdAt: "2024-01-18",
    thumbnailUrl: "/quran-open-pages-with-arabic-text.png",
    duration: "1:23:15",
    featured: false,
  },
  {
    id: 3,
    title: "The Life of Prophet Muhammad (PBUH) - Early Years",
    description: "Exploring the early life and character of Prophet Muhammad before his prophethood.",
    author: "Sheikh Omar Suleiman",
    category: "Seerah",
    views: 67890,
    createdAt: "2024-01-15",
    thumbnailUrl: "/mecca-kaaba-historical-illustration.png",
    duration: "58:42",
    featured: true,
  },
  {
    id: 4,
    title: "Islamic Finance: Principles and Practice",
    description: "Understanding the fundamentals of Islamic banking and finance in the modern world.",
    author: "Dr. Mufti Taqi Usmani",
    category: "Finance",
    views: 28934,
    createdAt: "2024-01-12",
    thumbnailUrl: "/islamic-geometric-patterns-gold-and-green.png",
    duration: "1:15:20",
    featured: false,
  },
  {
    id: 5,
    title: "The Science of Hadith Authentication",
    description: "Learn how Islamic scholars verify the authenticity of prophetic traditions.",
    author: "Sheikh Hamza Yusuf",
    category: "Hadith Studies",
    views: 19876,
    createdAt: "2024-01-10",
    thumbnailUrl: "/arabic-manuscript-and-books.png",
    duration: "42:18",
    featured: true,
  },
  {
    id: 6,
    title: "Islamic Art and Architecture Through History",
    description: "Exploring the rich tradition of Islamic artistic expression and architectural marvels.",
    author: "Dr. Oleg Grabar",
    category: "Culture",
    views: 15432,
    createdAt: "2024-01-08",
    thumbnailUrl: "/islamic-architecture-mosque-interior.png",
    duration: "1:08:45",
    featured: false,
  },
  {
    id: 7,
    title: "Women in Islam: Rights and Responsibilities",
    description: "A balanced discussion on the status and role of women in Islamic society.",
    author: "Dr. Ingrid Mattson",
    category: "Social Issues",
    views: 41256,
    createdAt: "2024-01-05",
    thumbnailUrl: "/islamic-school-students-learning.png",
    duration: "55:30",
    featured: true,
  },
  {
    id: 8,
    title: "Islamic Medicine: Healing Body and Soul",
    description: "The holistic approach to health and healing in Islamic tradition.",
    author: "Dr. Ahmad Shafaat",
    category: "Health",
    views: 22187,
    createdAt: "2024-01-03",
    thumbnailUrl: "/medical-symbols-with-islamic-motifs.png",
    duration: "38:25",
    featured: false,
  },
]

function VideoCard({ video }: { video: any }) {
  return (
    <Link href={`/videos/${video.id}`}>
      <Card className="group hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 overflow-hidden cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-2">
      <div className="relative aspect-video overflow-hidden bg-black">
        <Image
          src={video.thumbnailUrl || "/placeholder.svg"}
          alt={video.title}
          width={400}
          height={225}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full p-4 group-hover:scale-125 transition-transform duration-300 shadow-2xl">
            <Play className="h-8 w-8 ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3">
          <Badge className="bg-black/80 text-white backdrop-blur-sm shadow-lg">{video.duration}</Badge>
        </div>

        {video.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>

      <CardContent className="p-0">
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold line-clamp-2 group-hover:text-red-600 transition-colors text-lg">{video.title}</h3>

            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{video.author}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-red-500/20 text-red-600 bg-red-500/5">{video.category}</Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{video.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(video.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <Button asChild className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
            <Link href={`/videos/${video.id}`}>
              <Play className="h-4 w-4 mr-2" />
              Watch Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}

export default async function VideosPage() {
  // COMMENTED OUT: Server-side data fetching
  // const supabase = await createClient()

  // // Fetch videos from database
  // const { data: videos } = await supabase
  //   .from("videos")
  //   .select(`*,author:profiles(full_name),category:categories(name)`)
  //   .eq("published", true)
  //   .order("created_at", { ascending: false })

  // Temporary placeholder data for development
  const displayVideos = dummyVideos

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-full">
              <Video className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-balance">Islamic Videos</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Watch educational videos by renowned Islamic scholars on various topics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  )
}
