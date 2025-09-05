import { Navigation } from "@/components/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Eye, Calendar, Share2, Download, Bookmark } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface AyatDetailProps {
  params: {
    id: string;
  };
}

export default async function AyatDetailPage({ params }: AyatDetailProps) {
  const supabase = await createClient();

  // Fetch ayat data
  const { data: ayat, error } = await supabase
    .from('ayats')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !ayat) {
    notFound();
  }

  // Increment view count
  await supabase
    .from('ayats')
    .update({ views: (ayat.views || 0) + 1 })
    .eq('id', params.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-to-br from-orange-400 to-orange-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link 
                href="/ayats" 
                className="text-amber-200 hover:text-white transition-colors"
              >
                Ayats
              </Link>
              <span className="text-amber-300">›</span>
              <span className="text-amber-100">Detail</span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                <BookOpen className="h-8 w-8 text-amber-200" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {ayat.address}
                </h1>
                <div className="flex items-center gap-4 text-amber-200">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {ayat.category || 'Ayat'}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {ayat.revelation || 'Quran'}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {ayat.views || 0} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(ayat.created_at).toLocaleDateString()}
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
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Arabic Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-right p-6 bg-amber-50 rounded-lg border border-amber-100">
                  <div 
                    className="text-3xl font-arabic text-amber-800 leading-relaxed prose prose-2xl max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: ayat.arabic_text || ''
                    }}
                  />
                </div>
              </CardContent>
            </Card>



            {/* English Translation */}
            {ayat.translation_eng && (
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    English Translation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                    <div 
                      className="text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: `"${ayat.translation_eng}"`
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Urdu Translation */}
            {ayat.translation_urdu && (
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-800 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Urdu Translation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-purple-50 rounded-lg border border-purple-100">
                    <div 
                      className="text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none text-right"
                      style={{fontFamily: 'Noto Nastaliq Urdu, serif'}}
                      dangerouslySetInnerHTML={{
                        __html: `"${ayat.translation_urdu}"`
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Urdu Tafseer */}
            {ayat.tafseer_urdu && (
              <Card className="border-teal-200">
                <CardHeader>
                  <CardTitle className="text-teal-800 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Tafseer (Urdu)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-teal-50 rounded-lg border border-teal-100">
                    <div 
                      className="text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none text-right"
                      dangerouslySetInnerHTML={{
                        __html: ayat.tafseer_urdu
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* English Tafseer */}
            {ayat.tafseer_eng && (
              <Card className="border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-800 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Tafseer (English)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div 
                      className="text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: ayat.tafseer_eng
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
                  Ayat Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-amber-700">Address:</span>
                    <span className="ml-2 text-gray-600">{ayat.address}</span>
                  </div>
                  <div>
                    <span className="font-medium text-amber-700">Category:</span>
                    <span className="ml-2 text-gray-600">{ayat.category || 'General'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-amber-700">Revelation:</span>
                    <span className="ml-2 text-gray-600">{ayat.revelation || 'Quran'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-amber-700">Views:</span>
                    <span className="ml-2 text-gray-600">{ayat.views || 0}</span>
                  </div>
                  <div>
                    <span className="font-medium text-amber-700">Published:</span>
                    <span className="ml-2 text-gray-600">{new Date(ayat.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Bookmark className="h-4 w-4 mr-2" />
                Save Ayat
              </Button>
              <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>

            {/* Back to Ayats */}
            <div className="text-center">
              <Button asChild variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                <Link href="/ayats">
                  ← Back to Ayats
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}