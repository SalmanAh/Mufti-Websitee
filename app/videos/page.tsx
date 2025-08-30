import { Navigation } from "@/components/navigation"
import { createClient } from "@/lib/supabase/server"
import { Video, Star, Calendar, User, Eye, Play, Headphones, Clock, Mic } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    type: "video",
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
    type: "video",
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
    type: "video",
  },
]

const dummyLectures = [
  {
    id: 4,
    title: "The Purpose of Life in Islam",
    description: "A profound discussion on the meaning and purpose of human existence according to Islamic teachings.",
    author: "Sheikh Yusuf Estes",
    category: "Philosophy",
    views: 34567,
    createdAt: "2024-01-20",
    thumbnailUrl: "/islamic-calligraphy-and-geometric-patterns.png",
    duration: "45:30",
    featured: true,
    type: "lecture",
    series: "Life Guidance Series",
  },
  {
    id: 5,
    title: "Stories of the Prophets: Ibrahim (AS)",
    description: "The inspiring story of Prophet Ibrahim and his unwavering faith in Allah.",
    author: "Sheikh Omar Suleiman",
    category: "Prophetic Stories",
    views: 28934,
    createdAt: "2024-01-18",
    thumbnailUrl: "/mecca-kaaba-historical-illustration.png",
    duration: "1:12:45",
    featured: true,
    type: "lecture",
    series: "Stories of the Prophets",
  },
  {
    id: 6,
    title: "The Art of Dhikr and Remembrance",
    description: "Learning the spiritual practice of remembering Allah and its benefits for the soul.",
    author: "Sheikh Hamza Yusuf",
    category: "Spirituality",
    views: 19876,
    createdAt: "2024-01-15",
    thumbnailUrl: "/islamic-calligraphy-allah-names-golden.png",
    duration: "38:20",
    featured: false,
    type: "lecture",
    series: "Spiritual Development",
  },
]

function MediaCard({ item }: { item: any }) {
  const isVideo = item.type === "video"

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <Image
          src={item.thumbnailUrl || "/placeholder.svg"}
          alt={item.title}
          width={320}
          height={180}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div
            className={`${isVideo ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"} text-white rounded-full p-3 group-hover:scale-110 transition-transform duration-300`}
          >
            {isVideo ? <Play className="h-6 w-6 ml-1" /> : <Headphones className="h-6 w-6" />}
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3">
          <Badge className="bg-black/80 text-white">
            {isVideo ? (
              item.duration
            ) : (
              <>
                <Clock className="h-3 w-3 mr-1" />
                {item.duration}
              </>
            )}
          </Badge>
        </div>

        {item.featured && (
          <Badge className={`absolute top-3 left-3 ${isVideo ? "bg-red-600" : "bg-purple-600"} text-white`}>
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3
              className={`font-semibold line-clamp-2 group-hover:${isVideo ? "text-red-600" : "text-purple-600"} transition-colors`}
            >
              {item.title}
            </h3>

            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{item.author}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between">
            <Badge variant="outline">{item.category}</Badge>
            {item.series && (
              <Badge variant="secondary" className="text-xs">
                {item.series}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{item.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <Button asChild className="w-full mt-4">
            <Link href={`/${isVideo ? "videos" : "lectures"}/${item.id}`}>
              {isVideo ? <Play className="h-4 w-4 mr-2" /> : <Headphones className="h-4 w-4 mr-2" />}
              {isVideo ? "Watch Now" : "Listen Now"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function VideosPage() {
  const supabase = await createClient()

  // Fetch videos and lectures
  const { data: videos } = await supabase
    .from("videos")
    .select(`*,author:profiles(full_name),category:categories(name)`)
    .eq("published", true)
    .order("created_at", { ascending: false })

  const { data: lectures } = await supabase
    .from("lectures")
    .select(`*,author:profiles(full_name),category:categories(name)`)
    .eq("published", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-full">
              <div className="flex items-center gap-2">
                <Video className="h-8 w-8 text-red-600" />
                <Mic className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-balance">Islamic Media</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Watch videos and listen to lectures by renowned Islamic scholars on various topics
          </p>
        </div>

        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="lectures" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Lectures
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos?.map((video) => (
                <MediaCard key={video.id} item={video} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lectures">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lectures?.map((lecture) => (
                <MediaCard key={lecture.id} item={lecture} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
