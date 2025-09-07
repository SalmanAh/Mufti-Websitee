'use client'

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Filter, Heart, Eye, Calendar, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useState, useEffect } from "react"

// Interface for Ayat data from database
interface AyatData {
  id: string
  address: string
  revelation: string
  category: string
  arabic_text: string
  translation_eng: string
  translation_urdu: string
  tafseer_eng: string
  tafseer_urdu: string
  author_id?: string
  slug: string
  published: boolean
  featured: boolean
  views: number
  created_at: string
  updated_at: string
  users?: {
    full_name: string
  }
}

export default function AyatsPage() {
  const [ayats, setAyats] = useState<AyatData[]>([])
  const [filteredAyats, setFilteredAyats] = useState<AyatData[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchAyats()
  }, [])

  useEffect(() => {
    filterAyats()
  }, [ayats, selectedCategory, searchQuery])

  const fetchAyats = async () => {
    const { data, error } = await supabase
      .from('ayats')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching ayats:', error)
    } else {
      setAyats(data || [])
    }
    setLoading(false)
  }

  const filterAyats = () => {
    let filtered = ayats

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(ayat => ayat.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(ayat => 
        ayat.arabic_text?.toLowerCase().includes(query) ||
        ayat.translation_eng?.toLowerCase().includes(query) ||
        ayat.translation_urdu?.toLowerCase().includes(query) ||
        ayat.address?.toLowerCase().includes(query) ||
        ayat.category?.toLowerCase().includes(query)
      )
    }

    setFilteredAyats(filtered)
  }

  // Extract unique categories
  const categories = ['All', ...new Set(ayats.map(ayat => ayat.category).filter(Boolean))]

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
                  placeholder="Search verses by text, surah, or theme..." 
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
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category 
                  ? "bg-orange-400 hover:bg-orange-500 cursor-pointer"
                : "border-orange-200 text-orange-500 hover:bg-orange-50 cursor-pointer"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Ayats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="text-orange-400">Loading ayats...</div>
            </div>
          ) : filteredAyats && filteredAyats.length > 0 ? (
            filteredAyats.map((ayat) => (
              <Card key={ayat.id} className="hover:shadow-md transition-all duration-200 border border-black dark:border-white bg-card dark:bg-gray-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 font-urdu">
                        {ayat.category || 'Ayat'}
                      </Badge>
                      <Badge variant="outline" className="border-orange-300 text-orange-600 bg-orange-100 font-urdu">
                        {ayat.revelation || 'Quran'}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg text-orange-500 dark:text-orange-400">
                    {ayat.address}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Arabic Text */}
                  <div className="text-right p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                    <div 
                      className="text-xl font-arabic text-orange-500 leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: ayat.arabic_text || ''
                      }}
                    />
                  </div>
                  
                  {/* Urdu Translation */}
                  {ayat.translation_urdu && (
                    <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg border border-orange-200 dark:border-orange-700">
                    <p className="text-sm font-medium text-orange-600 mb-1">Urdu Translation:</p>
                      <div 
                        className="text-orange-600 prose prose-sm max-w-none text-right"
                        style={{fontFamily: 'Noto Nastaliq Urdu, serif'}}
                        dangerouslySetInnerHTML={{
                          __html: `"${ayat.translation_urdu}"`
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Translation */}
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg border border-orange-200 dark:border-orange-700">
                    <p className="text-sm font-medium text-orange-600 mb-1">Translation:</p>
                    <div 
                      className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: `"${ayat.translation_eng}"`
                      }}
                    />
                  </div>

                  {/* Source Information */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 pt-2 border-t border-orange-100 dark:border-orange-800">
                    <div><span className="font-medium text-orange-500">Reference:</span> {ayat.address}</div>
                    {ayat.tafseer_eng && (
                        <div><span className="font-medium text-orange-500">Tafseer:</span> Available</div>
                      )}
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span className="font-medium text-orange-500">Views:</span> {ayat.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className="font-medium text-orange-500">Date:</span> {new Date(ayat.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-orange-100 dark:border-orange-800">
                    <Button asChild className="flex-1 bg-orange-400 hover:bg-orange-500 text-white text-sm py-2">
                      <Link href={`/ayats/${ayat.id}/detail`}>
                        View Tafseer
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Ayats Found</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== 'All' 
                  ? 'No ayats found matching your criteria.' 
                  : 'There are no published ayats available at the moment.'}
              </p>
            </div>
          )}
        </div>


      </div>
    </div>
  )
}