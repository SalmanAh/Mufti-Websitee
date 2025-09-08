import { Navigation } from "@/components/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Eye, Calendar, Share2, Download, Bookmark } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface HadithDetailProps {
  params: {
    id: string;
  };
}

export default async function HadithDetailPage({ params }: HadithDetailProps) {
  const supabase = await createClient();

  // Fetch hadith data
  const { data: hadith, error } = await supabase
    .from('hadiths')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !hadith) {
    notFound();
  }

  // Increment view count
  await supabase
    .from('hadiths')
    .update({ views: (hadith.views || 0) + 1 })
    .eq('id', params.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-700 via-green-800 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link 
                href="/hadiths" 
                className="text-emerald-200 hover:text-white transition-colors"
              >
                Hadiths
              </Link>
              <span className="text-emerald-300">›</span>
              <span className="text-emerald-100">Detail</span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                <BookOpen className="h-8 w-8 text-emerald-200" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 font-arabic urdu-text">
                  {hadith.revelation || hadith.address}
                </h1>
                <div className="flex items-center gap-4 text-emerald-200">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {hadith.category || 'Hadith'}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {hadith.views || 0} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(hadith.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            
            {/* Arabic Text */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Arabic Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-right p-6 bg-green-50 rounded-lg border border-green-100">
                  <div 
                  className="text-2xl font-arabic urdu-text text-green-800 leading-relaxed prose prose-2xl max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: hadith.arabic_text || ''
                  }}
                />
                </div>
              </CardContent>
            </Card>

            {/* English Translation */}
            {hadith.translation_eng && (
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-800 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    English Translation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-amber-50 rounded-lg border border-amber-100">
                    <div 
                      className="text-lg text-gray-700 italic leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: `"${hadith.translation_eng}"`
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Urdu Translation */}
            {hadith.translation_urdu && (
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Urdu Translation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                    <div 
                      className="text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none text-right font-arabic urdu-text"
                      dangerouslySetInnerHTML={{
                        __html: hadith.translation_urdu
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Urdu Tafseer */}
            {hadith.tafseer_urdu && (
              <Card className="border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-800 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Tafseer (Urdu)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div 
                      className="text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none text-right font-arabic urdu-text"
                      dangerouslySetInnerHTML={{
                        __html: hadith.tafseer_urdu
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* English Tafseer */}
            {hadith.tafseer_eng && (
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-800 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Tafseer (English)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-purple-50 rounded-lg border border-purple-100">
                    <div 
                      className="text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: hadith.tafseer_eng
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Hadith Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-green-700">Reference:</span>
                    <span className="ml-2 text-gray-600">{hadith.address}</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Category:</span>
                    <span className="ml-2 text-gray-600">{hadith.category || 'General'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Views:</span>
                    <span className="ml-2 text-gray-600">{hadith.views || 0}</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Published:</span>
                    <span className="ml-2 text-gray-600">{new Date(hadith.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Bookmark className="h-4 w-4 mr-2" />
                Save Hadith
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>

            {/* Back to Hadiths */}
            <div className="text-center">
              <Button asChild variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <Link href="/hadiths">
                  ← Back to Hadiths
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}