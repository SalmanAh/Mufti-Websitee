'use client'

import { Navigation } from "@/components/navigation"
import { BookOpen, Download, Star, Calendar, User, Search, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"

interface BookData {
  id: string;
  title: string;
  slug: string;
  description?: string;
  cover_image?: string;
  pdf_url?: string;
  author_id: string;
  category_id: string;
  published: boolean;
  featured: boolean;
  downloads: number;
  created_at: string;
  updated_at: string;
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
  const supabase = createClient()

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    filterBooks()
  }, [books, selectedCategory, searchQuery])

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      {/* Hero Section */}
       <div className="relative bg-gradient-to-br from-indigo-700 via-purple-800 to-blue-900 text-white py-20 overflow-hidden">
         <div className="absolute inset-0 bg-[url('/arabic-manuscript-and-books.png')] bg-cover bg-center opacity-20"></div>
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-blue-900/80"></div>
         <div className="container mx-auto px-4 relative z-10">
           <div className="text-center space-y-6">
             <div className="flex justify-center">
               <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                 <BookOpen className="h-16 w-16 text-indigo-200" />
               </div>
             </div>
             <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
               Islamic Books
             </h1>
             <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
               Discover authentic Islamic literature and expand your knowledge with our curated collection
             </p>
           </div>
         </div>
       </div>

      {/* Search and Filter Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-indigo-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search books by title, author, or category..." 
                    className="pl-10 border-indigo-200 focus:border-indigo-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
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
                    ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer" 
                    : "border-indigo-200 text-indigo-700 hover:bg-indigo-50 cursor-pointer"
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
            filteredBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-2">
                <CardContent className="p-6 space-y-4">
                  {/* Header with Category and Featured Badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-indigo-500/20 text-indigo-600 bg-indigo-500/5">
                      {book.categories?.name || 'Book'}
                    </Badge>
                    {book.featured && (
                      <Badge className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Title and Author */}
                  <div>
                    <h3 className="font-bold text-xl line-clamp-2 group-hover:text-indigo-600 transition-colors mb-3">
                      {book.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{book.users?.full_name || 'Islamic Scholar'}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
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
                    <Link href={`/books/${book.id}`} className="flex-1">
                      <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    {book.pdf_url && (
                      <Button 
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(book.pdf_url, '_blank');
                        }}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        View PDF
                      </Button>
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

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3">
            Load More Books
          </Button>
        </div>
      </div>
    </div>
  )
}
