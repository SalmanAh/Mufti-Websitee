'use client'

import { Navigation } from "@/components/navigation"
import { ContentGrid } from "@/components/content-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Filter, Heart, Eye, Calendar, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useState, useEffect } from "react"

interface HadithData {
  id: string;
  address: string;
  revelation?: string;
  category?: string;
  arabic_text: string;
  translation_eng?: string;
  translation_urdu?: string;
  tafseer_eng?: string;
  tafseer_urdu?: string;
  author_id: string;
  slug: string;
  published: boolean;
  featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  users?: {
    full_name: string;
  };
}

export default function HadithsPage() {
  const [hadiths, setHadiths] = useState<HadithData[]>([])
  const [filteredHadiths, setFilteredHadiths] = useState<HadithData[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchHadiths()
  }, [])

  useEffect(() => {
    filterHadiths()
  }, [hadiths, selectedCategory, searchQuery])

  const fetchHadiths = async () => {
    const { data, error } = await supabase
      .from('hadiths')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching hadiths:', error)
    } else {
      setHadiths(data || [])
    }
    setLoading(false)
  }

  const filterHadiths = () => {
    let filtered = hadiths

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(hadith => hadith.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(hadith => 
        hadith.arabic_text?.toLowerCase().includes(query) ||
        hadith.translation_eng?.toLowerCase().includes(query) ||
        hadith.translation_urdu?.toLowerCase().includes(query) ||
        hadith.address?.toLowerCase().includes(query) ||
        hadith.category?.toLowerCase().includes(query)
      )
    }

    setFilteredHadiths(filtered)
  }

  // Extract unique categories from hadiths
  const categories = ["All", ...new Set(hadiths.map(hadith => hadith.category).filter(Boolean))];

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
                  placeholder="Search hadiths by text, narrator, or topic..." 
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

        {/* Hadiths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="text-orange-400">Loading hadiths...</div>
            </div>
          ) : filteredHadiths && filteredHadiths.length > 0 ? (
            filteredHadiths.map((hadith) => (
              <Card key={hadith.id} className="hover:shadow-md transition-all duration-200 border border-black dark:border-white bg-card dark:bg-gray-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 font-urdu">
                      {hadith.category || 'Hadith'}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{hadith.address}</span>
                  </div>
                  <CardTitle className="text-lg text-orange-500 dark:text-orange-400">{hadith.revelation || hadith.address}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Arabic Text */}
                  <div className="text-right p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                    <div 
                      className="text-lg font-arabic text-orange-500 leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: hadith.arabic_text || ''
                      }}
                    />
                  </div>
                  
                  {/* Translation */}
                  {hadith.translation_eng && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800">
                      <div 
                        className="text-gray-700 dark:text-gray-300 italic leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: `"${hadith.translation_eng}"`
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Source Information */}
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                    <p><span className="font-medium text-orange-500 dark:text-orange-400">Reference:</span> {hadith.address}</p>
            <p><span className="font-medium text-orange-500 dark:text-orange-400">Views:</span> {hadith.views || 0}</p>
            <p><span className="font-medium text-orange-500 dark:text-orange-400">Date:</span> {new Date(hadith.created_at).toLocaleDateString()}</p>
                    {hadith.tafseer_eng && (
                      <p><span className="font-medium text-orange-500 dark:text-orange-400">Tafseer:</span> Available</p>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-orange-100 dark:border-orange-800">
                    <Button asChild className="flex-1 bg-orange-400 hover:bg-orange-500 text-white text-sm py-2">
                      <Link href={`/hadiths/${hadith.id}/detail`}>
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
              <h3 className="text-xl font-semibold mb-2">No Hadiths Found</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== 'All' 
                  ? 'No hadiths found matching your criteria.' 
                  : 'There are no published hadiths available at the moment.'}
              </p>
            </div>
          )}
        </div>


      </div>
    </div>
  )
}