"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Clock, Download, Play, BookOpen, Mic } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ContentCardProps {
  id: string
  title: string
  excerpt?: string
  description?: string
  author: string
  category: string
  views: number
  createdAt: string
  featuredImage?: string
  thumbnailUrl?: string
  coverImage?: string
  duration?: number
  downloads?: number
  type: "article" | "video" | "book" | "lecture"
  featured?: boolean
}

export function ContentCard({
  id,
  title,
  excerpt,
  description,
  author,
  category,
  views,
  createdAt,
  featuredImage,
  thumbnailUrl,
  coverImage,
  duration,
  downloads,
  type,
  featured = false,
}: ContentCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "book":
        return <BookOpen className="h-4 w-4" />
      case "lecture":
        return <Mic className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "video":
        return "bg-red-500/10 text-red-700 dark:text-red-300"
      case "book":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300"
      case "lecture":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-300"
      default:
        return "bg-green-500/10 text-green-700 dark:text-green-300"
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  const imageUrl = featuredImage || thumbnailUrl || coverImage

  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${
        featured ? "ring-2 ring-primary/20 shadow-lg" : ""
      }`}
    >
      {/* Image/Thumbnail */}
      {imageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            </div>
          )}
          {duration && (
            <div className="absolute bottom-3 right-3">
              <Badge variant="secondary" className="bg-black/70 text-white">
                <Clock className="h-3 w-3 mr-1" />
                {formatDuration(duration)}
              </Badge>
            </div>
          )}
        </div>
      )}

      <CardContent className="px-6 pb-6 pt-0 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={getTypeColor()}>
            {getTypeIcon()}
            <span className="ml-1 capitalize">{type}</span>
          </Badge>
          <Badge variant="secondary">{category}</Badge>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-balance group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Description/Excerpt */}
        <p className="text-muted-foreground text-pretty line-clamp-3">{excerpt || description}</p>

        {/* Author */}
        <div className="text-sm font-medium text-primary">By {author}</div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {views.toLocaleString()}
            </div>
            {downloads !== undefined && (
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                {downloads.toLocaleString()}
              </div>
            )}
          </div>
          <div>{new Date(createdAt).toLocaleDateString()}</div>
        </div>

        {/* Action Button */}
        <Link href={`/${type}s/${id}`}>
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            {type === "book"
              ? "Read Book"
              : type === "video"
                ? "Watch Video"
                : type === "lecture"
                  ? "Listen"
                  : "Read Article"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
