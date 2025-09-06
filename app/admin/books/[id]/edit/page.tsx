"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface EditBookPageProps {
  params: { id: string }
}

export default function EditBookPage({ params }: EditBookPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pdf_url: "",
    thumbnail_url: ""
  })
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) {
          console.error('Error fetching book:', error)
          toast.error('Failed to load book')
          router.push('/admin/books')
          return
        }

        if (data) {
          setFormData({
            title: data.title || '',
            author: data.author || '',
            pdf_url: data.pdf_url || '',
            thumbnail_url: data.thumbnail_url || ''
          })
        }
      } catch (error) {
        console.error('Error in fetchBook:', error)
        toast.error('An unexpected error occurred')
        router.push('/admin/books')
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchBook()
  }, [params.id, router, supabase])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file')
        return
      }
      setPdfFile(file)
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file)
    } else {
      toast.error('Please select a valid image file')
    }
  }

  const uploadThumbnailToSupabase = async (file: File): Promise<string> => {
    const supabase = createClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `images/${fileName}`

    const { data, error } = await supabase.storage
      .from('E-Books')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw new Error(`Upload failed: ${error.message}`)
    }

    const { data: { publicUrl } } = supabase.storage
      .from('E-Books')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const uploadPdf = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`
    const filePath = `books/${fileName}`

    const { data, error } = await supabase.storage
      .from('pdfs')
      .upload(filePath, file, {
        onUploadProgress: (progress) => {
          setUploadProgress((progress.loaded / progress.total) * 100)
        }
      })

    if (error) {
      throw error
    }

    const { data: { publicUrl } } = supabase.storage
      .from('pdfs')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }

    setIsLoading(true)
    
    try {
      let pdfUrl = formData.pdf_url
      let thumbnailUrl = formData.thumbnail_url
      
      // If a new PDF file is selected, upload it
      if (pdfFile) {
        pdfUrl = await uploadPdf(pdfFile)
      }

      if (thumbnailFile) {
        setIsUploading(true)
        thumbnailUrl = await uploadThumbnailToSupabase(thumbnailFile)
        setIsUploading(false)
      }
      
      const { data, error } = await supabase
        .from('books')
        .update({
          title: formData.title,
          author: formData.author,
          pdf_url: pdfUrl,
          thumbnail_url: thumbnailUrl
        })
        .eq('id', params.id)
        .select()
      
      if (error) throw error
      
      toast.success("Book updated successfully!")
      router.push("/admin/books")
    } catch (error) {
      console.error("Error updating book:", error)
      toast.error("Failed to update book")
    } finally {
      setIsLoading(false)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/books">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Book</h1>
            <p className="text-muted-foreground">Loading book data...</p>
          </div>
        </div>
        <Card className="max-w-2xl">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/books">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Book</h1>
          <p className="text-muted-foreground">Update the book information</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Book Details</CardTitle>
          <CardDescription>
            Update the information below to modify the book
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter author name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail Image</Label>
              <div className="space-y-2">
                {formData.thumbnail_url && (
                  <p className="text-sm text-muted-foreground">
                    Current thumbnail: <a href={formData.thumbnail_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Image</a>
                  </p>
                )}
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
                {thumbnailFile && (
                  <p className="text-sm text-green-600">
                    Selected: {thumbnailFile.name} ({(thumbnailFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
                {isUploading && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    Uploading thumbnail...
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  {thumbnailFile ? 'New thumbnail selected. ' : ''}Leave empty to keep current thumbnail.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdf">PDF File</Label>
              <div className="space-y-2">
                {formData.pdf_url && (
                  <p className="text-sm text-muted-foreground">
                    Current file: <a href={formData.pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View PDF</a>
                  </p>
                )}
                <Input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                <p className="text-sm text-muted-foreground">
                  {pdfFile ? 'New file selected. ' : ''}Leave empty to keep current PDF file.
                </p>
              </div>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading || isUploading}>
                <Save className="h-4 w-4 mr-2" />
                {isUploading ? "Uploading..." : isLoading ? "Updating..." : "Update Book"}
              </Button>
              <Link href="/admin/books">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}