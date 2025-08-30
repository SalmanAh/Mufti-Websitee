"use client"

import { useState } from "react"
import { ContentCard } from "./content-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface ContentGridProps {
  content: any[]
  type: "article" | "video" | "book" | "lecture"
  categories: string[]
}

export function ContentGrid({ content, type, categories }: ContentGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredContent = content
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.excerpt || item.description || "").toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case "popular":
          return b.views - a.views
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-6 bg-card rounded-lg border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${type}s...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="title">Title A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="text-muted-foreground">
        Showing {filteredContent.length} of {content.length} {type}s
      </div>

      {/* Content Grid */}
      {filteredContent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.title}
              excerpt={item.excerpt}
              description={item.description}
              author={item.author?.full_name || "Unknown Author"}
              category={item.category?.name || "Uncategorized"}
              views={item.views}
              createdAt={item.created_at}
              featuredImage={item.featured_image}
              thumbnailUrl={item.thumbnail_url}
              coverImage={item.cover_image}
              duration={item.duration}
              downloads={item.downloads}
              type={type}
              featured={item.featured}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg">No {type}s found matching your criteria.</div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
