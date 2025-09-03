import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Filter, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Sample Quranic verses data
const ayats = [
  {
    id: 1,
    surah: "Al-Baqarah",
    surahNumber: 2,
    ayahNumber: 255,
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
    transliteration: "Allahu la ilaha illa huwa al-hayyu al-qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fi as-samawati wa ma fi al-ard.",
    theme: "Tawheed",
    revelation: "Madani"
  },
  {
    id: 2,
    surah: "Al-Fatiha",
    surahNumber: 1,
    ayahNumber: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
    transliteration: "Al-hamdu lillahi rabbi al-'alamin.",
    theme: "Praise",
    revelation: "Makki"
  },
  {
    id: 3,
    surah: "Al-Ikhlas",
    surahNumber: 112,
    ayahNumber: 1,
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    translation: "Say: He is Allah, the One!",
    transliteration: "Qul huwa Allahu ahad.",
    theme: "Unity of Allah",
    revelation: "Makki"
  },
  {
    id: 4,
    surah: "Ar-Rahman",
    surahNumber: 55,
    ayahNumber: 13,
    arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    translation: "So which of the favors of your Lord would you deny?",
    transliteration: "Fa-bi-ayyi ala'i rabbikuma tukadhdhibaan.",
    theme: "Gratitude",
    revelation: "Makki"
  },
  {
    id: 5,
    surah: "Al-Baqarah",
    surahNumber: 2,
    ayahNumber: 286,
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    translation: "Allah does not charge a soul except [with that within] its capacity.",
    transliteration: "La yukallifu Allahu nafsan illa wus'aha.",
    theme: "Mercy",
    revelation: "Madani"
  },
  {
    id: 6,
    surah: "Al-Ankabut",
    surahNumber: 29,
    ayahNumber: 45,
    arabic: "وَلَذِكْرُ اللَّهِ أَكْبَرُ",
    translation: "And the remembrance of Allah is greater.",
    transliteration: "Wa ladhikru Allahi akbar.",
    theme: "Remembrance",
    revelation: "Makki"
  }
]

const themes = ["All", "Tawheed", "Praise", "Unity of Allah", "Gratitude", "Mercy", "Remembrance"]
const revelationTypes = ["All", "Makki", "Madani"]

export default function AyatsPage() {
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
                />
              </div>
            </div>
            <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {/* Filter Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Themes</label>
              <div className="flex flex-wrap gap-2">
                {themes.map((theme) => (
                  <Badge 
                    key={theme} 
                    variant={theme === "All" ? "default" : "outline"}
                    className={theme === "All" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-200 text-amber-700 hover:bg-amber-50"}
                  >
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Revelation</label>
              <div className="flex flex-wrap gap-2">
                {revelationTypes.map((type) => (
                  <Badge 
                    key={type} 
                    variant={type === "All" ? "default" : "outline"}
                    className={type === "All" ? "bg-green-600 hover:bg-green-700" : "border-green-200 text-green-700 hover:bg-green-50"}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ayats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ayats.map((ayat) => (
            <Card key={ayat.id} className="hover:shadow-xl transition-all duration-300 border-amber-100 hover:border-amber-300 bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                      {ayat.theme}
                    </Badge>
                    <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">
                      {ayat.revelation}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg text-amber-800">
                  Surah {ayat.surah} ({ayat.surahNumber}:{ayat.ayahNumber})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Arabic Text */}
                <div className="text-right p-6 bg-gradient-to-r from-amber-50 to-green-50 rounded-lg border border-amber-200">
                  <p className="text-2xl font-arabic text-amber-800 leading-relaxed">
                    {ayat.arabic}
                  </p>
                </div>
                
                {/* Transliteration */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm font-medium text-green-700 mb-1">Transliteration:</p>
                  <p className="text-green-800 italic">
                    {ayat.transliteration}
                  </p>
                </div>
                
                {/* Translation */}
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-sm font-medium text-amber-700 mb-1">Translation:</p>
                  <p className="text-gray-700 leading-relaxed">
                    "{ayat.translation}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
            Load More Verses
          </Button>
        </div>
      </div>
    </div>
  )
}