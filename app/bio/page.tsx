export const dynamic = 'force-dynamic'

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, GraduationCap, Users, Award, Heart, Lightbulb, Shield, Globe, FileText } from "lucide-react"
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
                  <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4 urdu-text">مفتی منیر شاکر شہید</h1>
                  <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
                    Mufti Munir Shakir Shaheed
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed urdu-text">فکر، خدمت اور جدوجہد کا روشن باب</p>
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
            <h2 className="text-3xl font-bold text-center urdu-text">تعارف</h2>
            <p className="text-xl text-muted-foreground text-center">Introduction</p>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-justify">
              <span className="urdu-text">اسلامی دنیا کی علمی روایت میں بعض شخصیات ایسی ابھرتی ہیں جو صرف اپنے وقت کی نہیں ہوتیں بلکہ آنے والی نسلوں
                کے لیے بھی چراغِ راہ بن جاتی ہیں۔ انہی نابغہ روزگار ہستیوں میں مفتی منیر شاکر شہید کا نام نمایاں ہے۔ وہ ایک
                ایسے عالمِ دین تھے جنہوں نے قرآن و سنت کی روشنی میں دین کو سمجھنے، سکھانے اور پھیلانے کے لیے اپنی زندگی وقف
                کر دی۔</span>
            </p>

            {/* Bilingual Statement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* English (Left) */}
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">Greetings,</p>
                <p className="text-lg leading-relaxed">I am Mufti Munir Shakir,</p>
                <p className="text-lg leading-relaxed">and I would like to address certain inaccuracies present in the current Wikipedia article under my name.</p>
                <p className="text-lg leading-relaxed">The information provided does not accurately reflect my life's work, values, and contributions to society.</p>
                <p className="text-lg leading-relaxed">I have devoted my life to spreading Islamic teachings, fostering unity, and promoting peace among communities.</p>
                <p className="text-lg leading-relaxed">The article portrays events in a way that distorts the reality of my efforts,</p>
                <p className="text-lg leading-relaxed">particularly during my involvement in addressing conflicts and promoting harmony in Bara Agency.</p>
                <p className="text-lg leading-relaxed">I vehemently deny any association with terrorist activities and reject the characterization of my role in Lashkar-e-Islam.</p>
                <p className="text-lg leading-relaxed">The Wikipedia article fails to capture the nuances of the situation,</p>
                <p className="text-lg leading-relaxed">particularly the circumstances surrounding my departure from the region and the subsequent developments within the organization.</p>
                <p className="text-lg leading-relaxed">I urge Wikipedia editors to consider the broader context and include a more balanced representation of my life's work, emphasizing my commitment to peace, education, and interfaith understanding.</p>
                <p className="text-lg leading-relaxed">I appreciate your understanding and encourage a fair and unbiased representation of the facts in the Wikipedia article.</p>
                <p className="text-lg leading-relaxed">I appreciate your understanding and encourage a fair and unbiased representation of the facts in the Wikipedia article.</p>
                <p className="text-lg leading-relaxed">Sincerely,</p>
                <p className="text-lg leading-relaxed">Mufti Munir Shakir</p>
              </div>

              {/* Urdu (Right) */}
              <div className="space-y-4 urdu-text text-right">
                <p className="text-lg leading-relaxed">سلام،</p>
                <p className="text-lg leading-relaxed">میں مفتی منیر شاکر ہوں،</p>
                <p className="text-lg leading-relaxed">اور میں اپنے نام سے موجودہ ویکیپیڈیا مضمون میں موجود کچھ غلطیاں دور کرنا چاہوں گا۔</p>
                <p className="text-lg leading-relaxed">فراہم کردہ معلومات درست طریقے سے میری زندگی کے کام، اقدار اور معاشرے میں شراکت کی عکاسی نہیں کرتی ہیں۔</p>
                <p className="text-lg leading-relaxed">میں نے اپنی زندگی اسلامی تعلیمات کو پھیلانے، اتحاد کو فروغ دینے اور برادریوں کے درمیان امن کو فروغ دینے کے لیے وقف کر رکھی ہے۔</p>
                <p className="text-lg leading-relaxed">مضمون میں واقعات کو اس انداز میں پیش کیا گیا ہے جو میری کوششوں کی حقیقت کو مسخ کر دیتا ہے،</p>
                <p className="text-lg leading-relaxed">خاص طور پر باڑہ ایجنسی میں تنازعات کو حل کرنے اور ہم آہنگی کو فروغ دینے میں میری شمولیت کے دوران۔</p>
                <p className="text-lg leading-relaxed">میں دہشت گردانہ سرگرمیوں سے کسی بھی تعلق کی سختی سے تردید کرتا ہوں اور لشکر اسلام میں اپنے کردار کی خصوصیت کو مسترد کرتا ہوں۔</p>
                <p className="text-lg leading-relaxed">ویکیپیڈیا کا مضمون صورت حال کی باریکیوں کو سمجھنے میں ناکام ہے،</p>
                <p className="text-lg leading-relaxed">خاص طور پر خطے سے میری روانگی کے ارد گرد کے حالات اور تنظیم کے اندر بعد میں ہونے والی پیش رفت کو۔</p>
                <p className="text-lg leading-relaxed">میں وکی پیڈیا کے ایڈیٹرز سے اپیل کرتا ہوں کہ وہ وسیع تر سیاق و سباق پر غور کریں اور امن، تعلیم اور بین المذاہب افہام و تفہیم کے لیے میری وابستگی پر زور دیتے ہوئے،</p>
                <p className="text-lg leading-relaxed">میری زندگی کے کام کی زیادہ متوازن نمائندگی شامل کریں۔</p>
                <p className="text-lg leading-relaxed">میں آپ کی سمجھ کی تعریف کرتا ہوں اور ویکیپیڈیا مضمون میں حقائق کی منصفانہ اور غیر جانبدارانہ نمائندگی کی حوصلہ افزائی کرتا ہوں۔</p>
                <p className="text-lg leading-relaxed">مخلص،</p>
                <p className="text-lg leading-relaxed">مفتی منیر شاکر</p>
              </div>
            </div>
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
                <h2 className="text-2xl font-bold urdu-text">احادیث کے بارے میں نقطۂ نظر</h2>
                <p className="text-muted-foreground">Approach to Hadith</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed text-justify">
              <span className="urdu-text">اکثر لوگوں میں یہ غلط فہمی پائی جاتی ہے کہ مفتی منیر شاکر احادیث کے منکر تھے۔ حقیقت اس کے برعکس ہے۔ وہ
                حدیث کے انکاری نہیں بلکہ اس کے قدر دان اور محافظ تھے۔ ان کا نقطۂ نظر دو بنیادی ستونوں پر کھڑا ہے: قرآن اور
                عقل۔</span>
            </p>
            <p className="text-lg leading-relaxed text-right urdu-text">
              مفتی منیر شاکر کا کہنا تھا کہ نبی اکرم ﷺ کبھی کوئی ایسی بات نہیں فرمائیں گے جو قرآن کی تعلیمات کے خلاف ہو۔ لہٰذا اگر کوئی روایت قران سے متصادم ہو تو اس کی مزید تحقیق ضروری ہے۔
            </p>

            {/* Added detailed Urdu content on Hadith approach */}
            <p className="text-lg leading-relaxed text-justify urdu-text">
              اسلامی اسکالرشپ کے دائرے میں، احادیث کی صداقت اور ان کے اطلاق کے بارے میں بحثیں - اقوال اور اعمال جو کہ نبی اکرم صلی اللہ علیہ وسلم سے منسوب ہیں، دونوں پیچیدہ اور ضروری ہیں۔ اس گفتگو میں قابل ذکر شخصیات میں مفتی منیر شاکر ہیں، جن کا احادیث کے بارے میں نقطہ نظر ایک اہم نقطہ نظر پیش کرتا ہے جو تنقیدی تشخیص اور بنیادی اسلامی اصولوں کی پابندی پر زور دیتا ہے۔
            </p>
            <p className="text-lg leading-relaxed text-justify urdu-text">
              غلط فہمیوں کے برعکس مفتی منیر شاکر حدیث کے منکر نہیں ہیں۔ اس کے بجائے، اس کا موقف دو بنیادی ستونوں کے ساتھ ان کی صف بندی کے بارے میں محتاط غور و فکر کی عکاسی کرتا ہے: قرآن اور عقل۔ مفتی منیر شاکر نے ذاتی تعامل اور علمی تجزیے کے ذریعے اپنے موقف کو واضح کیا ہے جو احادیث کو قبول کرنے میں فہم و فراست کی اہمیت کو واضح کرتا ہے۔
            </p>
            <p className="text-lg leading-relaxed text-justify urdu-text">
              مفتی منیر شاکر کا طریقہ کار قرآن کے لیے گہری تعظیم سے جڑا ہوا ہے، جو اسلام کا سب سے بڑا رہنما ہے۔ ان کے نقطہ نظر کا مرکز یہ اصول ہے کہ نبی محمد صلی اللہ علیہ وسلم کبھی بھی ایسے الفاظ نہیں بولیں گے اور نہ ہی قرآن کی تعلیمات سے متصادم اعمال میں مشغول ہوں گے۔ لہٰذا کوئی بھی حدیث جو قرآن سے متصادم نظر آئے اس کی جانچ پڑتال کی جاتی ہے۔
            </p>
            <p className="text-lg leading-relaxed text-justify urdu-text">
              مزید یہ کہ مفتی منیر شاکر احادیث کی مطابقت اور صداقت کا اندازہ لگا کر عملی عینک لگاتے ہیں۔ وہ تسلیم کرتا ہے کہ نبی کی طرف منسوب تمام روایات یکساں طور پر قابل اعتماد نہیں ہیں۔ لہٰذا، وہ ان چیزوں کو قبول کرنے میں احتیاط برتتا ہے جن میں استدلال کی کمی ہے یا جو اسلامی علم سے متضاد ہیں۔
            </p>
            <p className="text-lg leading-relaxed text-justify urdu-text">
              مفتی منیر شاکر کے نقطہ نظر کی اصل اس گہری تفہیم میں مضمر ہے کہ نبی اکرم صلی اللہ علیہ وسلم نے اپنی تعلیمات اور اعمال میں قرآن کے جوہر کو مجسم کیا۔ اس طرح، کوئی بھی مفروضہ حدیث جو اس ترتیب سے انحراف کرتی ہے، شکوک و شبہات کی ضمانت دیتی ہے۔ مفتی منیر شاکر کا نقطہ نظر اسلامی گفتگو کے اندر غلط یا گمراہ کن معلومات کی تشہیر کے خلاف تحفظ کا کام کرتا ہے۔
            </p>
            <p className="text-lg leading-relaxed text-justify urdu-text">
              غور طلب ہے کہ مفتی منیر شاکر کا موقف علم حدیث کی بھرپور روایت کو رد کرنے والا نہیں ہے۔ اس کے بجائے، یہ تنقیدی مشغولیت اور اسلام کے بنیادی اصولوں کی پابندی کی اہمیت کو واضح کرتا ہے۔ پیغمبر کی تعلیمات کی سالمیت کو برقرار رکھتے ہوئے اور قرآن کی حرمت کو برقرار رکھتے ہوئے، مفتی منیر شاکر عصری سیاق و سباق میں اسلامی روایت کی گہری تفہیم میں حصہ ڈالتے ہیں۔
            </p>
            <p className="text-lg leading-relaxed text-justify urdu-text">
              آخر میں، مفتی منیر شاکر کا احادیث کے بارے میں نقطہ نظر وفاداری، فہم و فراست اور بنیادی اسلامی اصولوں کی پابندی کی عکاسی کرتا ہے۔ قرآن اور مستند ذرائع کے ساتھ ہم آہنگی کو ترجیح دیتے ہوئے، وہ علم حدیث کی پیچیدگیوں کو حکمت اور تندہی کے ساتھ تلاش کرتا ہے، اس بات کو یقینی بناتا ہے کہ پیغمبر اسلام صلی اللہ علیہ وسلم کا لازوال پیغام مسلم کمیونٹی میں مستند طور پر گونجتا رہے۔
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
                <h2 className="text-2xl font-bold urdu-text">دینی خدمات</h2>
                <p className="text-muted-foreground">Religious Services</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-justify">
              <span className="urdu-text">مفتی منیر شاکر نے دین کی خدمت میں گراں قدر اور اہم خدمات انجام دیے ہیں۔ وہ معاصر علمائے کرام میں سے ہیں جنہوں نے اسلامی علوم کی اشاعت، مسلمانوں کی رہنمائی، اور دینی شعور کی بیداری میں اہم کردار ادا کیا ہے۔ ان کی خدمات مختلف شعبوں میں نمایاں ہیں، جن میں جہادی اور اسلامی جدوجہد بھی شامل ہے، جس کی تفصیل ذیل میں پیش کی جا رہی ہے:</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <span className="urdu-text">تعلیم و تدریس</span>
                </h3>
                <p className="text-muted-foreground">
                  <span className="urdu-text">مفتی منیر شاکر دینی علوم کی ترویج پر پختہ یقین رکھتے ہیں اور تدریس کے میدان میں انہوں نے شاندار خدمات انجام دی ہیں۔ انہوں نے مختلف مدارس میں تدریس کی اور بے شمار طلباء کو دینی تعلیم دی، جو آج دین کی خدمت میں مختلف میدانوں میں کام کر رہے ہیں۔ انہوں نے فقہ، حدیث، اور قرآنی علوم میں گہری مطالعاتی اور تدریسی سرگرمیاں جاری رکھیں، اور ان کے اسباق صرف روایتی دینی علوم تک محدود نہیں تھے بلکہ انہوں نے عصرِ حاضر کے مسائل کے حل میں بھی اہم کردار ادا کیا ہے۔</span>
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <span className="urdu-text">فتویٰ نویسی</span>
                  </h3>
                  <p className="text-muted-foreground">
                    <span className="urdu-text">مفتی منیر شاکر فتویٰ دینے کے میدان میں ایک ماہر اور مجتہد عالم ہیں۔ وہ پیچیدہ اور معاصر فقہی مسائل میں تفصیل سے فتاویٰ دیتے ہیں اور شریعت کے اصولوں کے مطابق حل پیش کرتے ہیں۔ ان کے فتویٰ دینے کے ذریعے اسلامی معاشرے کی ضروریات شریعت کی روشنی میں پوری کی جاتی ہیں، اور اس طرح وہ مسلمانوں کو شریعت کے مطابق زندگی گزارنے کی رہنمائی کرتے ہیں۔</span>
                  </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    <span className="urdu-text">دعوت و تبلیغ</span>
                  </h3>
                  <p className="text-muted-foreground">
                    <span className="urdu-text">مفتی منیر شاکر کا ایک اور اہم خدمت دعوت اور تبلیغ کے میدان میں ہے۔ انہوں نے اسلامی اخلاق اور تعلیمات کی ترویج میں بڑی کوشش کی ہے۔ وہ مساجد، مدارس، اور دعوتی اجتماعات کے ذریعے لوگوں کو اسلام کا پیغام پہنچاتے ہیں۔ ان کے خطبات اور تقاریر نے لوگوں کے دلوں میں دین سے محبت اور اخلاص پیدا کیا اور انہیں اسلامی اصولوں پر عمل کرنے کی ترغیب دی۔</span>
                  </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    <span className="urdu-text">تصنیف و تالیف</span>
                  </h3>
                  <p className="text-muted-foreground">
                    <span className="urdu-text">مفتی منیر شاکر نے دینی مسائل پر اہم کتابیں اور تحریریں بھی لکھی ہیں، جو مسلمانوں کے لیے رہنمائی اور سیکھنے کا ذریعہ بن گئی ہیں۔ ان کی تحریریں خاص طور پر معاصر فقہی اور عقیدتی موضوعات پر مرکوز ہیں اور وہ ان کو تفصیل سے بیان کرتے ہیں۔ ان کتابوں اور تحریروں کے ذریعے انہوں نے مسلمانوں کے دینی شعور میں اضافہ کیا ہے۔</span>
                  </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-teal-600" />
                    <span className="urdu-text">اسلامی معاشرت کی تعمیر میں کردار</span>
                  </h3>
                  <p className="text-muted-foreground">
                    <span className="urdu-text">مفتی منیر شاکر نے نہ صرف علمی اور فقہی میدانوں میں خدمات انجام دی ہیں بلکہ اسلامی معاشرت کی تعمیر میں بھی فعال کردار ادا کیا ہے۔ انہوں نے مختلف سماجی اور تعلیمی منصوبوں میں حصہ لیا، جو مسلمانوں کی تعلیمی اور سماجی ترقی کے لیے مفید تھے۔ اسلامی معاشرت کی تعمیر علماء کا اہم مقصد ہوتا ہے، اور مفتی منیر شاکر نے اپنی کوششوں کے ذریعے بہت سے لوگوں کو حق کے راستے پر بلایا۔</span>
                  </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-justify mt-6">
              <span className="urdu-text">مفتی منیر شاکر نے دینی علوم کی تدریس، فتویٰ دینے، تبلیغ، اور سماجی خدمات میں بڑا کردار ادا کیا ہے۔ ان کی کوششوں کے ذریعے انہوں نے دین کے لیے گراں قدر خدمات انجام دی ہیں اور مسلمانوں کی تربیت اور رہنمائی میں بڑا حصہ لیا ہے۔ ان کی خدمات اسلامی تاریخ کے صفحات میں ہمیشہ زندہ رہیں گی، اور ان کے کام آنے والی نسلوں کے لیے دین کی راہ میں ایک مشعلِ راہ بنیں گے۔</span>
            </p>
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
                <h2 className="text-2xl font-bold urdu-text">جہادی جدوجہد</h2>
                <p className="text-muted-foreground">Jihadist Struggle</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed text-justify">
              <span className="urdu-text">مفتی منیر شاکر دینی علوم کی تدریس اور فتویٰ دینے کے علاوہ جہادی میدان میں بھی ایک اہم اور فعال شخصیت ہیں۔ ان کی جہادی جدوجہد اسلام کے اصولوں اور تعلیمات کی روشنی میں تھی، اور ان کی یہ جدوجہد دینی اور ملی اقدار کی حفاظت کے لیے تھی۔</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card/50 p-6 rounded-lg border space-y-4">
                <h3 className="text-xl font-semibold urdu-text text-center border-b pb-2">جہاد کا نظریہ اور فلسفہ</h3>
                <p className="text-muted-foreground leading-relaxed text-justify">
                  <span className="urdu-text">مفتی منیر شاکر نے اسلام میں جہاد کے نظریے کو قرآنی اور سنت کی روشنی میں پیش کیا۔ ان کا ماننا تھا کہ جہاد صرف جنگ تک محدود نہیں، بلکہ یہ ایک وسیع جدوجہد ہے جس میں ظلم و فساد کے خلاف حق کی جنگ شامل ہے۔ مفتی منیر شاکر جہاد کو ایک دفاعی عمل کے طور پر دیکھتے تھے، جو اس وقت ہوتا ہے جب مسلمانوں کے دین، عزت، اور ملک کو خطرہ لاحق ہو۔</span>
                </p>
              </div>

              <div className="bg-card/50 p-6 rounded-lg border space-y-4">
                <h3 className="text-xl font-semibold urdu-text text-center border-b pb-2">امن و انصاف کے لیے جدوجہد</h3>
                <p className="text-muted-foreground leading-relaxed text-justify">
                  <span className="urdu-text">اگرچہ مفتی منیر شاکر جہادی جدوجہد میں مضبوط موقف رکھتے تھے، لیکن وہ ہمیشہ امن و انصاف کے لیے بھی آواز بلند کرتے تھے۔ ان کا کہنا تھا کہ جہاد کا اصل مقصد ظلم کا خاتمہ اور امن کا قیام ہے۔ مفتی منیر شاکر ان جہادی گروہوں کی حمایت نہیں کرتے تھے جو مسلمانوں کے درمیان لڑائی اور اندرونی جنگیں شروع کرتے تھے۔ وہ ہمیشہ مسلمانوں کو نصیحت کرتے تھے کہ وہ اتحاد اور اتفاق کا راستہ اختیار کریں اور شریعت کی روشنی میں اپنے اختلافات حل کریں۔</span>
                </p>
              </div>

              <div className="bg-card/50 p-6 rounded-lg border space-y-4">
                <h3 className="text-xl font-semibold urdu-text text-center border-b pb-2">اسلامی حکومت کے قیام کے لیے جدوجہد</h3>
                <p className="text-muted-foreground leading-relaxed text-justify">
                  <span className="urdu-text">مفتی منیر شاکر کا ایمان تھا کہ مسلمانوں کا معاشرہ اسلامی اصولوں پر مبنی ہونا چاہیے۔ وہ اس کے لیے جہادی جدوجہد کو اہم سمجھتے تھے کہ ایک اسلامی حکومت قائم ہو، ایک ایسا نظام جس میں انصاف، شریعت، اور دینی اقدار کا نفاذ بنیادی ہو۔ وہ اسلامی نظام کے لیے مسلح جہاد کی حمایت کرتے تھے اور مسلمانوں کو اس جدوجہد کی اہمیت سے آگاہ کرتے تھے۔ ان کے نزدیک اسلامی حکومت ظلم اور فساد کی روک تھام کا واحد راستہ ہے اور اس راہ میں جدوجہد مسلمانوں کی دینی ذمہ داریوں میں شامل ہے۔</span>
                </p>
              </div>

              <div className="bg-card/50 p-6 rounded-lg border space-y-4">
                <h3 className="text-xl font-semibold urdu-text text-center border-b pb-2">عالمی سازشوں کے خلاف جدوجہد</h3>
                <p className="text-muted-foreground leading-relaxed text-justify">
                  <span className="urdu-text">مفتی منیر شاکر ہمیشہ ان عالمی طاقتوں اور سازشوں کے خلاف مضبوط موقف رکھتے تھے جو اسلامی دنیا کو دبانے کے لیے کام کرتی ہیں۔ ان کا ماننا تھا کہ اسلامی ممالک کے قبضے اور کمزوری کے پیچھے بڑی عالمی طاقتوں کی سازشیں ہیں، اور جہاد ان سازشوں کو ناکام بنانے کا واحد راستہ ہے۔ ان کی تقاریر اور تبلیغات اس حوالے سے بہت مؤثر تھیں اور انہوں نے مسلمانوں کو اس جدوجہد کی اہمیت اور ضرورت سے آگاہ کیا۔</span>
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-justify">
              <span className="urdu-text">مفتی منیر شاکر نے دینی اور علمی خدمات کے ساتھ ساتھ جہادی جدوجہد میں بھی اہم کردار ادا کیا ہے۔ ان کی جہادی جدوجہد اسلامی اصولوں کی روشنی میں تھی، جس کا مقصد ظلم کے خلاف کھڑا ہونا، اسلام کی حفاظت، اور اسلامی حکومت کا قیام تھا۔ ان کی جدوجہد کو خاص اہمیت حاصل ہے اور ان کے نظریات اور تقاریر نے اس راہ میں بہت سے مسلمانوں کو جدوجہد پر ابھارا۔</span>
            </p>
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
                <h2 className="text-2xl font-bold urdu-text">عالمی سازشوں کے خلاف موقف</h2>
                <p className="text-muted-foreground">Stance Against Global Conspiracies</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-justify">
              <span className="urdu-text">وہ عالمی طاقتوں کی ان سازشوں کے سخت ناقد تھے جو اسلامی دنیا کو کمزور کرنے پر تُلی ہوئی ہیں۔ ان کا کہنا تھا
                کہ امت کو بیدار ہو کر ان سازشوں کے خلاف متحد ہونا ہوگا۔</span>
            </p>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <Card>
          <CardHeader>
            <h2 className="text-3xl font-bold text-center urdu-text">اختتامی کلمات</h2>
            <p className="text-xl text-muted-foreground text-center">Concluding Words</p>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-justify">
              <span className="urdu-text">مفتی منیر شاکر ایک ہمہ جہت شخصیت تھے — ایک استاد، ایک مفتی، ایک مبلغ، ایک مصنف، اور ایک مجاہد۔ ان کی زندگی
              علم، عقل، قرآن اور عمل کا حسین امتزاج تھی۔ انہوں نے دین کی خدمت صرف الفاظ سے نہیں بلکہ عمل سے بھی کی۔ ان
              کی خدمات آنے والی نسلوں کے لیے چراغِ راہ ہیں اور ان کا نام اسلامی تاریخ میں ہمیشہ زندہ رہے گا۔</span>
            </p>

            <Separator className="my-8" />

            <div className="text-center">
              <p className="text-xl font-semibold text-primary urdu-text">رحمۃ اللہ علیہ</p>
              <p className="text-lg text-muted-foreground mt-2">May Allah have mercy on him</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
