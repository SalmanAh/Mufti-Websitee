"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Video, FileText, MessageCircle, Heart, Mail, Phone, MapPin, MessageSquare, Play, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

const slideImages = [
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
  },
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

const sampleContent = {
  videos: [
    { title: "Understanding Islamic Prayer", author: "Dr. Ahmad Ghamidi", views: "15K", duration: "25:30" },
    { title: "The Pillars of Islam Explained", author: "Sheikh Abdullah", views: "12K", duration: "18:45" },
    { title: "Quranic Recitation Techniques", author: "Qari Muhammad", views: "8K", duration: "32:15" }
  ],
  hadiths: [
    { title: "The Importance of Seeking Knowledge", narrator: "Ibn Majah", category: "Knowledge" },
    { title: "Kindness to Parents", narrator: "At-Tirmidhi", category: "Family" },
    { title: "The Best of People", narrator: "Al-Tabarani", category: "Character" }
  ],
  ayats: [
    { title: "Ayat al-Kursi", surah: "Al-Baqarah", verse: "2:255", theme: "Tawheed" },
    { title: "Opening of Al-Fatiha", surah: "Al-Fatiha", verse: "1:2", theme: "Praise" },
    { title: "Declaration of Unity", surah: "Al-Ikhlas", verse: "112:1", theme: "Unity" }
  ],
  articles: [
    { title: "Modern Islamic Banking Principles", author: "Dr. Sarah Ahmed", category: "Finance", readTime: "8 min" },
    { title: "Women's Rights in Islam", author: "Dr. Fatima Ali", category: "Social Issues", readTime: "12 min" },
    { title: "Environmental Ethics in Islam", author: "Prof. Omar Hassan", category: "Ethics", readTime: "6 min" }
  ],
  books: [
    { title: "Tafseer of Surah Al-Baqarah", author: "Dr. Ahmad Ghamidi", pages: "450", language: "English" },
    { title: "Islamic History: The Golden Age", author: "Prof. Ali Rahman", pages: "320", language: "English" },
    { title: "Principles of Islamic Jurisprudence", author: "Sheikh Abdullah", pages: "280", language: "Arabic" }
  ]
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Slideshow */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-r from-green-100 to-amber-100 dark:from-gray-800 dark:to-gray-700">
        
        {slideImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide ? "translate-x-0" : 
              index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
          >
            <img 
              src={image.src} 
              alt={image.title}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slideImages.map((_, index) => (
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleContent.videos.map((video, index) => (
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
                            {video.duration}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{video.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold line-clamp-2 group-hover:text-green-600 transition-colors">{video.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">By {video.author}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Badge variant="outline" className="border-green-500/20 text-green-600 bg-green-500/5">Educational</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleContent.hadiths.map((hadith, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-2">
                  <div className="relative">
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-amber-600 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                          {hadith.narrator}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold line-clamp-2 group-hover:text-amber-600 transition-colors">{hadith.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">Narrator: {hadith.narrator}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Badge variant="outline" className="border-amber-500/20 text-amber-600 bg-amber-500/5">{hadith.category}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Ayat al-Kursi",
                  description: "The most powerful verse in the Quran, describing Allah's sovereignty and knowledge.",
                  surah: "Al-Baqarah",
                  verse: "255",
                  theme: "Tawheed",
                  text: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence."
                },
                {
                  title: "Opening of Al-Fatiha",
                  description: "The opening chapter of the Quran, known as the essence of the entire Quran.",
                  surah: "Al-Fatiha",
                  verse: "1-2",
                  theme: "Praise",
                  text: "In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds."
                },
                {
                  title: "Declaration of Unity",
                  description: "A profound declaration of Allah's absolute oneness and uniqueness.",
                  surah: "Al-Ikhlas",
                  verse: "1-4",
                  theme: "Unity",
                  text: "Say, He is Allah, the One! Allah, the Eternal, Absolute; He begets not, nor is He begotten; And there is none like unto Him."
                }
              ].map((ayat, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-2">
                  <div className="relative">
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-amber-600 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                          {ayat.surah}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold line-clamp-2 group-hover:text-amber-600 transition-colors">{ayat.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{ayat.description}</p>
                      <p className="text-sm text-muted-foreground mt-2 italic line-clamp-3">"{ayat.text}"</p>
                      <p className="text-xs text-muted-foreground mt-1">{ayat.surah}:{ayat.verse}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Badge variant="outline" className="border-amber-500/20 text-amber-600 bg-amber-500/5">{ayat.theme}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleContent.articles.map((article, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-2">
                  <div className="relative">
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="h-16 w-16 text-amber-600 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                          {article.readTime}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold line-clamp-2 group-hover:text-amber-600 transition-colors">{article.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">By {article.author}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Badge variant="outline" className="border-amber-500/20 text-amber-600 bg-amber-500/5">{article.category}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleContent.books.map((book, index) => (
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
                            {book.pages} pages
                          </Badge>
                          <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                            {book.language}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold line-clamp-2 group-hover:text-green-600 transition-colors">{book.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">By {book.author}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Badge variant="outline" className="border-green-500/20 text-green-600 bg-green-500/5">{book.language}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
                <BookOpen className="h-8 w-8 text-amber-400" />
                <span className="text-2xl font-bold">Islamic Scholar</span>
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