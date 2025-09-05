import { Navigation } from "@/components/navigation"
import { createClient } from "@/lib/supabase/server"
import { Video, Star, Calendar, User, Eye, Play, Search, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { getYouTubeThumbnail } from "@/lib/youtube-utils"

interface VideoData {
  id: string;
  title: string;
  description?: string;
  youtube_link: string;
  views: number;
  created_at: string;
}



export default async function VideosPage() {
  const supabase = await createClient();

  const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching videos:', error);
  }

  // Since there are no categories in the DB, we'll use a simple filter
  const categories = ["All"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-white text-gray-900 py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-orange-100 rounded-full border border-orange-200">
                <Video className="h-16 w-16 text-orange-600" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Islamic Videos
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Watch inspiring Islamic lectures, sermons, and educational content
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-orange-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search videos by title, speaker, or topic..." 
                  className="pl-10 border-orange-200 focus:border-orange-400"
                />
              </div>
            </div>
            <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge 
              variant="default"
              className="bg-orange-600 hover:bg-orange-700"
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant="outline"
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <Link 
                 href={video.youtube_link || '#'} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 key={video.id} 
                 className="group cursor-pointer block p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
               >
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-900 dark:bg-gray-800 mb-3">
                  <Image
                     src={getYouTubeThumbnail(video.youtube_link) || "/placeholder.svg"}
                     alt={video.title}
                     width={400}
                     height={225}
                     className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                   />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                    <div className="bg-orange-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                      <Play className="h-5 w-5 ml-0.5" />
                    </div>
                  </div>
                  {/* No duration or featured badges since they don't exist in DB */}
                </div>
                
                {/* Video Info */}
                <div className="space-y-2">
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {video.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {video.description || 'No description available'}
                  </p>
                  
                  {/* Views and Date */}
                  <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm space-x-2">
                    <span>{(video.views || 0).toLocaleString()} views</span>
                    <span>•</span>
                    <span>{new Date(video.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Videos Found</h3>
              <p className="text-muted-foreground">There are no published videos available at the moment.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
            Load More Videos
          </Button>
        </div>
      </div>
    </div>
  )
}
