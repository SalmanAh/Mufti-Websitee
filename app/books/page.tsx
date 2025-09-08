'use client'

import { Navigation } from "@/components/navigation"
import { BookOpen, Download, Star, Calendar, User, Search, Filter, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"

interface BookData {
  id: string;
  title: string;
  slug: string;
  description?: string;
  cover_image?: string;
  pdf_url?: string;
  pdf_url1?: string;
  author_id: string;
  category_id: string;
  published: boolean;
  featured: boolean;
  downloads: number;
  created_at: string;
  updated_at: string;
  thumbnail_url?: string;
  categories?: {
    name: string;
  };
  users?: {
    full_name: string;
  };
}

export default function BooksPage() {
  const [books, setBooks] = useState<BookData[]>([])
  const [filteredBooks, setFilteredBooks] = useState<BookData[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [openDropdowns, setOpenDropdowns] = useState<{[key: string]: boolean}>({})
  const supabase = createClient()

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    filterBooks()
  }, [books, selectedCategory, searchQuery])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-container')) {
        setOpenDropdowns({})
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchBooks = async () => {
    const { data: books, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching books:', error);
    } else {
      setBooks(books || [])
    }
    setLoading(false)
  }

  const filterBooks = () => {
    let filtered = books

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(book => book.categories?.name === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(book => 
        book.title?.toLowerCase().includes(query) ||
        book.users?.full_name?.toLowerCase().includes(query) ||
        book.description?.toLowerCase().includes(query) ||
        book.categories?.name?.toLowerCase().includes(query)
      )
    }

    setFilteredBooks(filtered)
  }

  // Extract unique categories for filtering
  const categories = ['All', ...Array.from(new Set(books?.map(book => book.categories?.name).filter(Boolean)))] as string[]
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
                    placeholder="Search books by title, author, or category..." 
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

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-16">
              <BookOpen className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Loading Books...</h3>
              <p className="text-muted-foreground text-lg">Please wait while we fetch the latest Islamic books.</p>
            </div>
          ) : filteredBooks && filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <Card key={book.id} className="group hover:shadow-md transition-all duration-200 overflow-hidden border border-black dark:border-white bg-card dark:bg-gray-800">
                {/* Thumbnail */}
                <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                  {book.thumbnail_url ? (
                    <Image
                      src={book.thumbnail_url}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-orange-400" />
                    </div>
                  )}
                </div>
                <CardContent className="p-6 space-y-4">
                  {/* Header with Category and Featured Badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-orange-200 text-orange-500 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400 font-urdu">
                      {book.categories?.name || 'Book'}
                    </Badge>
                    {book.featured && (
                      <Badge className="bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Title and Author */}
                  <div>
                    <h3 className="font-bold text-xl line-clamp-2 group-hover:text-indigo-600 transition-colors mb-3 font-arabic urdu-text">
                      {book.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{book.users?.full_name || 'Islamic Scholar'}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed font-arabic urdu-text">
                    {book.description || 'A comprehensive Islamic book covering important religious topics and teachings.'}
                  </p>

                  {/* Additional Information */}
                  <div className="space-y-2">
                    {book.language && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>Language: {book.language}</span>
                      </div>
                    )}
                    {book.pages && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{book.pages} pages</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{(book.downloads || 0).toLocaleString()} downloads</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(book.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    {(book.pdf_url || book.pdf_url1) && (
                      <div className="relative w-full dropdown-container">
                        <Button 
                          onClick={() => {
                            const dropdownKey = `book-${index}`;
                            setOpenDropdowns(prev => ({
                              ...prev,
                              [dropdownKey]: !prev[dropdownKey]
                            }));
                          }}
                          className="w-full bg-orange-400 hover:bg-orange-500 text-white flex items-center justify-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          View PDF
                          <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns[`book-${index}`] ? 'rotate-180' : ''}`} />
                        </Button>
                        {openDropdowns[`book-${index}`] && (
                            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[999]">
                              {book.pdf_url1 && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.open(book.pdf_url1, '_blank');
                                    setOpenDropdowns(prev => ({ ...prev, [`book-${index}`]: false }));
                                  }}
                                  className="w-full px-4 py-3 text-left hover:bg-gray-100 hover:shadow-sm cursor-pointer flex items-center gap-2 border-b border-gray-100 last:border-b-0 transition-all duration-200"
                                >
                                  <Download className="h-4 w-4 text-orange-500" />
                                  <span className="font-medium">{book.title} - Part 2</span>
                                </button>
                              )}
                              {book.pdf_url && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.open(book.pdf_url, '_blank');
                                    setOpenDropdowns(prev => ({ ...prev, [`book-${index}`]: false }));
                                  }}
                                  className="w-full px-4 py-3 text-left hover:bg-gray-100 hover:shadow-sm cursor-pointer flex items-center gap-2 border-b border-gray-100 last:border-b-0 transition-all duration-200"
                                >
                                  <Download className="h-4 w-4 text-orange-500" />
                                  <span className="font-medium">{book.title} - Part 1</span>
                                </button>
                              )}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <BookOpen className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">
                {searchQuery || selectedCategory !== 'All' 
                  ? 'No Books Match Your Search' 
                  : 'No Books Found'}
              </h3>
              <p className="text-muted-foreground text-lg">
                {searchQuery || selectedCategory !== 'All'
                  ? 'Try adjusting your search criteria or browse all categories.'
                  : 'Check back later for new Islamic books and literature.'}
              </p>
            </div>
          )}
        </div>


      </div>
    </div>
  )
}
