export const dynamic = 'force-dynamic'

import { Navigation } from "@/components/navigation"
// COMMENTED OUT: Server-side Supabase implementation using placeholder environment variables
// import { createClient } from "@/lib/supabase/server"
import { FileText, Star, Calendar, User, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Dummy articles data with real Islamic content
const dummyArticles = [
  {
    id: 1,
    title: "Understanding the Concept of Tawheed in Modern Context",
    excerpt: "An in-depth exploration of monotheism and its relevance in contemporary Islamic thought and practice.",
    author: "Dr. Ahmad Hassan",
    category: "Theology",
    views: 2847,
    createdAt: "2024-01-15",
    featuredImage: "/islamic-calligraphy-and-geometric-patterns.png",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "The Role of Women in Early Islamic Society",
    excerpt: "Examining the historical contributions and status of women during the time of Prophet Muhammad (PBUH).",
    author: "Prof. Fatima Al-Zahra",
    category: "History",
    views: 1923,
    createdAt: "2024-01-12",
    featuredImage: "/islamic-architecture-mosque-interior.png",
    readTime: "12 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Principles of Islamic Finance and Banking",
    excerpt: "Understanding Sharia-compliant financial systems and their implementation in modern banking.",
    author: "Dr. Muhammad Yusuf",
    category: "Finance",
    views: 3156,
    createdAt: "2024-01-10",
    featuredImage: "/islamic-geometric-patterns-gold-and-green.png",
    readTime: "15 min read",
    featured: true,
  },
  {
    id: 4,
    title: "The Science of Hadith Authentication",
    excerpt: "Methods and criteria used by scholars to verify the authenticity of prophetic traditions.",
    author: "Sheikh Abdullah Rahman",
    category: "Hadith Studies",
    views: 1654,
    createdAt: "2024-01-08",
    featuredImage: "/arabic-manuscript-and-books.png",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Islamic Ethics in Medical Practice",
    excerpt: "Exploring the intersection of Islamic principles with modern medical ethics and bioethics.",
    author: "Dr. Aisha Malik",
    category: "Ethics",
    views: 2234,
    createdAt: "2024-01-05",
    featuredImage: "/medical-symbols-with-islamic-motifs.png",
    readTime: "11 min read",
    featured: false,
  },
  {
    id: 6,
    title: "The Philosophy of Islamic Education",
    excerpt: "Understanding the holistic approach to education in Islamic tradition and its modern applications.",
    author: "Prof. Omar Faruq",
    category: "Education",
    views: 1876,
    createdAt: "2024-01-03",
    featuredImage: "/islamic-school-students-learning.png",
    readTime: "9 min read",
    featured: false,
  },
]

export default async function ArticlesPage() {
  // COMMENTED OUT: Server-side data fetching
  // const supabase = await createClient()

  // // Fetch articles with author and category info
  // const { data: articles } = await supabase
  //   .from("articles")
  //   .select(`
  //     *,
  //     author:profiles(full_name),
  //     category:categories(name)
  //   `)
  //   .eq("published", true)
  //   .order("created_at", { ascending: false })

  // // Fetch categories
  // const { data: categories } = await supabase.from("categories").select("name").order("name")

  // Temporary placeholder data for development
  const articles = dummyArticles
  const categoryNames = ["Theology", "History", "Finance", "Hadith Studies", "Ethics", "Education"]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-balance">Islamic Articles</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Explore in-depth articles on Islamic theology, contemporary issues, and scholarly interpretations
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(articles || dummyArticles).map((article) => (
            <Card key={article.id} className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <Image
                  src={article.featuredImage || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {article.featured && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                    {article.readTime}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-0">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">{article.category}</Badge>
                  </div>

                  <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{article.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button asChild className="w-full mt-4">
                    <Link href={`/articles/${article.id}`}>Read Article</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
