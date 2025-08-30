"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, Clock, Download, Share2, BookmarkPlus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ContentViewerProps {
  content: {
    id: string
    title: string
    content?: string
    description?: string
    author: { full_name: string }
    category: { name: string }
    views: number
    downloads?: number
    duration?: number
    created_at: string
    updated_at: string
    featured_image?: string
    thumbnail_url?: string
    cover_image?: string
    video_url?: string
    audio_url?: string
    pdf_url?: string
  }
  type: "article" | "video" | "book" | "lecture"
}

export function ContentViewer({ content, type }: ContentViewerProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  const imageUrl = content.featured_image || content.thumbnail_url || content.cover_image

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <Link href={`/${type}s`}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {type}s
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-6">
        {/* Image/Video/Audio Player */}
        {imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image src={imageUrl || "/placeholder.svg"} alt={content.title} fill className="object-cover" />
            {content.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
              </div>
            )}
          </div>
        )}

        {/* Video Player */}
        {type === "video" && content.video_url && (
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <video controls className="w-full h-full" poster={content.thumbnail_url}>
              <source src={content.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Audio Player */}
        {type === "lecture" && content.audio_url && (
          <Card>
            <CardContent className="p-6">
              <audio controls className="w-full">
                <source src={content.audio_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </CardContent>
          </Card>
        )}

        {/* Title and Meta */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{content.category.name}</Badge>
            {content.duration && (
              <Badge variant="secondary">
                <Clock className="h-3 w-3 mr-1" />
                {formatDuration(content.duration)}
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-balance">{content.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div>
              By <span className="font-medium text-primary">{content.author.full_name}</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {content.views.toLocaleString()} views
            </div>
            {content.downloads !== undefined && (
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                {content.downloads.toLocaleString()} downloads
              </div>
            )}
            <div>{new Date(content.created_at).toLocaleDateString()}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            {content.pdf_url && (
              <Link href={content.pdf_url} target="_blank">
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {content.description && (
          <div className="text-xl text-muted-foreground mb-8 text-pretty">{content.description}</div>
        )}

        {content.content && <div className="text-pretty" dangerouslySetInnerHTML={{ __html: content.content }} />}
      </div>

      {/* Related Content */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">About the Author</h3>
          <p className="text-muted-foreground">
            {content.author.full_name} is a renowned Islamic scholar with extensive knowledge in Islamic theology and
            contemporary issues.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
