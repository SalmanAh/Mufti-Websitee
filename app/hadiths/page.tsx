import { Navigation } from "@/components/navigation"
import { ContentGrid } from "@/components/content-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Sample hadith data
const hadiths = [
  {
    id: 1,
    title: "The Importance of Seeking Knowledge",
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    translation: "Seeking knowledge is an obligation upon every Muslim.",
    narrator: "Ibn Majah",
    book: "Sunan Ibn Majah",
    category: "Knowledge",
    hadithNumber: "224"
  },
  {
    id: 2,
    title: "The Best of People",
    arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
    translation: "The best of people are those who are most beneficial to others.",
    narrator: "Al-Tabarani",
    book: "Al-Mu'jam al-Awsat",
    category: "Character",
    hadithNumber: "6026"
  },
  {
    id: 3,
    title: "Kindness to Parents",
    arabic: "الْوَالِدُ أَوْسَطُ أَبْوَابِ الْجَنَّةِ",
    translation: "The parent is the middle gate of Paradise.",
    narrator: "At-Tirmidhi",
    book: "Jami' at-Tirmidhi",
    category: "Family",
    hadithNumber: "1900"
  },
  {
    id: 4,
    title: "The Believer's Character",
    arabic: "الْمُؤْمِنُ مَنْ أَمِنَهُ النَّاسُ عَلَى دِمَائِهِمْ وَأَمْوَالِهِمْ",
    translation: "The believer is one from whom people are safe regarding their lives and wealth.",
    narrator: "An-Nasa'i",
    book: "Sunan an-Nasa'i",
    category: "Faith",
    hadithNumber: "4995"
  },
  {
    id: 5,
    title: "Prayer and Remembrance",
    arabic: "أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
    translation: "The most beloved deeds to Allah are those done consistently, even if they are small.",
    narrator: "Al-Bukhari",
    book: "Sahih al-Bukhari",
    category: "Worship",
    hadithNumber: "6464"
  },
  {
    id: 6,
    title: "Justice and Fairness",
    arabic: "اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَى",
    translation: "Be just, it is closer to righteousness.",
    narrator: "Al-Bukhari",
    book: "Sahih al-Bukhari",
    category: "Justice",
    hadithNumber: "2442"
  }
]

const categories = ["All", "Knowledge", "Character", "Family", "Faith", "Worship", "Justice"]

export default function HadithsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="absolute inset-0 bg-[url('/islamic-geometric-pattern.png')] opacity-10 bg-repeat"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hadith Collection</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Explore authentic sayings and teachings of Prophet Muhammad (PBUH)
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-green-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search hadiths by text, narrator, or topic..." 
                  className="pl-10 border-green-200 focus:border-green-400"
                />
              </div>
            </div>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" ? "bg-green-600 hover:bg-green-700" : "border-green-200 text-green-700 hover:bg-green-50"}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hadiths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hadiths.map((hadith) => (
            <Card key={hadith.id} className="hover:shadow-xl transition-all duration-300 border-green-100 hover:border-green-300 bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">
                    {hadith.category}
                  </Badge>
                  <span className="text-sm text-gray-500">#{hadith.hadithNumber}</span>
                </div>
                <CardTitle className="text-lg text-green-800">{hadith.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Arabic Text */}
                <div className="text-right p-4 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-lg font-arabic text-green-800 leading-relaxed">
                    {hadith.arabic}
                  </p>
                </div>
                
                {/* Translation */}
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-gray-700 italic leading-relaxed">
                    "{hadith.translation}"
                  </p>
                </div>
                
                {/* Source Information */}
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium text-green-700">Narrator:</span> {hadith.narrator}</p>
                  <p><span className="font-medium text-green-700">Source:</span> {hadith.book}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
            Load More Hadiths
          </Button>
        </div>
      </div>
    </div>
  )
}