"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Video, FileText, MessageCircle, Heart, Mail, Phone, MapPin, MessageSquare, Play, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

// Desktop/Laptop images (first 3)
const desktopSlideImages = [
  {
    src: "/Pics/First.jpg",
    title: "Divine Names",
    subtitle: "Beautiful Islamic Calligraphy"
  },
  {
    src: "/Pics/Second.jpg",
    title: "Holy Kaaba",
    subtitle: "The Sacred House of Allah"
  },
  {
    src: "/Pics/Third.jpg",
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
  { icon: Video, title: "Videos", description: "Educational Islamic lectures and talks", href: "/videos", color: "bg-green-600" },
  { icon: BookOpen, title: "Hadiths", description: "Authentic sayings of Prophet Muhammad (PBUH)", href: "/hadiths", color: "bg-amber-600" },
  { icon: Heart, title: "Ayats", description: "Beautiful verses from the Holy Quran", href: "/ayats", color: "bg-green-700" },
  { icon: FileText, title: "Articles", description: "Scholarly writings and Islamic insights", href: "/articles", color: "bg-amber-700" },
  { icon: BookOpen, title: "E-Books", description: "Digital Islamic books and literature", href: "/books", color: "bg-green-800" },
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

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
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
        
        // Fetch latest videos (limit 3)
        const { data: videos } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3)
        
        // Fetch latest hadiths (limit 3)
        const { data: hadiths } = await supabase
          .from('hadiths')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3)
        
        // Fetch latest ayats (limit 3)
        const { data: ayats } = await supabase
          .from('ayats')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3)
        
        // Fetch latest articles (limit 3)
        const { data: articles } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3)
        
        // Fetch latest books (limit 3)
        const { data: books } = await supabase
          .from('books')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3)
        
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Slideshow */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-r from-green-100 to-amber-100 dark:from-gray-800 dark:to-gray-700">
        
        {currentSlideImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide ? "translate-x-0" : 
              index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
          >
            <div className="w-[80%] h-full mx-auto flex items-center justify-center">
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full h-full object-contain"
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
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
<div className="bg-gradient-to-r from-green-100 to-amber-100">
  <br />
</div>
      <hr />

      {/* Features Section */}
      <div className="bg-gradient-to-r from-green-100 to-amber-100 dark:from-gray-800 dark:to-gray-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-400 mb-4">All Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Link key={index} href={feature.href}>
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-green-100 dark:border-gray-700">
                    <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-gray-300 dark:border-gray-600" />

      {/* Explore More Section */}
      <div className="bg-gradient-to-r from-green-100 to-amber-100 dark:from-gray-800 dark:to-gray-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-400 mb-4">Explore More</h2>
          </div>

          {/* Videos Section */}
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-8 text-center">Latest Videos</h3>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contentData.videos.map((video, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-2">
                  <div className="relative">
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-16 w-16 text-green-600 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center justify-between text-white text-sm">
                          <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                            Video
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{video.views || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold line-clamp-2 group-hover:text-green-600 transition-colors">{video.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{video.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Badge variant="outline" className="border-green-500/20 text-green-600 bg-green-500/5">Video</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            )}
            <div className="text-center mt-8">
              <Link href="/videos">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  See More Videos <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
          </div>

          {/* Hadiths Section */}
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-amber-700 dark:text-amber-400 mb-8 text-center">Featured Hadiths</h3>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contentData.hadiths.map((hadith, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-2">
                  <div className="relative">
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-amber-600 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                          {hadith.address || 'Hadith'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold line-clamp-2 group-hover:text-amber-600 transition-colors">{hadith.address}</h4>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{hadith.translation_eng}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Badge variant="outline" className="border-amber-500/20 text-amber-600 bg-amber-500/5">{hadith.category || 'Hadith'}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            )}
            <div className="text-center mt-8">
              <Link href="/hadiths">
                <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                  See More Hadiths <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
          </div>

          {/* Ayats Section */}
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-amber-700 dark:text-amber-400 mb-8 text-center">Beautiful Ayats</h3>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contentData.ayats.map((ayat, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-2">
                  <div className="relative">
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-amber-600 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                          {ayat.address || 'Quran'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold line-clamp-2 group-hover:text-amber-600 transition-colors">{ayat.address}</h4>
                      <p className="text-sm text-muted-foreground mt-2 italic line-clamp-3">"{ayat.translation_eng}"</p>
                      <p className="text-xs text-muted-foreground mt-1">{ayat.revelation}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Badge variant="outline" className="border-amber-500/20 text-amber-600 bg-amber-500/5">{ayat.category || 'Quran'}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            )}
            <div className="text-center mt-8">
              <Link href="/ayats">
                <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                  See More Ayats <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
          </div>

          {/* Articles Section */}
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-amber-700 dark:text-amber-400 mb-8 text-center">Recent Articles</h3>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contentData.articles.map((article, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-2">
                  <div className="relative">
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="h-16 w-16 text-amber-600 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                          Article
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold line-clamp-2 group-hover:text-amber-600 transition-colors">{article.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{article.content?.substring(0, 150)}...</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>By {article.author || 'Islamic Scholar'}</span>
                        <span>•</span>
                        <span>{article.views || 0} views</span>
                      </div>
                      <Badge variant="outline" className="border-amber-500/20 text-amber-600 bg-amber-500/5">Article</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            )}
            <div className="text-center mt-8">
              <Link href="/articles">
                <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                  See More Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
          </div>

          {/* E-Books Section */}
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-8 text-center">Featured E-Books</h3>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contentData.books.map((book, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-2">
                  <div className="relative">
                    <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-green-600 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-2 text-white text-sm">
                          <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                            E-Book
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold line-clamp-2 group-hover:text-green-600 transition-colors">{book.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">Islamic E-Book</p>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{book.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{book.views || 0} views</span>
                        <span>•</span>
                        <span>E-Book</span>
                      </div>
                      <Badge variant="outline" className="border-green-500/20 text-green-600 bg-green-500/5">Book</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            )}
            <div className="text-center mt-8">
              <Link href="/books">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  See More E-Books <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />





      {/* Contact Section */}
        <div className="bg-white dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-400 mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Get in touch with us for any questions or inquiries about Islamic teachings and our platform.</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                        <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">Email</p>
                        <p className="text-gray-600 dark:text-gray-300">info@islamicscholar.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                        <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">Phone</p>
                        <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">Address</p>
                        <p className="text-gray-600 dark:text-gray-300">123 Islamic Center St.<br />Knowledge City, KC 12345</p>
                      </div>
                    </div>
                  </div>
                </div>
                

              </div>
            </div>
          </div>
        </div>

       <hr className="border-gray-200 dark:border-gray-700" />
 
        {/* Footer */}
       <footer className="bg-green-800 dark:bg-gray-800 text-white py-12">
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
              <p className="text-green-100 mb-4 max-w-md">
                Dedicated to spreading authentic Islamic knowledge and teachings through modern digital platforms.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-amber-400">Quick Links</h4>
              <ul className="space-y-2 text-green-100">
                <li><Link href="/articles" className="hover:text-amber-400 transition-colors">Articles</Link></li>
                <li><Link href="/videos" className="hover:text-amber-400 transition-colors">Videos</Link></li>
                <li><Link href="/books" className="hover:text-amber-400 transition-colors">Books</Link></li>
                <li><Link href="/hadiths" className="hover:text-amber-400 transition-colors">Hadiths</Link></li>
                <li><Link href="/ayats" className="hover:text-amber-400 transition-colors">Ayats</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-amber-400">Connect</h4>
              <ul className="space-y-2 text-green-100">
                <li><Link href="/bio" className="hover:text-amber-400 transition-colors">About Scholar</Link></li>
                <li><Link href="/chat" className="hover:text-amber-400 transition-colors">Live Chat</Link></li>
                <li><a href="mailto:info@islamicscholar.com" className="hover:text-amber-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-green-700 mt-8 pt-8 text-center">
            <p className="text-green-100">
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
            className="rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <MessageSquare className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </Link>
    </div>
  )
}