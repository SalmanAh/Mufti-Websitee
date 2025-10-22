"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { createClient } from "@/lib/supabase/client"
import { BookOpen, Search, Filter, Calendar, User, Eye, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { htmlToPlainText } from "@/lib/utils"

interface Article {
  id: string
  title: string
  author: string
  content: string
  views: number
  created_at: string
  thumbnail_url?: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching articles:', error)
          return
        }

        setArticles(data || [])
        setFilteredArticles(data || [])
      } catch (error) {
        console.error('Error in fetchArticles:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const filtered = articles.filter(article => 
        article.title?.toLowerCase().includes(query) ||
        article.author?.toLowerCase().includes(query) ||
        htmlToPlainText(article.content || '').toLowerCase().includes(query)
      )
      setFilteredArticles(filtered)
    } else {
      setFilteredArticles(articles)
    }
  }, [articles, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-xl shadow-lg p-6 mb-8 border border-orange-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search articles by title, author, or content..." 
                  className="pl-10 border-orange-100 focus:border-orange-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" className="border-orange-200 text-orange-500 hover:bg-orange-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge 
              variant="default"
              className="bg-orange-400 hover:bg-orange-500 font-urdu"
            >
              All
            </Badge>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredArticles && filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Card key={article.id} className="h-full hover:shadow-md transition-all duration-200 border border-black dark:border-white bg-card dark:bg-gray-800 overflow-hidden">
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
                <CardContent className="p-4 flex flex-col h-full">
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 dark:text-white text-xl leading-tight mb-2 line-clamp-2 font-urdu">
                    {article.title}
                  </h3>
                  
                  {/* Author */}
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-base mb-2">
                    <User className="h-4 w-4 mr-1" />
                    <span className="font-urdu">{article.author}</span>
                  </div>
                  
                  {/* Content Preview */}
                  <p className="text-gray-600 dark:text-gray-300 text-base line-clamp-3 mb-3 flex-grow font-urdu">
                    {htmlToPlainText(article.content || '', 150)}
                  </p>
                  
                  {/* Views and Date */}
                  <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm mb-3">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{(article.views || 0).toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {/* View Article Button */}
                  <Link href={`/articles/${article.id}/detail`} className="w-full">
                    <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Article
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
              <p className="text-muted-foreground">There are no published articles available at the moment.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        
      </div>
    </div>
  )
}