"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Video, FileText, MessageCircle, Heart, Mail, Phone, MapPin, MessageSquare, Play, Eye, Download, Share2, Calendar, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { getYouTubeThumbnail } from "@/lib/youtube-utils"

// Desktop/Laptop images (first 3)
const desktopSlideImages = [
  {
    src: "/Pics/First.jpeg",
    title: "Divine Names",
    subtitle: "Beautiful Islamic Calligraphy"
  },
  {
    src: "/Pics/Second.jpeg",
    title: "Holy Kaaba",
    subtitle: "The Sacred House of Allah"
  },
  {
    src: "/Pics/Third.jpeg",
    title: "Holy Quran",
    subtitle: "Divine Guidance for Humanity"
  }
]

// Mobile images (last 3)
const mobileSlideImages = [
  {
    src: "/Pics/Fourth.jpg",
    title: "Islamic Architecture",
    subtitle: "Sacred Spaces of Worship"
  },
  {
    src: "/Pics/Fifth.jpg",
    title: "Islamic Art",
    subtitle: "Beauty in Faith"
  },
  {
    src: "/Pics/Sixth.jpg",
    title: "Islamic Heritage",
    subtitle: "Preserving Our Legacy"
  }
]

const features = [
  { icon: Video, title: "Videos", description: "Educational Islamic lectures and talks", href: "/videos", color: "bg-orange-300" },
    { icon: BookOpen, title: "Hadiths", description: "Authentic sayings of Prophet Muhammad (PBUH)", href: "/hadiths", color: "bg-orange-300" },
    { icon: Heart, title: "Ayats", description: "Beautiful verses from the Holy Quran", href: "/ayats", color: "bg-orange-400" },
    { icon: FileText, title: "Articles", description: "Scholarly writings and Islamic insights", href: "/articles", color: "bg-orange-400" },
    { icon: BookOpen, title: "E-Books", description: "Digital Islamic books and literature", href: "/books", color: "bg-orange-500" },
]

// Real content will be fetched from database
interface ContentData {
  videos: any[]
  hadiths: any[]
  ayats: any[]
  articles: any[]
  books: any[]
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [contentData, setContentData] = useState<ContentData>({
    videos: [],
    hadiths: [],
    ayats: [],
    articles: [],
    books: []
  })
  const [loading, setLoading] = useState(true)
  const [openDropdowns, setOpenDropdowns] = useState<{[key: string]: boolean}>({})

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-container')) {
        setOpenDropdowns({})
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get current slide images based on screen size
  const currentSlideImages = isMobile ? mobileSlideImages : desktopSlideImages

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentSlideImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [currentSlideImages.length])

  // Reset slide when switching between mobile/desktop
  useEffect(() => {
    setCurrentSlide(0)
  }, [isMobile])

  // Fetch real data from database
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const supabase = createClient()
        
        // Fetch latest videos (limit 4)
        const { data: videos, error: videosError } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4)
        
        if (videosError) {
          console.error('Error fetching videos:', videosError)
        } else {
          console.log('Videos fetched:', videos?.length || 0, 'items')
        }
        
        // Fetch latest hadiths (limit 4)
        const { data: hadiths, error: hadithsError } = await supabase
          .from('hadiths')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4)
        
        if (hadithsError) {
          console.error('Error fetching hadiths:', hadithsError)
        } else {
          console.log('Hadiths fetched:', hadiths?.length || 0, 'items')
        }
        
        // Fetch latest ayats (limit 4)
        const { data: ayats, error: ayatsError } = await supabase
          .from('ayats')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4)
        
        if (ayatsError) {
          console.error('Error fetching ayats:', ayatsError)
        } else {
          console.log('Ayats fetched:', ayats?.length || 0, 'items')
        }
        
        // Fetch latest articles (limit 4)
        const { data: articles, error: articlesError } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4)
        
        if (articlesError) {
          console.error('Error fetching articles:', articlesError)
        } else {
          console.log('Articles fetched:', articles?.length || 0, 'items')
        }
        
        // Fetch latest books (limit 4)
        const { data: books, error: booksError } = await supabase
          .from('books')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4)
        
        if (booksError) {
          console.error('Error fetching books:', booksError)
        } else {
          console.log('Books fetched:', books?.length || 0, 'items')
        }
        
        setContentData({
          videos: videos || [],
          hadiths: hadiths || [],
          ayats: ayats || [],
          articles: articles || [],
          books: books || []
        })
      } catch (error) {
        console.error('Error fetching content:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchContent()
  }, [])

  return (
    <div className="min-h-screen bg-background dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Slideshow */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-background dark:from-gray-800 dark:to-gray-700 w-full">
        
        {currentSlideImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide ? "translate-x-0" : 
              index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full h-full object-fill md:object-contain"
              />
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {currentSlideImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors cursor-pointer hover:bg-white/80 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
<div className="bg-background">
  <br />
</div>

      {/* Features Section */}
      <div className="bg-background dark:from-gray-800 dark:to-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <hr />
          </div>
          
          {/* Category Navigation Links */}
          <div className="mb-4">
            <div className="flex justify-between items-center max-w-4xl mx-auto px-4">
              {features.map((feature, index) => (
                <Link key={index} href={feature.href} className="text-orange-500 dark:text-orange-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors text-center flex-1">
                  {feature.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-gray-300 dark:border-gray-600" />

      {/* Explore More Section */}
      <div className="bg-background dark:from-gray-800 dark:to-gray-700 py-16">
        <div className="container mx-auto px-4">


          {/* Videos Section */}
          <div className="mb-16">

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : contentData.videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {contentData.videos.map((video, index) => (
                  <Link 
                    href={video.youtube_link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    key={index} 
                    className="group cursor-pointer block p-4 rounded-lg bg-card dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 border border-black dark:border-white"
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
                        <div className="bg-orange-400 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                          <Play className="h-5 w-5 ml-0.5" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Info */}
                    <div className="space-y-2">
                      {/* Title */}
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight line-clamp-2 group-hover:text-orange-400 dark:group-hover:text-orange-300 transition-colors">
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
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">No Videos Available</h4>
                <p className="text-gray-500">Videos will appear here once they are added to the database.</p>
              </div>
            )}
            <div className="text-center mt-8">
              <Link href="/videos">
                <Button variant="outline" className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white">
                  See More Videos <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
          </div>

          {/* Hadiths Section */}
          <div className="mb-16">

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : contentData.hadiths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {contentData.hadiths.map((hadith, index) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-200 border border-black dark:border-white bg-card dark:bg-gray-800">
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-orange-200 text-orange-500 bg-orange-50 font-arabic urdu-text">
                          {hadith.category || 'Hadith'}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-arabic urdu-text">{hadith.address}</span>
                      </div>
                      
                      {/* Arabic Text */}
                      <div className="text-right p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                        <div 
                          className="text-lg font-arabic urdu-text text-orange-500 dark:text-orange-400 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: hadith.arabic_text || ''
                          }}
                        />
                      </div>
                      
                      {/* Translation */}
                      {hadith.translation_eng && (
                        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                          <div 
                            className="text-gray-700 dark:text-gray-300 italic leading-relaxed text-sm"
                            dangerouslySetInnerHTML={{
                              __html: `"${hadith.translation_eng}"`
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Source Information */}
                       <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                         <p><span className="font-medium text-orange-500 dark:text-orange-400">Reference:</span> {hadith.address}</p>
        <p><span className="font-medium text-orange-500 dark:text-orange-400">Views:</span> {hadith.views || 0}</p>
        <p><span className="font-medium text-orange-500 dark:text-orange-400">Date:</span> {new Date(hadith.created_at).toLocaleDateString()}</p>
                  {hadith.tafseer && (
                    <p><span className="font-medium text-orange-500 dark:text-orange-400">Tafseer:</span> Available</p>
                  )}
                       </div>
                       
                       {/* Action Buttons */}
                       <div className="flex gap-2 pt-2 border-t border-orange-100">
                         <Button asChild className="flex-1 bg-orange-400 hover:bg-orange-500 text-white text-sm py-2">
                           <Link href={`/hadiths/${hadith.id}/detail`}>
                             View Tafseer
                           </Link>
                         </Button>
                       </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">No Hadiths Available</h4>
                <p className="text-gray-500">Hadiths will appear here once they are added to the database.</p>
              </div>
            )}
            <div className="text-center mt-8">
              <Link href="/hadiths">
                <Button variant="outline" className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white">
                  See More Hadiths <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
          </div>

          {/* Ayats Section */}
          <div className="mb-16">

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : contentData.ayats.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {contentData.ayats.map((ayat, index) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-200 border border-black dark:border-white bg-card dark:bg-gray-800">
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-orange-200 text-orange-500 bg-orange-50 font-urdu">
                            {ayat.category || 'Ayat'}
                          </Badge>
                          <Badge variant="outline" className="border-orange-200 text-orange-500 bg-orange-50 font-urdu">
                            {ayat.revelation || 'Quran'}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <h4 className="text-lg text-orange-600 dark:text-orange-400">
                        {ayat.address}
                      </h4>
                      
                      {/* Arabic Text */}
                      <div className="text-right p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                        <div 
                          className="text-2xl font-arabic urdu-text text-orange-500 dark:text-orange-400 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: ayat.arabic_text || ''
                          }}
                        />
                      </div>
                      
                      {/* Translation */}
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                  <p className="text-sm font-medium text-orange-500 dark:text-orange-400 mb-1">Translation:</p>
                        <div 
                          className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm"
                          dangerouslySetInnerHTML={{
                            __html: `"${ayat.translation_eng}"`
                          }}
                        />
                      </div>

                      {/* Source Information */}
                       <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 pt-2 border-t border-orange-200 dark:border-orange-800">
                         <div>Reference: {ayat.address}</div>
                         {ayat.tafseer_eng && (
                           <div>Tafseer: Available</div>
                         )}
                         <div className="flex items-center gap-4">
                           <span className="flex items-center gap-1">
                             <Eye className="h-3 w-3" />
                             {ayat.views || 0}
                           </span>
                           <span className="flex items-center gap-1">
                             <Calendar className="h-3 w-3" />
                             {new Date(ayat.created_at).toLocaleDateString()}
                           </span>
                         </div>
                       </div>

                       {/* Action Buttons */}
                       <div className="flex gap-2 pt-2 border-t border-orange-100">
                         <Button asChild className="flex-1 bg-orange-400 hover:bg-orange-500 text-white text-sm py-2">
                           <Link href={`/ayats/${ayat.id}/detail`}>
                             View Tafseer
                           </Link>
                         </Button>
                       </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">No Ayats Available</h4>
                <p className="text-gray-500">Quranic verses will appear here once they are added to the database.</p>
              </div>
            )}
            <div className="text-center mt-8">
              <Link href="/ayats">
                <Button variant="outline" className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white">
                  See More Ayats <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
          </div>

          {/* Articles Section */}
          <div className="mb-16">

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : contentData.articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {contentData.articles.map((article, index) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-200 border border-black dark:border-white bg-card dark:bg-gray-800 overflow-hidden">
                    {/* Thumbnail */}
                    <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                      {article.thumbnail_url ? (
                        <Image
                          src={article.thumbnail_url}
                          alt={article.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center">
                          <FileText className="h-12 w-12 text-orange-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-orange-200 text-orange-500 bg-orange-50 font-arabic urdu-text">
                          {article.category || 'Article'}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-orange-500 dark:text-orange-400 line-clamp-2 font-arabic urdu-text">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        By {article.author || 'Unknown Author'}
                      </p>
                      
                      {/* Content Preview */}
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                        <div 
                          className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-4 font-arabic urdu-text"
                          dangerouslySetInnerHTML={{
                            __html: article.content || ''
                          }}
                        />
                      </div>
                      
                      {/* Article Stats */}
                       <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-orange-100 dark:border-orange-800">
                         <div className="flex items-center gap-4">
                           <span className="flex items-center gap-1">
                             <Eye className="h-3 w-3" />
                             {article.views || 0}
                           </span>
                           <span className="flex items-center gap-1">
                             <Calendar className="h-3 w-3" />
                             {new Date(article.created_at).toLocaleDateString()}
                           </span>
                         </div>
                       </div>
                       
                       {/* Action Button */}
                        <div className="pt-2">
                          <Button asChild className="w-full bg-orange-400 hover:bg-orange-500 text-white text-sm py-2">
                            <Link href={`/articles/${article.id}/detail`}>
                              View Article
                            </Link>
                          </Button>
                        </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No Articles Available</h4>
                <p className="text-gray-500 dark:text-gray-400">Articles will appear here once they are added to the database.</p>
              </div>
            )}
            <div className="text-center mt-8">
              <Link href="/articles">
                <Button variant="outline" className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white">
                  See More Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
          </div>

          {/* E-Books Section */}
          <div className="mb-16">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : contentData.books.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {contentData.books.map((book, index) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-200 border border-black dark:border-white bg-card dark:bg-gray-800 overflow-hidden">
                    {/* Thumbnail */}
                    <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                      {book.thumbnail_url ? (
                        <Image
                          src={book.thumbnail_url}
                          alt={book.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-orange-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      {/* Header with badges */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-orange-200 text-orange-500 bg-orange-50 font-urdu">
                            {book.category || 'E-Book'}
                          </Badge>
                          {book.featured && (
                            <Badge variant="outline" className="border-yellow-200 text-yellow-700 bg-yellow-50">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Book Title */}
                      <div>
                        <h3 className="text-lg font-semibold text-orange-500 dark:text-orange-400 line-clamp-2 mb-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          By {book.author || 'Unknown Author'}
                        </p>
                      </div>
                      
                      {/* Description */}
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                        <div 
                          className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: book.description || ''
                          }}
                        />
                      </div>
                      

                      
                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        {(book.pdf_url || book.pdf_url1) && (
                          <div className="relative w-full dropdown-container">
                            <Button 
                              onClick={() => {
                                const dropdownKey = `book-${index}`;
                                setOpenDropdowns(prev => ({
                                  ...prev,
                                  [dropdownKey]: !prev[dropdownKey]
                                }));
                              }}
                              className="w-full bg-orange-400 hover:bg-orange-500 text-white flex items-center justify-center gap-2"
                            >
                              <Download className="h-4 w-4" />
                              View PDF
                              <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns[`book-${index}`] ? 'rotate-180' : ''}`} />
                            </Button>
                            {openDropdowns[`book-${index}`] && (
                              <div className="absolute bottom-full left-0 right-0 mb-1 bg-card dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-[999]">
                                {book.pdf_url1 && (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      window.open(book.pdf_url1, '_blank');
                                      setOpenDropdowns(prev => ({ ...prev, [`book-${index}`]: false }));
                                    }}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-sm cursor-pointer flex items-center gap-2 border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-all duration-200"
                                  >
                                    <Download className="h-4 w-4 text-orange-500" />
                                    <span className="font-medium text-gray-900 dark:text-gray-100">{book.title} - Part 2</span>
                                  </button>
                                )}
                                {book.pdf_url && (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      window.open(book.pdf_url, '_blank');
                                      setOpenDropdowns(prev => ({ ...prev, [`book-${index}`]: false }));
                                    }}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-sm cursor-pointer flex items-center gap-2 border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-all duration-200"
                                  >
                                    <Download className="h-4 w-4 text-orange-500" />
                                    <span className="font-medium text-gray-900 dark:text-gray-100">{book.title} - Part 1</span>
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">No E-Books Available</h4>
                <p className="text-gray-500">E-Books will appear here once they are added to the database.</p>
              </div>
            )}
            <div className="text-center mt-8">
              <Link href="/books">
                <Button variant="outline" className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white">
                  See More E-Books <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />






 
        {/* Footer */}
       <footer className="bg-orange-600 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img 
                src="/Pics/Logo.png" 
                alt="Mufti's Website Logo" 
                className="h-20 w-auto object-contain"
              />
              </div>
              <p className="text-orange-100 mb-4 max-w-md">
                Dedicated to spreading authentic Islamic knowledge and teachings through modern digital platforms.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-orange-200">Quick Links</h4>
        <ul className="space-y-2 text-orange-100">
              <li><Link href="/articles" className="hover:text-white transition-colors">Articles</Link></li>
              <li><Link href="/videos" className="hover:text-white transition-colors">Videos</Link></li>
              <li><Link href="/books" className="hover:text-white transition-colors">Books</Link></li>
              <li><Link href="/hadiths" className="hover:text-white transition-colors">Hadiths</Link></li>
              <li><Link href="/ayats" className="hover:text-white transition-colors">Ayats</Link></li>
            </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-orange-200">Connect</h4>
        <ul className="space-y-2 text-orange-100">
              <li><Link href="/bio" className="hover:text-white transition-colors">About Scholar</Link></li>
              <li><Link href="/chat" className="hover:text-white transition-colors">Live Chat</Link></li>
              <li><a href="mailto:info@islamicscholar.com" className="hover:text-white transition-colors">info@islamicscholar.com</a></li>
              <li><a href="tel:+92 302 4620110" className="hover:text-white transition-colors">+92 302 4620110</a></li>
              <li><span className="text-orange-100">123 Islamic Center St.<br />Knowledge City, KC 12345</span></li>
            </ul>
            </div>
          </div>
          
          <div className="border-t border-orange-400 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-orange-100">
              © 2024 Islamic Scholar Platform. All rights reserved. | Spreading knowledge with wisdom and compassion.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <Link href="/chat">
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            size="lg" 
            className="rounded-full w-14 h-14 bg-orange-400 hover:bg-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <MessageSquare className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </Link>
    </div>
  )
}