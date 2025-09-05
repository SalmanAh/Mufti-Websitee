"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, Clock, Download, Share2, BookmarkPlus, ArrowLeft, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getYouTubeThumbnail, getYouTubeEmbedUrl, isYouTubeUrl } from "@/lib/youtube-utils"

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
    youtube_link?: string
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

      {/* Header */}
      <div className="space-y-8">
        {/* Featured Image */}
        {imageUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-emerald-100">
            <Image src={imageUrl || "/placeholder.svg"} alt={content.title} fill className="object-cover" />
            {content.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-emerald-600 text-white shadow-lg">Featured</Badge>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        )}

        {/* Video Player */}
        {type === "video" && (content.youtube_link || content.video_url) && (
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border border-emerald-100">
            {isYouTubeUrl(content.youtube_link || content.video_url || '') ? (
              <iframe
                src={getYouTubeEmbedUrl(content.youtube_link || content.video_url || '')}
                title={content.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video controls className="w-full h-full" poster={getYouTubeThumbnail(content.youtube_link || content.video_url || '') || content.thumbnail_url}>
                <source src={content.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        {/* Audio Player */}
        {type === "lecture" && content.audio_url && (
          <Card className="border-emerald-100 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-emerald-800">Audio Lecture</h3>
              </div>
              <audio controls className="w-full">
                <source src={content.audio_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </CardContent>
          </Card>
        )}

        {/* Article Content Card */}
        <Card className="border-emerald-100 shadow-lg bg-white">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{content.category.name}</Badge>
                {content.duration && (
                  <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDuration(content.duration)}
                  </Badge>
                )}
              </div>

              {content.description && (
                <div className="text-lg text-gray-700 leading-relaxed border-l-4 border-emerald-200 pl-4 bg-emerald-50/50 py-3 rounded-r-lg">
                  {content.description}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 pt-4 border-t border-emerald-100">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-emerald-600" />
                  <span className="font-medium text-emerald-800">{content.author.full_name}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1 text-emerald-600" />
                  {content.views.toLocaleString()} views
                </div>
                {content.downloads !== undefined && (
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1 text-emerald-600" />
                    {content.downloads.toLocaleString()} downloads
                  </div>
                )}
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-emerald-600" />
                  {new Date(content.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Save Article
                </Button>
                <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                {content.pdf_url && (
                  <Link href={content.pdf_url} target="_blank">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-emerald-100 shadow-lg bg-white">
        <CardContent className="p-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {content.content && (
              <div className="text-pretty leading-relaxed" dangerouslySetInnerHTML={{ __html: content.content }} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Author Information */}
      <Card className="border-emerald-100 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50">
        <CardContent className="p-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-100 rounded-full">
              <User className="h-6 w-6 text-emerald-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">About the Author</h3>
              <h4 className="text-lg font-medium text-emerald-700 mb-3">{content.author.full_name}</h4>
              <p className="text-gray-700 leading-relaxed">
                {content.author.full_name} is a renowned Islamic scholar with extensive knowledge in Islamic theology, 
                jurisprudence, and contemporary issues. Their scholarly work contributes to the understanding and 
                practice of Islam in the modern world.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
