"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Video, FileText, Star, Users, Eye } from "lucide-react"
import Link from "next/link"

const stats = [
  { icon: FileText, label: "Articles", value: "500+" },
  { icon: Video, label: "Videos", value: "200+" },
  { icon: BookOpen, label: "Books", value: "50+" },
  { icon: Users, label: "Students", value: "10K+" },
]

const featuredContent = [
  {
    type: "article",
    title: "Understanding the Quran in Modern Context",
    excerpt: "A comprehensive guide to interpreting Quranic verses in contemporary times...",
    author: "Dr. Ahmad Ghamidi",
    views: "2.5K",
    category: "Quran Studies",
  },
  {
    type: "video",
    title: "The Essence of Islamic Spirituality",
    excerpt: "Exploring the deeper meanings of Islamic practices and their spiritual significance...",
    author: "Dr. Ahmad Ghamidi",
    views: "5.2K",
    category: "Spirituality",
  },
  {
    type: "lecture",
    title: "Contemporary Islamic Jurisprudence",
    excerpt: "Modern applications of Islamic law in today's world...",
    author: "Dr. Ahmad Ghamidi",
    views: "3.8K",
    category: "Fiqh",
  },
]

export function HeroSection() {
  const [currentQuote, setCurrentQuote] = useState(0)

  const quotes = [
    "Seek knowledge from the cradle to the grave",
    "The ink of the scholar is more sacred than the blood of the martyr",
    "Knowledge is the treasure of a wise man",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-[url('/islamic-geometric-pattern.png')] opacity-5 bg-repeat"></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary/20 rotate-45 animate-geometric-float"></div>
      <div
        className="absolute top-40 right-20 w-12 h-12 bg-accent/10 rounded-full animate-geometric-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-8 h-8 border-2 border-accent/30 animate-geometric-float"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm font-medium">
                ✨ Islamic Knowledge Platform
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                Discover the
                <span className="text-primary block">Beauty of Islam</span>
                Through Knowledge
              </h1>

              <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                Explore comprehensive Islamic teachings, contemporary interpretations, and scholarly insights from
                renowned Islamic scholar Dr. Javed Ahmad Ghamidi and other distinguished scholars.
              </p>
            </div>

            {/* Rotating Quote */}
            <div className="p-6 bg-card border border-border/50 rounded-xl backdrop-blur-sm">
              <blockquote className="text-lg italic text-foreground/90 text-center">
                "{quotes[currentQuote]}"
              </blockquote>
              <div className="flex justify-center mt-2">
                {quotes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 mx-1 rounded-full transition-colors ${
                      index === currentQuote ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/articles">
                <Button size="lg" className="w-full sm:w-auto group">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/videos">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Watch Videos
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center space-y-2">
                    <div className="flex justify-center">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Featured Content */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Featured Content</h2>
              <p className="text-muted-foreground">Latest insights and teachings</p>
            </div>

            <div className="space-y-4">
              {featuredContent.map((content, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer border-border/50 backdrop-blur-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {content.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="h-3 w-3 mr-1" />
                        {content.views}
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors text-balance">
                      {content.title}
                    </h3>

                    <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{content.excerpt}</p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-medium">{content.author}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/articles">
                <Button variant="outline" className="group bg-transparent">
                  View All Content
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
