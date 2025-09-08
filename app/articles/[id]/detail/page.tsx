import { Navigation } from "@/components/navigation"
import { createClient } from "@/lib/supabase/server"
import { FileText, Calendar, User, Eye, ArrowLeft, Share2, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  views: number;
  created_at: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !article) {
    notFound();
  }

  // Increment view count
  await supabase
    .from('articles')
    .update({ views: (article.views || 0) + 1 })
    .eq('id', id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-700 via-teal-800 to-green-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/islamic-calligraphy-and-geometric-patterns.png')] bg-cover bg-center opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-900/70 to-green-900/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/articles" className="inline-flex items-center text-emerald-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
            
            {/* Article Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-emerald-600 text-white">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Article
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent drop-shadow-lg leading-tight font-arabic urdu-text">
                {article.title}
              </h1>
              

              
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-emerald-200">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{(article.views || 0) + 1} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-emerald-100 shadow-xl">
            <CardContent className="p-8">

              
              {/* Article Content */}
              <div className="prose prose-2xl prose-emerald max-w-none">
                <div 
                  className="text-gray-800 leading-relaxed text-2xl font-arabic urdu-text"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
              
              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-emerald-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <p><strong>Published:</strong> {new Date(article.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                  
                  <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Article
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Navigation */}
          <div className="mt-8 text-center">
            <Link href="/articles">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const supabase = await createClient();
  const { id } = await params;
  
  const { data: article } = await supabase
    .from('articles')
    .select('title')
    .eq('id', id)
    .single();

  if (!article) {
    return {
      title: 'Article Not Found'
    };
  }

  return {
    title: `${article.title} | Islamic Articles`,
    description: article.title,
    openGraph: {
      title: article.title,
      description: article.title,
    },
  };
}