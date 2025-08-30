import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, GraduationCap, Users, Award, Heart, Lightbulb, Shield, Globe } from "lucide-react"
import Image from "next/image"

export default function BioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-3xl" />
          <div className="relative bg-card rounded-3xl p-8 md:p-12 border shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl" />
                  <Image
                    src="/images/scholar-portrait.png"
                    alt="Mufti Munir Shakir"
                    width={300}
                    height={400}
                    className="relative rounded-2xl shadow-2xl object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="text-center lg:text-right">
                  <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">مفتی منیر شاکر شہید</h1>
                  <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
                    Mufti Munir Shakir Shaheed
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">فکر، خدمت اور جدوجہد کا روشن باب</p>
                  <p className="text-lg text-muted-foreground mt-2">
                    A Bright Chapter of Thought, Service, and Struggle
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                  <Badge variant="secondary" className="px-4 py-2">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Islamic Scholar
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Mufti
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    <Users className="h-4 w-4 mr-2" />
                    Teacher
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    <Award className="h-4 w-4 mr-2" />
                    Author
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-12">
          <CardHeader>
            <h2 className="text-3xl font-bold text-center">تعارف</h2>
            <p className="text-xl text-muted-foreground text-center">Introduction</p>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-justify">
              اسلامی دنیا کی علمی روایت میں بعض شخصیات ایسی ابھرتی ہیں جو صرف اپنے وقت کی نہیں ہوتیں بلکہ آنے والی نسلوں
              کے لیے بھی چراغِ راہ بن جاتی ہیں۔ انہی نابغہ روزگار ہستیوں میں مفتی منیر شاکر شہید کا نام نمایاں ہے۔ وہ ایک
              ایسے عالمِ دین تھے جنہوں نے قرآن و سنت کی روشنی میں دین کو سمجھنے، سکھانے اور پھیلانے کے لیے اپنی زندگی وقف
              کر دی۔
            </p>
          </CardContent>
        </Card>

        {/* Approach to Hadith */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">احادیث کے بارے میں نقطۂ نظر</h2>
                <p className="text-muted-foreground">Approach to Hadith</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed text-justify">
              اکثر لوگوں میں یہ غلط فہمی پائی جاتی ہے کہ مفتی منیر شاکر احادیث کے منکر تھے۔ حقیقت اس کے برعکس ہے۔ وہ
              حدیث کے انکاری نہیں بلکہ اس کے قدر دان اور محافظ تھے۔ ان کا نقطۂ نظر دو بنیادی ستونوں پر کھڑا ہے: قرآن اور
              عقل۔
            </p>
            <p className="text-lg leading-relaxed text-justify">
              مفتی منیر شاکر کا کہنا تھا کہ نبی اکرم ﷺ کبھی کوئی ایسی بات نہیں فرمائیں گے جو قرآن کی تعلیمات کے خلاف ہو۔
              لہٰذا اگر کوئی روایت بظاہر قرآن سے متصادم دکھائی دے تو اس کی مزید تحقیق ضروری ہے۔
            </p>
          </CardContent>
        </Card>

        {/* Religious Services */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">دینی خدمات</h2>
                <p className="text-muted-foreground">Religious Services</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  تعلیم و تدریس
                </h3>
                <p className="text-muted-foreground">
                  مدارس و مساجد میں ان کی تدریس نے ہزاروں طلبہ کو دین سے روشناس کیا۔ وہ فقہ، حدیث اور قرآن کے گہرے
                  مطالعہ کے ساتھ ساتھ عصری مسائل کو بھی حل کرنے کی صلاحیت رکھتے تھے۔
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  فتویٰ نویسی
                </h3>
                <p className="text-muted-foreground">
                  پیچیدہ فقہی مسائل میں ان کے فتاویٰ رہنمائی کا روشن مینار ہیں۔ وہ شریعت کے اصولوں پر مضبوطی سے قائم رہتے
                  ہوئے مسلمانوں کو عملی مسائل کا حل فراہم کرتے تھے۔
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  دعوت و تبلیغ
                </h3>
                <p className="text-muted-foreground">
                  ان کے خطبات اور بیانات نے عوام میں دین کی محبت کو تازہ کیا۔ مساجد، اجتماعات اور اجتماعی مکالموں کے
                  ذریعے انہوں نے اسلام کے پیغام کو عام کیا۔
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  تصنیف و تالیف
                </h3>
                <p className="text-muted-foreground">
                  انہوں نے متعدد علمی تحریریں اور کتب لکھیں جن میں جدید اور فقہی مسائل پر گہری بصیرت جھلکتی ہے۔ ان کی
                  کتابیں آج بھی طالب علموں کے لیے قیمتی سرمایہ ہیں۔
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jihadist Struggle */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">جہادی جدوجہد</h2>
                <p className="text-muted-foreground">Jihadist Struggle</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed text-justify">
              مفتی منیر شاکر کی جدوجہد کا ایک نمایاں پہلو ان کی جہادی خدمات بھی ہیں۔ مگر ان کا تصور جہاد صرف تلوار یا
              ہتھیار تک محدود نہیں تھا۔ وہ جہاد کو ظلم کے خلاف ایک وسیع جدوجہد سمجھتے تھے، جس کا مقصد امن و انصاف قائم
              کرنا اور دین و ملت کی حفاظت کرنا تھا۔
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">جہاد کا فلسفہ</h3>
                <p className="text-muted-foreground">
                  ان کا ماننا تھا کہ جہاد ایک دفاعی عمل ہے، جب دین، عزت یا وطن خطرے میں ہوں تو مسلمان پر لازم ہے کہ وہ
                  کھڑا ہو۔
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">امن و انصاف</h3>
                <p className="text-muted-foreground">
                  وہ ہمیشہ اس بات پر زور دیتے تھے کہ جہاد کا اصل مقصد ظلم کو ختم کرنا اور انصاف قائم کرنا ہے۔
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Perspective */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">عالمی سازشوں کے خلاف موقف</h2>
                <p className="text-muted-foreground">Stance Against Global Conspiracies</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-justify">
              وہ عالمی طاقتوں کی ان سازشوں کے سخت ناقد تھے جو اسلامی دنیا کو کمزور کرنے پر تُلی ہوئی ہیں۔ ان کا کہنا تھا
              کہ امت کو بیدار ہو کر ان سازشوں کے خلاف متحد ہونا ہوگا۔
            </p>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <Card>
          <CardHeader>
            <h2 className="text-3xl font-bold text-center">اختتامی کلمات</h2>
            <p className="text-xl text-muted-foreground text-center">Concluding Words</p>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-justify">
              مفتی منیر شاکر ایک ہمہ جہت شخصیت تھے — ایک استاد، ایک مفتی، ایک مبلغ، ایک مصنف، اور ایک مجاہد۔ ان کی زندگی
              علم، عقل، قرآن اور عمل کا حسین امتزاج تھی۔ انہوں نے دین کی خدمت صرف الفاظ سے نہیں بلکہ عمل سے بھی کی۔ ان
              کی خدمات آنے والی نسلوں کے لیے چراغِ راہ ہیں اور ان کا نام اسلامی تاریخ میں ہمیشہ زندہ رہے گا۔
            </p>

            <Separator className="my-8" />

            <div className="text-center">
              <p className="text-xl font-semibold text-primary">رحمۃ اللہ علیہ</p>
              <p className="text-lg text-muted-foreground mt-2">May Allah have mercy on him</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
