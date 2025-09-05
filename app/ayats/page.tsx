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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-600 to-amber-700 text-white py-20">
        <div className="absolute inset-0 bg-[url('/islamic-calligraphy-and-geometric-patterns.png')] opacity-10 bg-repeat"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Quranic Verses</h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Discover the divine wisdom and guidance from the Holy Quran
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-amber-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search verses by text, surah, or theme..." 
                  className="pl-10 border-amber-200 focus:border-amber-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
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
                  ? "bg-amber-600 hover:bg-amber-700 cursor-pointer" 
                  : "border-amber-200 text-amber-700 hover:bg-amber-50 cursor-pointer"
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
              <div className="text-amber-600">Loading ayats...</div>
            </div>
          ) : filteredAyats && filteredAyats.length > 0 ? (
            filteredAyats.map((ayat) => (
              <Card key={ayat.id} className="hover:shadow-xl transition-all duration-300 border-amber-100 hover:border-amber-300 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                        {ayat.category || 'Ayat'}
                      </Badge>
                      <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">
                        {ayat.revelation || 'Quran'}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg text-amber-800">
                    {ayat.address}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Arabic Text */}
                  <div className="text-right p-6 bg-gradient-to-r from-amber-50 to-green-50 rounded-lg border border-amber-200">
                    <div 
                      className="text-2xl font-arabic text-amber-800 leading-relaxed prose prose-xl max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: ayat.arabic_text || ''
                      }}
                    />
                  </div>
                  
                  {/* Urdu Translation */}
                  {ayat.translation_urdu && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-sm font-medium text-green-700 mb-1">Urdu Translation:</p>
                      <div 
                        className="text-green-800 prose prose-sm max-w-none text-right"
                        style={{fontFamily: 'Noto Nastaliq Urdu, serif'}}
                        dangerouslySetInnerHTML={{
                          __html: `"${ayat.translation_urdu}"`
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Translation */}
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-sm font-medium text-amber-700 mb-1">Translation:</p>
                    <div 
                      className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: `"${ayat.translation_eng}"`
                      }}
                    />
                  </div>

                  {/* Source Information */}
                  <div className="text-xs text-gray-500 space-y-1 pt-2 border-t border-amber-100">
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
                  <div className="flex gap-2 pt-2 border-t border-amber-100">
                    <Button asChild className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-sm py-2">
                      <Link href={`/ayats/${ayat.id}/detail`}>
                        View Tafseer
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                      <Share2 className="h-4 w-4" />
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

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
            Load More Ayats
          </Button>
        </div>
      </div>
    </div>
  )
}