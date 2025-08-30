import { Navigation } from "@/components/navigation"
import { createClient } from "@/lib/supabase/server"
import { BookOpen, Download, Star, Calendar, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Dummy books data with Islamic scholarly works
const dummyBooks = [
  {
    id: 1,
    title: "The Sealed Nectar (Ar-Raheeq Al-Makhtum)",
    description: "A comprehensive biography of Prophet Muhammad (PBUH) - Winner of the World Muslim League Prize.",
    author: "Safi-ur-Rahman al-Mubarakpuri",
    category: "Biography",
    downloads: 15420,
    createdAt: "2024-01-20",
    coverImage: "/arabic-manuscript-and-books.png",
    pages: 635,
    language: "English",
    featured: true,
    rating: 4.9,
  },
  {
    id: 2,
    title: "Tafsir Ibn Kathir (Abridged)",
    description: "One of the most respected and accepted explanations of the Quran in the world today.",
    author: "Ibn Kathir",
    category: "Tafsir",
    downloads: 23156,
    createdAt: "2024-01-18",
    coverImage: "/quran-open-pages-with-arabic-text.png",
    pages: 2847,
    language: "English/Arabic",
    featured: true,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Fortress of the Muslim (Hisn al-Muslim)",
    description: "A collection of authentic supplications and remembrances from the Quran and Sunnah.",
    author: "Sa'id ibn Ali ibn Wahf Al-Qahtani",
    category: "Dua & Dhikr",
    downloads: 18934,
    createdAt: "2024-01-15",
    coverImage: "/islamic-calligraphy-allah-names-golden.png",
    pages: 256,
    language: "English/Arabic",
    featured: false,
    rating: 4.7,
  },
  {
    id: 4,
    title: "The Fundamentals of Tawheed",
    description: "An essential guide to understanding Islamic monotheism and its practical implications.",
    author: "Dr. Abu Ameenah Bilal Philips",
    category: "Theology",
    downloads: 12678,
    createdAt: "2024-01-12",
    coverImage: "/islamic-geometric-patterns-gold-and-green.png",
    pages: 198,
    language: "English",
    featured: false,
    rating: 4.6,
  },
  {
    id: 5,
    title: "Women in Islam",
    description: "A comprehensive study of the status and rights of women in Islamic society.",
    author: "Dr. Jamal Badawi",
    category: "Social Issues",
    downloads: 9876,
    createdAt: "2024-01-10",
    coverImage: "/islamic-art-with-feminine-motifs.png",
    pages: 324,
    language: "English",
    featured: false,
    rating: 4.5,
  },
  {
    id: 6,
    title: "Islamic Finance: Theory and Practice",
    description: "A detailed examination of Islamic banking and finance principles in modern context.",
    author: "Dr. Muhammad Taqi Usmani",
    category: "Finance",
    downloads: 7543,
    createdAt: "2024-01-08",
    coverImage: "/islamic-geometric-patterns-with-gold-coins.png",
    pages: 412,
    language: "English",
    featured: false,
    rating: 4.4,
  },
]

export default async function BooksPage() {
  const supabase = await createClient()

  // Fetch books with author and category info
  const { data: books } = await supabase
    .from("books")
    .select(`
      *,
      author:profiles(full_name),
      category:categories(name)
    `)
    .eq("published", true)
    .order("created_at", { ascending: false })

  // Fetch categories
  const { data: categories } = await supabase.from("categories").select("name").order("name")

  const categoryNames = categories?.map((c) => c.name) || []

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <div className="p-4 bg-blue-500/10 rounded-full">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-balance">Islamic Books</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Access a comprehensive library of Islamic books, translations, and scholarly works
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(books || dummyBooks).map((book) => (
            <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                  <Image
                    src={book.coverImage || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {book.featured && (
                    <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {book.pages} pages
                      </Badge>
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {book.language}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {book.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{book.author}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{book.description}</p>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{book.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{book.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{book.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/books/${book.id}`}>Read Online</Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
